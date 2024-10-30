import { promises as fs } from 'node:fs'
import path from 'node:path'
import { Chain, ChainIdToChainNameMap } from '../core/constants/chains'
import { bigintJsonParse } from '../core/utils/bigintJson'
import { kebabCase } from '../core/utils/caseConversion'
import { logger } from '../core/utils/logger'
import { DefiProvider } from '../defiProvider'
import { getInvalidAddresses } from '../scripts/addressValidation'
import { protocolFilter } from '../scripts/commandFilters'
import {
  RpcInterceptedResponses,
  startRpcMock,
} from '../scripts/rpcInterceptor'
import { TestCase } from '../types/testCase'
import { testCases as aaveV2ATokenTestCases } from './aave-v2/products/a-token/tests/testCases'
import { testCases as aaveV2StableDebtTokenTestCases } from './aave-v2/products/stable-debt-token/tests/testCases'
import { testCases as aaveV2VariableDebtTokenTestCases } from './aave-v2/products/variable-debt-token/tests/testCases'
import { testCases as aaveV3ATokenTestCases } from './aave-v3/products/a-token/tests/testCases'
import { testCases as aaveV3StableDebtTokenTestCases } from './aave-v3/products/stable-debt-token/tests/testCases'
import { testCases as aaveV3VariableDebtTokenTestCases } from './aave-v3/products/variable-debt-token/tests/testCases'
import { testCases as angleProtocolSavingsTestCases } from './angle-protocol/products/savings/tests/testCases'
import { testCases as beefyCowTokenTestCases } from './beefy/products/cow-token/tests/testCases'
import { testCases as beefyMooTokenTestCases } from './beefy/products/moo-token/tests/testCases'
import { testCases as beefyRcowTokenTestCases } from './beefy/products/rcow-token/tests/testCases'
import { testCases as beefyRmooTokenTestCases } from './beefy/products/rmoo-token/tests/testCases'
import { testCases as carbonDeFiStrategiesTestCases } from './carbon-defi/products/strategies/tests/testCases'
import { testCases as chimpExchangePoolTestCases } from './chimp-exchange/products/pool/tests/testCases'
import { testCases as compoundV2BorrowMarketTestCases } from './compound-v2/products/borrow-market/tests/testCases'
import { testCases as compoundV2SupplyMarketTestCases } from './compound-v2/products/supply-market/tests/testCases'
import { testCases as convexCvxcrvWrapperTestCases } from './convex/products/cvxcrv-wrapper/tests/testCases'
import { testCases as convexPoolTestCases } from './convex/products/pool/tests/testCases'
import { testCases as convexSidechainStakingTestCases } from './convex/products/sidechain-staking/tests/testCases'
import { testCases as convexStakingTestCases } from './convex/products/staking/tests/testCases'
import { testCases as curvePoolTestCases } from './curve/products/pool/tests/testCases'
import { testCases as curveStakingTestCases } from './curve/products/staking/tests/testCases'
import { testCases as curveVotingEscrowTestCases } from './curve/products/voting-escrow/tests/testCases'
import { testCases as deriPoolTestCases } from './deri/products/pool/tests/testCases'
import { testCases as ethenaLpStakingTestCases } from './ethena/products/lp-staking/tests/testCases'
import { testCases as ethenaStakedEnaTestCases } from './ethena/products/staked-ena/tests/testCases'
import { testCases as ethenaStakedUsdeTestCases } from './ethena/products/staked-usde/tests/testCases'
import { testCases as etherFiEEthTestCases } from './etherfi/products/e-eth/tests/testCases'
import { testCases as etherFiL2TestCases } from './etherfi/products/l2/tests/testCases'
import { testCases as etherFiLiquidTestCases } from './etherfi/products/liquid/tests/testCases'
import { testCases as etherFiWeEthTestCases } from './etherfi/products/we-eth/tests/testCases'
import { testCases as fluxBorrowMarketTestCases } from './flux/products/borrow-market/tests/testCases'
import { testCases as fluxSupplyMarketTestCases } from './flux/products/supply-market/tests/testCases'
import { testCases as gmxGlpTestCases } from './gmx/products/glp/tests/testCases'
import { testCases as iZiSwapPoolTestCases } from './iziswap/products/pool/tests/testCases'
import { testCases as lidoStEthTestCases } from './lido/products/st-eth/tests/testCases'
import { testCases as lidoWstEthTestCases } from './lido/products/wst-eth/tests/testCases'
import { testCases as lynexAlgebraTestCases } from './lynex/products/algebra/tests/testCases'
import { testCases as lynexClassicTestCases } from './lynex/products/classic/tests/testCases'
import { testCases as makerSDaiTestCases } from './maker/products/s-dai/tests/testCases'
import { testCases as mendiFinanceBorrowMarketTestCases } from './mendi-finance/products/borrow-market/tests/testCases'
import { testCases as mendiFinanceSupplyMarketTestCases } from './mendi-finance/products/supply-market/tests/testCases'
import { testCases as morphoAaveV2OptimizerBorrowTestCases } from './morpho-aave-v2/products/optimizer-borrow/tests/testCases'
import { testCases as morphoAaveV2OptimizerSupplyTestCases } from './morpho-aave-v2/products/optimizer-supply/tests/testCases'
import { testCases as morphoAaveV3OptimizerBorrowTestCases } from './morpho-aave-v3/products/optimizer-borrow/tests/testCases'
import { testCases as morphoAaveV3OptimizerSupplyTestCases } from './morpho-aave-v3/products/optimizer-supply/tests/testCases'
import { testCases as morphoBlueMarketBorrowTestCases } from './morpho-blue/products/market-borrow/tests/testCases'
import { testCases as morphoBlueMarketSupplyTestCases } from './morpho-blue/products/market-supply/tests/testCases'
import { testCases as morphoBlueVaultTestCases } from './morpho-blue/products/vault/tests/testCases'
import { testCases as morphoCompoundV2OptimizerBorrowTestCases } from './morpho-compound-v2/products/optimizer-borrow/tests/testCases'
import { testCases as morphoCompoundV2OptimizerSupplyTestCases } from './morpho-compound-v2/products/optimizer-supply/tests/testCases'
import { testCases as mountainProtocolUsdmTestCases } from './mountain-protocol/products/usdm/tests/testCases'
import { testCases as mountainProtocolWusdmTestCases } from './mountain-protocol/products/wusdm/tests/testCases'
import { testCases as pancakeswapV2PoolTestCases } from './pancakeswap-v2/products/pool/tests/testCases'
import { testCases as pendleLpTokenTestCases } from './pendle/products/lp-token/tests/testCases'
import { testCases as pendlePrincipleTokenTestCases } from './pendle/products/principle-token/tests/testCases'
import { testCases as pendleStandardisedYieldTokenTestCases } from './pendle/products/standardised-yield-token/tests/testCases'
import { testCases as pendleYieldTokenTestCases } from './pendle/products/yield-token/tests/testCases'
import { Protocol } from './protocols'
import { testCases as quickswapV2PoolTestCases } from './quickswap-v2/products/pool/tests/testCases'
import { testCases as renzoEzEthTestCases } from './renzo/products/ez-eth/tests/testCases'
import { testCases as rocketPoolRethTestCases } from './rocket-pool/products/reth/tests/testCases'
import { testCases as solvSolvBtcTestCases } from './solv/products/solv-btc/tests/testCases'
import { testCases as solvYieldMarketTestCases } from './solv/products/yield-market/tests/testCases'
import { testCases as sonneBorrowMarketTestCases } from './sonne/products/borrow-market/tests/testCases'
import { testCases as sonneSupplyMarketTestCases } from './sonne/products/supply-market/tests/testCases'
import { testCases as sparkV1SpTokenTestCases } from './spark-v1/products/sp-token/tests/testCases'
import { testCases as sparkV1VariableDebtTokenTestCases } from './spark-v1/products/variable-debt-token/tests/testCases'
import { testCases as stakeWiseOsEthTestCases } from './stakewise/products/os-eth/tests/testCases'
import { testCases as stargateFarmDeprecatedTestCases } from './stargate/products/farm-deprecated/tests/testCases'
import { testCases as stargateFarmV2TestCases } from './stargate/products/farm-v2/tests/testCases'
import { testCases as stargateFarmTestCases } from './stargate/products/farm/tests/testCases'
import { testCases as stargatePoolV2TestCases } from './stargate/products/pool-v2/tests/testCases'
import { testCases as stargatePoolTestCases } from './stargate/products/pool/tests/testCases'
import { testCases as stargateVotingEscrowTestCases } from './stargate/products/voting-escrow/tests/testCases'
import {
  type GetTransactionParams,
  supportedProtocols,
} from './supportedProtocols'
import { testCases as sushiswapV2PoolTestCases } from './sushiswap-v2/products/pool/tests/testCases'
import { testCases as swellSwEthTestCases } from './swell/products/sw-eth/tests/testCases'
import { testCases as syncSwapPoolTestCases } from './syncswap/products/pool/tests/testCases'
import { testCases as uniswapV2PoolTestCases } from './uniswap-v2/products/pool/tests/testCases'
import { testCases as uniswapV3PoolTestCases } from './uniswap-v3/products/pool/tests/testCases'
import { testCases as xfaiDexTestCases } from './xfai/products/dex/tests/testCases'
import { testCases as zeroLendATokenTestCases } from './zerolend/products/a-token/tests/testCases'
import { testCases as zeroLendStableDebtTokenTestCases } from './zerolend/products/stable-debt-token/tests/testCases'
import { testCases as zeroLendVariableDebtTokenTestCases } from './zerolend/products/variable-debt-token/tests/testCases'

