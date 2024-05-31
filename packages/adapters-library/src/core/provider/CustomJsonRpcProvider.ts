import {
  FetchRequest,
  Filter,
  FilterByBlockHash,
  JsonRpcApiProviderOptions,
  JsonRpcProvider,
  Log,
  TransactionRequest,
  ethers,
} from 'ethers'
import { Config, IConfig } from '../../config'
import { count } from '../../metricsCount'
import { AVERAGE_BLOCKS_PER_10_MINUTES } from '../constants/AVERAGE_BLOCKS_PER_10_MINS'
import { Chain, ChainName } from '../constants/chains'
import { NotSupportedUnlimitedGetLogsBlockRange } from '../errors/errors'
import { retryHandlerFactory } from './retryHandlerFactory'

export type CustomJsonRpcProviderOptions = {
  rpcCallTimeoutInMs: number
  rpcCallRetries: number
  rpcGetLogsTimeoutInMs: number
  rpcGetLogsRetries: number
}
const THIRTY_MINUTES = 30 * 60 * 1000

type CacheEntryCalls = { result: string; timestamp: number }
type CacheEntryLogs = { result: Array<Log>; timestamp: number }

export class CustomJsonRpcProvider extends JsonRpcProvider {
  chainId: Chain

  private hasUnlimitedGetLogsRange: boolean

  private cacheCalls: Record<string, Promise<CacheEntryCalls>>
  private cacheLogs: Record<string, Promise<CacheEntryLogs>>

  callRetryHandler: ReturnType<typeof retryHandlerFactory>

  logsRetryHandler: ReturnType<typeof retryHandlerFactory>

  constructor({
    fetchRequest,
    chainId,
    customOptions: {
      rpcCallTimeoutInMs,
      rpcCallRetries,
      rpcGetLogsTimeoutInMs,
      rpcGetLogsRetries,
    },
    jsonRpcProviderOptions,

    hasUnlimitedGetLogsRange,
  }: {
    fetchRequest: FetchRequest
    chainId: Chain
    customOptions: CustomJsonRpcProviderOptions
    jsonRpcProviderOptions?: JsonRpcApiProviderOptions
    hasUnlimitedGetLogsRange: boolean
  }) {
    super(fetchRequest, chainId, jsonRpcProviderOptions)
    this.chainId = chainId
    this.callRetryHandler = retryHandlerFactory({
      timeoutInMs: rpcCallTimeoutInMs,
      maxRetries: rpcCallRetries,
    })
    this.logsRetryHandler = retryHandlerFactory({
      timeoutInMs: rpcGetLogsTimeoutInMs,
      maxRetries: rpcGetLogsRetries,
    })
    this.cacheCalls = {}
    this.cacheLogs = {}

    this.hasUnlimitedGetLogsRange = hasUnlimitedGetLogsRange
  }

  /**
   * Returns 10 min old blockNumber to ensure data has propagated across nodes
   * Getting logs close to head has issues
   * @returns
   */
  async getStableBlockNumber(): Promise<number> {
    const currentBlockNumber = await this.getBlockNumber()

    const blockNumberTenMinsAgo =
      currentBlockNumber - (AVERAGE_BLOCKS_PER_10_MINUTES[this.chainId] ?? 0) // default to 0 to avoid failures
    return blockNumberTenMinsAgo
  }

  async call(transaction: TransactionRequest): Promise<string> {
    const key = JSON.stringify(transaction)

    const cachedEntryPromise = this.cacheCalls[key]

    if (cachedEntryPromise) {
      const now = Date.now()

      const entry = await cachedEntryPromise

      if (now - entry.timestamp < THIRTY_MINUTES) {
        return entry.result
      }
    }

    const entryPromise = (async () => {
      const result = this.callRetryHandler(() => super.call(transaction))

      return {
        result: await result,
        timestamp: Date.now(),
      }
    })()

    this.cacheCalls[key] = entryPromise

    return (await entryPromise).result
  }

  async getLogs(filter: Filter | FilterByBlockHash): Promise<Array<Log>> {
    const startTime = Date.now()
    const key = JSON.stringify(filter)

    const cachedEntryPromise = this.cacheLogs[key]

    if (cachedEntryPromise) {
      const now = Date.now()

      const entry = await cachedEntryPromise

      if (now - entry.timestamp < THIRTY_MINUTES) {
        return entry.result
      }
    }

    const entryPromise = (async () => {
      const result = this.logsRetryHandler(() => super.getLogs(filter))

      return {
        result: await result,
        timestamp: Date.now(),
      }
    })()

    this.cacheLogs[key] = entryPromise

    const result = (await entryPromise).result

    const endTime = Date.now()

    // update metrics
    const totalTime = endTime - startTime
    count[this.chainId].logRequests.total += 1

    if (totalTime > count[this.chainId].logRequests.maxRequestTime) {
      count[this.chainId].logRequests.maxRequestTime = totalTime
    }

    return result
  }

  async getAllTransferLogsToAddress(address: string): Promise<Array<Log>> {
    if (!this.hasUnlimitedGetLogsRange) {
      throw new NotSupportedUnlimitedGetLogsBlockRange()
    }

    const transferEventSignature = ethers.id(
      'Transfer(address,address,uint256)',
    )

    const transferFilter = {
      fromBlock: 0,
      toBlock: 'latest',
      topics: [
        transferEventSignature,
        null,
        ethers.zeroPadValue(address, 32), // to address
      ],
    }

    return this.getLogs(transferFilter)
  }
}
