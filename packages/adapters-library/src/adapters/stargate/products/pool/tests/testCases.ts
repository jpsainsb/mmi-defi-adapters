import { Chain } from '../../../../../core/constants/chains'
import { TimePeriod } from '../../../../../core/constants/timePeriod'
import type { TestCase } from '../../../../../types/testCase'

export const testCases: TestCase[] = [
  {
    chainId: Chain.Ethereum,
    method: 'positions',
    key: 'pool-v1-and-stake',
    input: {
      userAddress: '0x6b8Be925ED8277fE4D27820aE4677e76Ebf4c255',

      filterProtocolTokens: [
        '0xdf0770dF86a8034b3EFEf0A1Bb3c889B8332FF56',
        '0x0e42acBD23FAee03249DAFF896b78d7e79fBD58E',
      ],
    },
    blockNumber: 18163124,
  },
  {
    chainId: Chain.Ethereum,
    method: 'withdrawals',
    key: 'pool-v1',
    input: {
      userAddress: '0xB0D502E938ed5f4df2E681fE6E419ff29631d62b',
      fromBlock: 18156819,
      toBlock: 18163965,
      protocolTokenAddress: '0xdf0770df86a8034b3efef0a1bb3c889b8332ff56',
    },
  },
  {
    chainId: Chain.Ethereum,
    method: 'deposits',
    key: 'pool-v1',
    input: {
      userAddress: '0x2C5D4A0943e9cF4C597a76464396B0bF84C24C45',
      fromBlock: 17719334,
      toBlock: 17719336,
      protocolTokenAddress: '0xdf0770df86a8034b3efef0a1bb3c889b8332ff56',
    },
  },
  {
    chainId: Chain.Ethereum,
    method: 'profits',
    key: 'pool-v1',
    input: {
      userAddress: '0xCEadFdCCd0E8E370D985c49Ed3117b2572243A4a',
      timePeriod: TimePeriod.oneDay,
      filterProtocolTokens: ['0xE8F55368C82D38bbbbDb5533e7F56AfC2E978CC2'],
    },
    blockNumber: 18163965,
  },
  {
    chainId: Chain.Ethereum,
    method: 'tvl',
    filterProtocolTokens: ['0xdf0770dF86a8034b3EFEf0A1Bb3c889B8332FF56'],
    blockNumber: 19661888,
  },
]
