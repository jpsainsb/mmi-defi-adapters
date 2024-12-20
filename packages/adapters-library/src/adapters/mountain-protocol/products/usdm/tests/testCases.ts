import { Chain } from '../../../../../core/constants/chains'
import type { TestCase } from '../../../../../types/testCase'

export const testCases: TestCase[] = [
  {
    chainId: Chain.Ethereum,
    method: 'positions',

    input: {
      userAddress: '0x426c4966fC76Bf782A663203c023578B744e4C5E',
      filterProtocolTokens: ['0x59D9356E565Ab3A36dD77763Fc0d87fEaf85508C'],
    },

    blockNumber: 20686474,
  },
  {
    chainId: Chain.Ethereum,
    method: 'profits',

    input: {
      userAddress: '0x426c4966fC76Bf782A663203c023578B744e4C5E',

      filterProtocolTokens: ['0x59D9356E565Ab3A36dD77763Fc0d87fEaf85508C'],
    },

    blockNumber: 20686512,
  },
  {
    chainId: Chain.Ethereum,
    method: 'withdrawals',
    input: {
      userAddress: '0x426c4966fC76Bf782A663203c023578B744e4C5E',
      fromBlock: 20672435,
      toBlock: 20680160,
      protocolTokenAddress: '0x59D9356E565Ab3A36dD77763Fc0d87fEaf85508C',
    },
  },
  {
    key: 'usdm',
    chainId: Chain.Ethereum,
    method: 'prices',
    filterProtocolToken: '0x59D9356E565Ab3A36dD77763Fc0d87fEaf85508C',
    blockNumber: 20686564,
  },
  {
    chainId: Chain.Ethereum,
    method: 'tvl',

    filterProtocolTokens: ['0x59D9356E565Ab3A36dD77763Fc0d87fEaf85508C'],

    blockNumber: 19661884,
  },
]
