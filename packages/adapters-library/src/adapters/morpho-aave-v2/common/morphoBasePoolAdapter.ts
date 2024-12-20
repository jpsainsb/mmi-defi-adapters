import { getAddress } from 'ethers'
import { AdaptersController } from '../../../core/adaptersController'
import { ZERO_ADDRESS } from '../../../core/constants/ZERO_ADDRESS'
import { Chain } from '../../../core/constants/chains'
import { CacheToDb } from '../../../core/decorators/cacheToDb'
import { NotImplementedError } from '../../../core/errors/errors'
import { CustomJsonRpcProvider } from '../../../core/provider/CustomJsonRpcProvider'
import { getTokenMetadata } from '../../../core/utils/getTokenMetadata'
import { Helpers } from '../../../scripts/helpers'
import {
  IProtocolAdapter,
  ProtocolToken,
} from '../../../types/IProtocolAdapter'
import {
  AdapterSettings,
  GetEventsInput,
  GetPositionsInput,
  GetTotalValueLockedInput,
  MovementsByBlock,
  PositionType,
  ProtocolAdapterParams,
  ProtocolDetails,
  ProtocolPosition,
  ProtocolTokenTvl,
  TokenBalance,
  TokenType,
  Underlying,
  UnwrapExchangeRate,
  UnwrapInput,
} from '../../../types/adapter'
import { Erc20Metadata } from '../../../types/erc20Metadata'
import { Protocol } from '../../protocols'
import {
  AToken__factory,
  MorphoAaveV2Lens__factory,
  MorphoAaveV2__factory,
} from '../contracts'
import { SuppliedEvent } from '../contracts/MorphoAaveV2'
import {
  TypedContractEvent,
  TypedDeferredTopicFilter,
} from '../contracts/common'

const morphoAaveV2ContractAddresses: Partial<
  Record<Protocol, Partial<Record<Chain, string>>>
> = {
  [Protocol.MorphoAaveV2]: {
    [Chain.Ethereum]: getAddress('0x777777c9898d384f785ee44acfe945efdff5f3e0'),
  },
}

export abstract class MorphoBasePoolAdapter implements IProtocolAdapter {
  abstract productId: string
  protocolId: Protocol
  chainId: Chain
  helpers: Helpers

  abstract adapterSettings: AdapterSettings

  private provider: CustomJsonRpcProvider

  constructor({
    provider,
    chainId,
    protocolId,
    adaptersController,
    helpers,
  }: ProtocolAdapterParams) {
    this.provider = provider
    this.chainId = chainId
    this.protocolId = protocolId
    this.adaptersController = adaptersController
    this.helpers = helpers
  }

  lensAddress = getAddress('0x507fa343d0a90786d86c7cd885f5c49263a91ff4')

  adaptersController: AdaptersController

  abstract getProtocolDetails(): ProtocolDetails

  @CacheToDb
  async getProtocolTokens(): Promise<ProtocolToken[]> {
    const morphoAaveV2Contract = MorphoAaveV2__factory.connect(
      morphoAaveV2ContractAddresses[this.protocolId]![this.chainId]!,
      this.provider,
    )

    const markets = await morphoAaveV2Contract.getMarketsCreated()

    return await Promise.all(
      markets.map(async (marketAddress) => {
        const aTokenContract = AToken__factory.connect(
          marketAddress,
          this.provider,
        )

        const supplyTokenAddress = await aTokenContract
          .UNDERLYING_ASSET_ADDRESS()
          .catch((err) => {
            if (err) return ZERO_ADDRESS
            throw err
          })

        // Await the promises directly within Promise.all
        const [protocolToken, underlyingToken] = await Promise.all([
          getTokenMetadata(marketAddress, this.chainId, this.provider),
          getTokenMetadata(supplyTokenAddress, this.chainId, this.provider),
        ])

        return {
          ...protocolToken,
          underlyingTokens: [underlyingToken],
        }
      }),
    )
  }

  private async getUnderlyingTokenBalances({
    protocolTokenBalance,
  }: {
    userAddress: string
    protocolTokenBalance: TokenBalance
    blockNumber?: number
  }): Promise<Underlying[]> {
    const {
      underlyingTokens: [underlyingToken],
    } = await this.getProtocolTokenByAddress(protocolTokenBalance.address)

    const underlyingTokenBalance = {
      ...underlyingToken!,
      balanceRaw: protocolTokenBalance.balanceRaw,
      type: TokenType.Underlying,
    }

    return [underlyingTokenBalance]
  }