const TEST_TIMEOUT = 300000

const defiProvider = new DefiProvider({
  useMulticallInterceptor: false,
})
const defiProviderWithMulticall = new DefiProvider({
  useMulticallInterceptor: true,
})

const filterProtocolId = protocolFilter(
  process.env.DEFI_ADAPTERS_TEST_FILTER_PROTOCOL,
)

const filterProductId = process.env.DEFI_ADAPTERS_TEST_FILTER_PRODUCT

// @ts-ignore
const normalizeNegativeZero = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'number' && Object.is(obj[key], -0)) {
      obj[key] = Math.abs(obj[key])
    } else if (obj[key] && typeof obj[key] === 'object') {
      normalizeNegativeZero(obj[key])
    }
  })
  return obj
}

const allTestCases: Record<Protocol, Record<string, TestCase[]>> = {
  [Protocol.AaveV2]: {
    ['a-token']: aaveV2ATokenTestCases,
    ['stable-debt-token']: aaveV2StableDebtTokenTestCases,
    ['variable-debt-token']: aaveV2VariableDebtTokenTestCases,
  },
  [Protocol.AaveV3]: {
    ['a-token']: aaveV3ATokenTestCases,
    ['stable-debt-token']: aaveV3StableDebtTokenTestCases,
    ['variable-debt-token']: aaveV3VariableDebtTokenTestCases,
  },
  [Protocol.AngleProtocol]: {
    ['savings']: angleProtocolSavingsTestCases,
  },
  [Protocol.Beefy]: {
    ['cow-token']: beefyCowTokenTestCases,
    ['moo-token']: beefyMooTokenTestCases,
    ['rcow-token']: beefyRcowTokenTestCases,
    ['rmoo-token']: beefyRmooTokenTestCases,
  },
  [Protocol.CarbonDeFi]: {
    ['strategies']: carbonDeFiStrategiesTestCases,
  },
  [Protocol.ChimpExchange]: {
    ['pool']: chimpExchangePoolTestCases,
  },
  [Protocol.CompoundV2]: {
    ['borrow-market']: compoundV2BorrowMarketTestCases,
    ['supply-market']: compoundV2SupplyMarketTestCases,
  },
  [Protocol.Convex]: {
    ['cvxcrv-wrapper']: convexCvxcrvWrapperTestCases,
    ['pool']: convexPoolTestCases,
    ['sidechain-staking']: convexSidechainStakingTestCases,
    ['staking']: convexStakingTestCases,
  },
  [Protocol.Curve]: {
    ['pool']: curvePoolTestCases,
    ['staking']: curveStakingTestCases,
    ['voting-escrow']: curveVotingEscrowTestCases,
  },
  [Protocol.Deri]: {
    ['pool']: deriPoolTestCases,
  },
  [Protocol.Ethena]: {
    ['lp-staking']: ethenaLpStakingTestCases,
    ['staked-ena']: ethenaStakedEnaTestCases,
    ['staked-usde']: ethenaStakedUsdeTestCases,
  },
  [Protocol.EtherFi]: {
    ['e-eth']: etherFiEEthTestCases,
    ['l2']: etherFiL2TestCases,
    ['liquid']: etherFiLiquidTestCases,
    ['we-eth']: etherFiWeEthTestCases,
  },
  [Protocol.Flux]: {
    ['borrow-market']: fluxBorrowMarketTestCases,
    ['supply-market']: fluxSupplyMarketTestCases,
  },
  [Protocol.Gmx]: {
    ['glp']: gmxGlpTestCases,
  },
  [Protocol.IZiSwap]: {
    ['pool']: iZiSwapPoolTestCases,
  },
  [Protocol.Lido]: {
    ['st-eth']: lidoStEthTestCases,
    ['wst-eth']: lidoWstEthTestCases,
  },
  [Protocol.Lynex]: {
    ['algebra']: lynexAlgebraTestCases,
    ['classic']: lynexClassicTestCases,
  },
  [Protocol.Maker]: {
    ['s-dai']: makerSDaiTestCases,
  },
  [Protocol.MendiFinance]: {
    ['borrow-market']: mendiFinanceBorrowMarketTestCases,
    ['supply-market']: mendiFinanceSupplyMarketTestCases,
  },
  [Protocol.MorphoAaveV2]: {
    ['optimizer-borrow']: morphoAaveV2OptimizerBorrowTestCases,
    ['optimizer-supply']: morphoAaveV2OptimizerSupplyTestCases,
  },
  [Protocol.MorphoAaveV3]: {
    ['optimizer-borrow']: morphoAaveV3OptimizerBorrowTestCases,
    ['optimizer-supply']: morphoAaveV3OptimizerSupplyTestCases,
  },
  [Protocol.MorphoBlue]: {
    ['market-borrow']: morphoBlueMarketBorrowTestCases,
    ['market-supply']: morphoBlueMarketSupplyTestCases,
    ['vault']: morphoBlueVaultTestCases,
  },
  [Protocol.MorphoCompoundV2]: {
    ['optimizer-borrow']: morphoCompoundV2OptimizerBorrowTestCases,
    ['optimizer-supply']: morphoCompoundV2OptimizerSupplyTestCases,
  },
  [Protocol.MountainProtocol]: {
    ['usdm']: mountainProtocolUsdmTestCases,
    ['wusdm']: mountainProtocolWusdmTestCases,
  },
  [Protocol.PancakeswapV2]: {
    ['pool']: pancakeswapV2PoolTestCases,
  },
  [Protocol.Pendle]: {
    ['lp-token']: pendleLpTokenTestCases,
    ['principle-token']: pendlePrincipleTokenTestCases,
    ['standardised-yield-token']: pendleStandardisedYieldTokenTestCases,
    ['yield-token']: pendleYieldTokenTestCases,
  },
  [Protocol.QuickswapV2]: {
    ['pool']: quickswapV2PoolTestCases,
  },
  [Protocol.Renzo]: {
    ['ez-eth']: renzoEzEthTestCases,
  },
  [Protocol.RocketPool]: {
    ['reth']: rocketPoolRethTestCases,
  },
  [Protocol.Solv]: {
    ['solv-btc']: solvSolvBtcTestCases,
    ['yield-market']: solvYieldMarketTestCases,
  },
  [Protocol.Sonne]: {
    ['borrow-market']: sonneBorrowMarketTestCases,
    ['supply-market']: sonneSupplyMarketTestCases,
  },
  [Protocol.SparkV1]: {
    ['sp-token']: sparkV1SpTokenTestCases,
    ['variable-debt-token']: sparkV1VariableDebtTokenTestCases,
  },
  [Protocol.StakeWise]: {
    ['os-eth']: stakeWiseOsEthTestCases,
  },
  [Protocol.Stargate]: {
    ['farm']: stargateFarmTestCases,
    ['farm-deprecated']: stargateFarmDeprecatedTestCases,
    ['farm-v2']: stargateFarmV2TestCases,
    ['pool']: stargatePoolTestCases,
    ['pool-v2']: stargatePoolV2TestCases,
    ['voting-escrow']: stargateVotingEscrowTestCases,
  },
  [Protocol.SushiswapV2]: {
    ['pool']: sushiswapV2PoolTestCases,
  },
  [Protocol.Swell]: {
    ['sw-eth']: swellSwEthTestCases,
  },
  [Protocol.SyncSwap]: {
    ['pool']: syncSwapPoolTestCases,
  },
  [Protocol.UniswapV2]: {
    ['pool']: uniswapV2PoolTestCases,
  },
  [Protocol.UniswapV3]: {
    ['pool']: uniswapV3PoolTestCases,
  },
  [Protocol.Xfai]: {
    ['dex']: xfaiDexTestCases,
  },
  [Protocol.ZeroLend]: {
    ['a-token']: zeroLendATokenTestCases,
    ['stable-debt-token']: zeroLendStableDebtTokenTestCases,
    ['variable-debt-token']: zeroLendVariableDebtTokenTestCases,
  },
}

