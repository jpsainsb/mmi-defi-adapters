import { Chain } from '../../../../../core/constants/chains'
import { TimePeriod } from '../../../../../core/constants/timePeriod'
import type { TestCase } from '../../../../../types/testCase'

export const testCases: TestCase[] = [
  {
    chainId: Chain.Optimism,
    method: 'positions',

    input: {
      userAddress: '0xaA62CF7caaf0c7E50Deaa9d5D0b907472F00B258',

      filterProtocolTokens: ['0xf7B5965f5C117Eb1B5450187c9DcFccc3C317e8E'],
    },

    blockNumber: 119518821,
  },
  {
    chainId: Chain.Optimism,
    method: 'profits',

    input: {
      userAddress: '0xaA62CF7caaf0c7E50Deaa9d5D0b907472F00B258',
      timePeriod: TimePeriod.oneDay,

      filterProtocolTokens: ['0xf7B5965f5C117Eb1B5450187c9DcFccc3C317e8E'],
    },

    blockNumber: 119518821,
  },
  {
    chainId: Chain.Optimism,
    method: 'tvl',

    filterProtocolTokens: ['0xf7B5965f5C117Eb1B5450187c9DcFccc3C317e8E'],

    blockNumber: 119518821,
  },
]