  async getPositions({
    userAddress,
    blockNumber,
  }: GetPositionsInput): Promise<ProtocolPosition[]> {
    const lensContract = MorphoAaveV2Lens__factory.connect(
      this.lensAddress,
      this.provider,
    )
    const tokens = await this.getProtocolTokens()
    const positionType = this.getProtocolDetails().positionType

    const getBalance = async (
      market: Erc20Metadata,
      userAddress: string,
      blockNumber: number,
    ): Promise<bigint> => {
      let balanceRaw: bigint
      if (positionType === PositionType.Supply) {
        ;[, , balanceRaw] = await lensContract.getCurrentSupplyBalanceInOf(
          market.address,
          userAddress,
          { blockTag: blockNumber },
        )
      } else {
        ;[, , balanceRaw] = await lensContract.getCurrentBorrowBalanceInOf(
          market.address,
          userAddress,
          { blockTag: blockNumber },
        )
      }
      return balanceRaw
    }

    const protocolTokensBalances = await Promise.all(
      tokens.map(async (market) => {
        const amount = await getBalance(market, userAddress, blockNumber!)
        return {
          address: market.address,
          balance: amount,
        }
      }),
    )

    const protocolTokens: ProtocolPosition[] = await Promise.all(
      protocolTokensBalances
        .filter((protocolTokenBalance) => protocolTokenBalance.balance !== 0n) // Filter out balances equal to 0
        .map(async (protocolTokenBalance) => {
          const protocolToken = await this.getProtocolTokenByAddress(
            protocolTokenBalance.address,
          )

          const completeTokenBalance: TokenBalance = {
            address: protocolTokenBalance.address,
            balanceRaw: protocolTokenBalance.balance,
            name: protocolToken.name,
            symbol: protocolToken.symbol,
            decimals: protocolToken.decimals,
          }

          const underlyingTokenBalances = await this.getUnderlyingTokenBalances(
            {
              userAddress,
              protocolTokenBalance: completeTokenBalance,
              blockNumber,
            },
          )

          return {
            ...protocolTokenBalance,
            balanceRaw: protocolTokenBalance.balance,
            name: protocolToken.name,
            symbol: protocolToken.symbol,
            decimals: protocolToken.decimals,
            type: TokenType.Protocol,
            tokens: underlyingTokenBalances,
          }
        }),
    )
    return protocolTokens
  }

  async getWithdrawals({
    userAddress,
    protocolTokenAddress,
    fromBlock,
    toBlock,
  }: GetEventsInput): Promise<MovementsByBlock[]> {
    return this.getMovements({
      userAddress,
      protocolTokenAddress,
      fromBlock,
      toBlock,
      eventType: 'withdrawn',
    })
  }

  async getDeposits({
    userAddress,
    protocolTokenAddress,
    fromBlock,
    toBlock,
  }: GetEventsInput): Promise<MovementsByBlock[]> {
    return this.getMovements({
      userAddress,
      protocolTokenAddress,
      fromBlock,
      toBlock,
      eventType: 'supplied',
    })
  }

  async getBorrows({
    userAddress,
    protocolTokenAddress,
    fromBlock,
    toBlock,
  }: GetEventsInput): Promise<MovementsByBlock[]> {
    return this.getMovements({
      userAddress,
      protocolTokenAddress,
      fromBlock,
      toBlock,
      eventType: 'borrowed',
    })
  }

  async getRepays({
    userAddress,
    protocolTokenAddress,
    fromBlock,
    toBlock,
  }: GetEventsInput): Promise<MovementsByBlock[]> {
    return this.getMovements({
      userAddress,
      protocolTokenAddress,
      fromBlock,
      toBlock,
      eventType: 'repaid',
    })
  }

  async getTotalValueLocked({
    blockNumber,
    protocolTokenAddresses,
  }: GetTotalValueLockedInput): Promise<ProtocolTokenTvl[]> {
    const tokens = await this.getProtocolTokens()
    const lensContract = MorphoAaveV2Lens__factory.connect(
      this.lensAddress,
      this.provider,
    )
    const positionType = this.getProtocolDetails().positionType
    const result = await Promise.all(
      tokens.map(async (tokenMetadata) => {
        if (
          protocolTokenAddresses &&
          !protocolTokenAddresses.includes(tokenMetadata.address)
        ) {
          return undefined
        }

        let totalValueRaw: bigint

        if (positionType === PositionType.Supply) {
          const [poolSupply, p2pSupply] =
            await lensContract.getTotalMarketSupply(tokenMetadata.address, {
              blockTag: blockNumber,
            })
          totalValueRaw = poolSupply + p2pSupply
        } else {
          // Assuming LensType.Borrow or other types
          const [poolBorrow, p2pBorrow] =
            await lensContract.getTotalMarketBorrow(tokenMetadata.address, {
              blockTag: blockNumber,
            })
          totalValueRaw = poolBorrow + p2pBorrow
        }

        return {
          address: tokenMetadata.address,
          symbol: tokenMetadata.symbol,
          name: tokenMetadata.name,
          decimals: tokenMetadata.decimals,
          type: TokenType.Protocol,
          totalSupplyRaw: totalValueRaw !== undefined ? totalValueRaw : 0n,
        }
      }),
    )

    return result.filter((result): result is ProtocolTokenTvl =>
      Boolean(result),
    )
  }

