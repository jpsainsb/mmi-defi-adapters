import { Chain } from '../../../../../core/constants/chains'
import type { TestCase } from '../../../../../types/testCase'

export const testCases: TestCase[] = [
  {
    chainId: Chain.Ethereum,
    key: 'profits2',
    method: 'profits',
    input: {
      userAddress: '0x92832b0f4435e1c4510bd601727356b738c99312',

      filterProtocolTokens: [
        '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
        '0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0',
      ],
    },
    blockNumber: 16740459,
  },
  {
    chainId: Chain.Ethereum,
    method: 'positions',
    input: {
      userAddress: '0x9fcc67d7db763787bb1c7f3bc7f34d3c548c19fe',

      filterProtocolTokens: [
        '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
        '0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0',
      ],
    },
    blockNumber: 18377483,
  },
  {
    chainId: Chain.Ethereum,
    key: 'profits1',
    method: 'profits',
    input: {
      userAddress: '0x9fcc67d7db763787bb1c7f3bc7f34d3c548c19fe',

      filterProtocolTokens: [
        '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
        '0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0',
      ],
    },
    blockNumber: 18377483,
  },

  {
    chainId: Chain.Ethereum,
    method: 'withdrawals',
    input: {
      userAddress: '0x92832b0f4435e1c4510bd601727356b738c99312',
      fromBlock: 16690437,
      toBlock: 16740459,
      protocolTokenAddress: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
    },
  },
  {
    key: 'st-eth',
    chainId: Chain.Ethereum,
    method: 'prices',
    filterProtocolToken: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
    blockNumber: 19661884,
  },
  {
    chainId: Chain.Ethereum,
    method: 'tvl',
    filterProtocolTokens: ['0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84'],
    blockNumber: 19661884,
  },
]