runAllTests()

function runAllTests() {
  if (filterProtocolId) {
    const protocolTestCases = allTestCases[filterProtocolId]

    if (filterProductId) {
      const productTestCases = protocolTestCases[filterProductId]

      if (!productTestCases) {
        throw new Error(
          `Test cases for product ${filterProductId} and protocol ${filterProtocolId} not found`,
        )
      }

      describe(filterProtocolId, () => {
        runProductTests(filterProtocolId, filterProductId, productTestCases)
      })

      return
    }

    Object.entries(protocolTestCases).forEach(
      ([productId, productTestCases]) => {
        describe(filterProtocolId, () => {
          runProductTests(filterProtocolId, productId, productTestCases)
        })
      },
    )

    return
  }

  Object.entries(allTestCases).forEach(([protocolId, protocolTestCases]) => {
    Object.entries(protocolTestCases).forEach(
      ([productId, productTestCases]) => {
        describe(protocolId, () => {
          runProductTests(protocolId as Protocol, productId, productTestCases)
        })
      },
    )
  })
}

function runProductTests(
  protocolId: Protocol,
  productId: string,
  testCases: TestCase[],
) {
  describe(productId, () => {
    let rpcMockStop: (() => void) | undefined

    beforeAll(async () => {
      const allMocks = (
        await Promise.all(
          testCases.map(async (testCase) => {
            const { rpcResponses } = await loadJsonFile(
              testCase,
              protocolId,
              productId,
            )

            if (!rpcResponses) {
              return []
            }

            return Object.entries(rpcResponses).map(([key, responses]) => ({
              key,
              responses,
            }))
          }),
        )
      )
        .flatMap((x) => x)
        .reduce((acc, x) => {
          acc[x.key] = x.responses
          return acc
        }, {} as RpcInterceptedResponses)

      const chainUrls = Object.values(defiProvider.chainProvider.providers).map(
        (rpcProvider) => rpcProvider._getConnection().url,
      )

      if (Object.keys(allMocks).length > 0) {
        const { stop } = startRpcMock(allMocks, chainUrls)
        rpcMockStop = stop
      }
    })

    afterAll(() => {
      rpcMockStop?.()
    })

    const protocolChains = Object.keys(supportedProtocols[protocolId]).map(
      (chainIdKey) => Number(chainIdKey),
    ) as Chain[]

    for (const chainId of protocolChains) {
      const adapters =
        defiProvider.adaptersController.fetchChainProtocolAdapters(
          chainId,
          protocolId,
        )

      for (const [productId, adapter] of adapters) {
        it(`protocol token addresses are checksumed (${protocolId} # ${productId} # ${ChainIdToChainNameMap[chainId]})`, async () => {
          let protocolTokenAddresses: string[]
          try {
            protocolTokenAddresses = (await adapter.getProtocolTokens()).map(
              (x) => x.address,
            )
          } catch (error) {
            // Skip if adapter does not have protocol tokens
            expect(true).toBeTruthy()
            return
          }

          const invalidAddresses = getInvalidAddresses(protocolTokenAddresses)

          if (invalidAddresses.length > 0) {
            throw new Error(
              `Invalid protocol token addresses found:\n${invalidAddresses.join(
                '\n',
              )}`,
            )
          }

          expect(true).toBeTruthy()
        })
      }
    }

    const positionsTestCases = testCases.filter(
      (testCase): testCase is TestCase & { method: 'positions' } =>
        testCase.method === 'positions',
    )
    if (positionsTestCases.length) {
      describe('getPositions', () => {
        it.each(
          positionsTestCases.map((testCase) => [testKey(testCase), testCase]),
        )(
          'positions for test %s match',
          async (_, testCase) => {
            const { snapshot, blockNumber, defiProvider } = await fetchSnapshot(
              testCase,
              protocolId,
              productId,
            )

            const response = await defiProvider.getPositions({
              ...testCase.input,
              filterProtocolIds: [protocolId],
              filterProductIds: [productId],
              filterChainIds: [testCase.chainId],
              blockNumbers: { [testCase.chainId]: blockNumber },
            })

            expect(response).toEqual(snapshot)
          },
          TEST_TIMEOUT,
        )

        afterAll(() => {
          logger.debug(
            `[Integration test] getPositions for ${protocolId} finished`,
          )
        })
      })
    }

    const profitTestCases = testCases.filter(
      (test): test is TestCase & { method: 'profits' } =>
        test.method === 'profits',
    )
    if (profitTestCases.length) {
      describe('getProfits', () => {
        it.each(
          profitTestCases.map((testCase) => [testKey(testCase), testCase]),
        )(
          'profits for test %s match',
          async (_, testCase) => {
            const { snapshot, blockNumber, defiProvider } = await fetchSnapshot(
              testCase,
              protocolId,
              productId,
            )

            const response = await defiProvider.getProfits({
              ...testCase.input,
              filterProtocolIds: [protocolId],
              filterProductIds: [productId],
              filterChainIds: [testCase.chainId],
              toBlockNumbersOverride: { [testCase.chainId]: blockNumber },
            })

            // Morpho profit test were failing with -0 comparison with 0
            expect(normalizeNegativeZero(response)).toEqual(snapshot)
          },
          TEST_TIMEOUT,
        )

        afterAll(() => {
          logger.debug(
            `[Integration test] getProfits for ${protocolId} finished`,
          )
        })
      })
    }

    const depositsTestCases = testCases.filter(
      (testCase): testCase is TestCase & { method: 'deposits' } =>
        testCase.method === 'deposits',
    )
    if (depositsTestCases.length) {
      describe('deposits', () => {
        it.each(
          depositsTestCases.map((testCase) => [testKey(testCase), testCase]),
        )(
          'deposits for test %s match',
          async (_, testCase) => {
            const { snapshot, defiProvider } = await fetchSnapshot(
              testCase,
              protocolId,
              productId,
            )

            const response = await defiProvider.getDeposits({
              ...testCase.input,
              protocolId: protocolId,
              chainId: testCase.chainId,
              productId,
            })

            expect(response).toEqual(snapshot)
          },
          TEST_TIMEOUT,
        )

        afterAll(() => {
          logger.debug(`[Integration test] deposits for ${protocolId} finished`)
        })
      })
    }

    const withdrawalsTestCases = testCases.filter(
      (testCase): testCase is TestCase & { method: 'withdrawals' } =>
        testCase.method === 'withdrawals',
    )
    if (withdrawalsTestCases.length) {
      describe('withdrawals', () => {
        it.each(
          withdrawalsTestCases.map((testCase) => [testKey(testCase), testCase]),
        )(
          'withdrawals for test %s match',
          async (_, testCase) => {
            const { snapshot, defiProvider } = await fetchSnapshot(
              testCase,
              protocolId,
              productId,
            )

            const response = await defiProvider.getWithdrawals({
              ...testCase.input,
              chainId: testCase.chainId,
              protocolId,
              productId,
            })

            expect(response).toEqual(snapshot)
          },
          TEST_TIMEOUT,
        )

        afterAll(() => {
          logger.debug(
            `[Integration test] withdrawals for ${protocolId} finished`,
          )
        })
      })
    }
    const repaysTestCases = testCases.filter(
      (testCase): testCase is TestCase & { method: 'repays' } =>
        testCase.method === 'repays',
    )
    if (repaysTestCases.length) {
      describe('repays', () => {
        it.each(
          repaysTestCases.map((testCase) => [testKey(testCase), testCase]),
        )(
          'repays for test %s match',
          async (_, testCase) => {
            const { snapshot, defiProvider } = await fetchSnapshot(
              testCase,
              protocolId,
              productId,
            )

            const response = await defiProvider.getRepays({
              ...testCase.input,
              protocolId: protocolId,
              chainId: testCase.chainId,
              productId,
            })

            expect(response).toEqual(snapshot)
          },
          TEST_TIMEOUT,
        )

        afterAll(() => {
          logger.debug(`[Integration test] deposits for ${protocolId} finished`)
        })
      })
    }

    const borrowsTestCases = testCases.filter(
      (testCase): testCase is TestCase & { method: 'borrows' } =>
        testCase.method === 'borrows',
    )
    if (borrowsTestCases.length) {
      describe('borrows', () => {
        it.each(
          borrowsTestCases.map((testCase) => [testKey(testCase), testCase]),
        )(
          'withdrawals for test %s match',
          async (_, testCase) => {
            const { snapshot, defiProvider } = await fetchSnapshot(
              testCase,
              protocolId,
              productId,
            )

            const response = await defiProvider.getBorrows({
              ...testCase.input,
              chainId: testCase.chainId,
              protocolId,
              productId,
            })

            expect(response).toEqual(snapshot)
          },
          TEST_TIMEOUT,
        )

        afterAll(() => {
          logger.debug(
            `[Integration test] withdrawals for ${protocolId} finished`,
          )
        })
      })
    }

    const pricesTestCases = testCases.filter(
      (testCase): testCase is TestCase & { method: 'prices' } =>
        testCase.method === 'prices',
    )
    if (pricesTestCases.length) {
      describe('unwrap', () => {
        it.each(
          pricesTestCases.map((testCase) => [testKey(testCase), testCase]),
        )(
          'unwrap for test %s match',
          async (_, testCase) => {
            const { snapshot, blockNumber, defiProvider } = await fetchSnapshot(
              testCase,
              protocolId,
              productId,
            )

            const response = await defiProvider.unwrap({
              filterProtocolIds: [protocolId],
              filterProductIds: [productId],
              filterChainIds: [testCase.chainId],
              filterProtocolToken: testCase.filterProtocolToken,
              blockNumbers: { [testCase.chainId]: blockNumber },
            })

            expect(response).toEqual(snapshot)
          },
          TEST_TIMEOUT,
        )

        afterAll(() => {
          logger.debug(`[Integration test] unwrap for ${protocolId} finished`)
        })
      })
    }

    const tvlTestCases = testCases.filter(
      (testCase): testCase is TestCase & { method: 'tvl' } =>
        testCase.method === 'tvl',
    )
    if (tvlTestCases.length) {
      describe('getTotalValueLocked', () => {
        it.each(tvlTestCases.map((testCase) => [testKey(testCase), testCase]))(
          'tvl for test %s match',
          async (_, testCase) => {
            const { snapshot, blockNumber, defiProvider } = await fetchSnapshot(
              testCase,
              protocolId,
              productId,
            )

            const response = await defiProvider.getTotalValueLocked({
              filterProtocolIds: [protocolId],
              filterProductIds: [productId],
              filterChainIds: [testCase.chainId],
              filterProtocolTokens: testCase.filterProtocolTokens,
              blockNumbers: { [testCase.chainId]: blockNumber },
            })

            expect(response).toEqual(snapshot)
          },
          TEST_TIMEOUT,
        )

        afterAll(() => {
          logger.debug(
            `[Integration test] getTotalValueLocked for ${protocolId} finished`,
          )
        })
      })
    }

    const txParamsTestCases = testCases.filter(
      (testCase): testCase is TestCase & { method: 'tx-params' } =>
        testCase.method === 'tx-params',
    )

    if (txParamsTestCases.length) {
      describe('tx-params', () => {
        it.each(
          txParamsTestCases.map((testCase) => [testKey(testCase), testCase]),
        )(
          'tx-params for test %s match',
          async (_, testCase) => {
            const { snapshot, defiProvider } = await fetchSnapshot(
              testCase,
              protocolId,
              productId,
            )

            const inputs = {
              ...testCase.input,
              protocolId,
              chainId: testCase.chainId,
              productId,
            } as GetTransactionParams

            const response = await defiProvider.getTransactionParams(inputs)

            expect(response).toEqual(snapshot)
          },
          TEST_TIMEOUT,
        )

        afterAll(() => {
          logger.debug(`[Integration test] deposits for ${protocolId} finished`)
        })
      })
    }
  })
}

function testKey({ chainId, method, key }: TestCase) {
  return `${ChainIdToChainNameMap[chainId]}.${method}${
    key ? `.${kebabCase(key)}` : ''
  }`
}

async function fetchSnapshot(
  testCase: TestCase,
  protocolId: Protocol,
  productId: string,
) {
  const { snapshot, blockNumber, rpcResponses } = await loadJsonFile(
    testCase,
    protocolId,
    productId,
  )

  return {
    snapshot,
    blockNumber,
    defiProvider: rpcResponses ? defiProvider : defiProviderWithMulticall,
  }
}

async function loadJsonFile(
  testCase: TestCase,
  protocolId: Protocol,
  productId: string,
) {
  const expectedString = await fs.readFile(
    path.resolve(
      __dirname,
      `./${protocolId}/products/${productId}/tests/snapshots/${testKey(
        testCase,
      )}.json`,
    ),
    'utf-8',
  )

  const { snapshot, blockNumber, rpcResponses } = bigintJsonParse(
    expectedString,
  ) as {
    snapshot: unknown
    blockNumber?: number
    rpcResponses?: RpcInterceptedResponses
  }

  return {
    snapshot,
    blockNumber,
    rpcResponses,
  }
}