  async unwrap(_input: UnwrapInput): Promise<UnwrapExchangeRate> {
    throw new NotImplementedError()
  }

  private async getMovements({
    userAddress,
    protocolTokenAddress,
    fromBlock,
    toBlock,
    eventType,
  }: {
    userAddress: string
    protocolTokenAddress: string
    fromBlock: number
    toBlock: number
    eventType: 'supplied' | 'withdrawn' | 'repaid' | 'borrowed'
  }): Promise<MovementsByBlock[]> {
    const morphoProxy =
      morphoAaveV2ContractAddresses[this.protocolId]![this.chainId]!

    const morphoAaveV2Contract = MorphoAaveV2__factory.connect(
      morphoProxy,
      this.provider,
    )

    let filter: TypedDeferredTopicFilter<
      TypedContractEvent<
        SuppliedEvent.InputTuple,
        SuppliedEvent.OutputTuple,
        SuppliedEvent.OutputObject
      >
    >
    switch (eventType) {
      case 'supplied':
        filter = morphoAaveV2Contract.filters.Supplied(
          undefined,
          userAddress,
          protocolTokenAddress,
        )
        break
      case 'withdrawn':
        filter = morphoAaveV2Contract.filters.Withdrawn(
          undefined,
          userAddress,
          protocolTokenAddress,
        )
        break
      case 'repaid':
        filter = morphoAaveV2Contract.filters.Repaid(
          undefined,
          userAddress,
          protocolTokenAddress,
        )
        break
      case 'borrowed':
        filter = morphoAaveV2Contract.filters.Borrowed(
          userAddress,
          protocolTokenAddress,
        )
        break
    }

    const eventResults = await morphoAaveV2Contract.queryFilter(
      filter,
      fromBlock,
      toBlock,
    )

    const movements = await Promise.all(
      eventResults.map(async (event) => {
        const eventData = event.args
        if (!eventData) {
          return null
        }

        const { underlyingTokens, ...protocolToken } =
          await this.getProtocolTokenByAddress(eventData._poolToken)

        const tokens: Underlying[] = underlyingTokens.map(
          (underlyingToken) => ({
            ...underlyingToken,
            balanceRaw: eventData._amount,
            type: TokenType.Underlying,
          }),
        )

        return {
          protocolToken,
          tokens,
          blockNumber: event.blockNumber,
          transactionHash: event.transactionHash,
        }
      }),
    )

    return movements.filter(
      (movement): movement is MovementsByBlock => movement !== null,
    ) as MovementsByBlock[]
  }

  private async getProtocolTokenByAddress(
    protocolTokenAddress: string,
  ): Promise<ProtocolToken> {
    return this.helpers.getProtocolTokenByAddress({
      protocolTokens: await this.getProtocolTokens(),
      protocolTokenAddress,
    })
  }
}
// async getApr({
//   protocolTokenAddress,
//   blockNumber,
// }: GetAprInput): Promise<ProtocolTokenApr> {
//   const apr = await this.getProtocolTokenApr({
//     protocolTokenAddress,
//     blockNumber,
//   })
//   return {
//     ...(await this.fetchProtocolTokenMetadata(protocolTokenAddress)),
//     aprDecimal: apr * 100,
//   }
// }

// async getApy({
//   protocolTokenAddress,
//   blockNumber,
// }: GetApyInput): Promise<ProtocolTokenApy> {
//   const apr = await this.getProtocolTokenApr({
//     protocolTokenAddress,
//     blockNumber,
//   })
//   const apy = aprToApy(apr, SECONDS_PER_YEAR)

//   return {
//     ...(await this.fetchProtocolTokenMetadata(protocolTokenAddress)),
//     apyDecimal: apy * 100,
//   }
// }

// private async getProtocolTokenApr({
//   protocolTokenAddress,
//   blockNumber,
// }: GetAprInput): Promise<number> {
//   const lensContract = MorphoAaveV2Lens__factory.connect(
//     this.lensAddress,
//     this.provider,
//   )
//   const positionType = this.getProtocolDetails().positionType
//   let rate: bigint
//   if (positionType === PositionType.Supply) {
//     ;[rate, ,] = await lensContract.getAverageSupplyRatePerYear(
//       protocolTokenAddress,
//       {
//         blockTag: blockNumber,
//       },
//     )
//   } else {
//     ;[rate, ,] = await lensContract.getAverageBorrowRatePerYear(
//       protocolTokenAddress,
//       {
//         blockTag: blockNumber,
//       },
//     )
//   }
//   return Number(rate) / RAY
// }
