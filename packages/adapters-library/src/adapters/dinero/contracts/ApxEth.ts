/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export interface ApxEthInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "DOMAIN_SEPARATOR"
      | "acceptOwnership"
      | "allowance"
      | "approve"
      | "asset"
      | "assetsPerShare"
      | "balanceOf"
      | "convertToAssets"
      | "convertToShares"
      | "decimals"
      | "deposit"
      | "earned"
      | "harvest"
      | "lastTimeRewardApplicable"
      | "lastUpdateTime"
      | "maxDeposit"
      | "maxMint"
      | "maxRedeem"
      | "maxWithdraw"
      | "mint"
      | "name"
      | "nonces"
      | "notifyRewardAmount"
      | "owner"
      | "pendingOwner"
      | "periodFinish"
      | "permit"
      | "pirexEth"
      | "platform"
      | "platformFee"
      | "previewDeposit"
      | "previewMint"
      | "previewRedeem"
      | "previewWithdraw"
      | "redeem"
      | "renounceOwnership"
      | "rewardPerToken"
      | "rewardPerTokenPaid"
      | "rewardPerTokenStored"
      | "rewardRate"
      | "rewards"
      | "setPirexEth"
      | "setPlatform"
      | "setPlatformFee"
      | "setWithdrawalPenalty"
      | "symbol"
      | "totalAssets"
      | "totalStaked"
      | "totalSupply"
      | "transfer"
      | "transferFrom"
      | "transferOwnership"
      | "withdraw"
      | "withdrawalPenalty"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "Approval"
      | "Deposit"
      | "Harvest"
      | "OwnershipTransferStarted"
      | "OwnershipTransferred"
      | "PlatformFeeUpdated"
      | "PlatformUpdated"
      | "RewardAdded"
      | "SetPirexEth"
      | "Transfer"
      | "Withdraw"
      | "WithdrawalPenaltyUpdated"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "DOMAIN_SEPARATOR",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "acceptOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "allowance",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "asset", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "assetsPerShare",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOf",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "convertToAssets",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "convertToShares",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "earned", values?: undefined): string;
  encodeFunctionData(functionFragment: "harvest", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "lastTimeRewardApplicable",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "lastUpdateTime",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "maxDeposit",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "maxMint",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "maxRedeem",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "maxWithdraw",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "mint",
    values: [BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(functionFragment: "nonces", values: [AddressLike]): string;
  encodeFunctionData(
    functionFragment: "notifyRewardAmount",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pendingOwner",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "periodFinish",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "permit",
    values: [
      AddressLike,
      AddressLike,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BytesLike,
      BytesLike
    ]
  ): string;
  encodeFunctionData(functionFragment: "pirexEth", values?: undefined): string;
  encodeFunctionData(functionFragment: "platform", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "platformFee",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "previewDeposit",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "previewMint",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "previewRedeem",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "previewWithdraw",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "redeem",
    values: [BigNumberish, AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rewardPerToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rewardPerTokenPaid",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rewardPerTokenStored",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rewardRate",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "rewards", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setPirexEth",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setPlatform",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setPlatformFee",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setWithdrawalPenalty",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "totalAssets",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalStaked",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [BigNumberish, AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawalPenalty",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "DOMAIN_SEPARATOR",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "acceptOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "asset", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "assetsPerShare",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "convertToAssets",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "convertToShares",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "earned", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "harvest", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "lastTimeRewardApplicable",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lastUpdateTime",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "maxDeposit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "maxMint", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "maxRedeem", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "maxWithdraw",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nonces", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "notifyRewardAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pendingOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "periodFinish",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "permit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pirexEth", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "platform", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "platformFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "previewDeposit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "previewMint",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "previewRedeem",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "previewWithdraw",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "redeem", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rewardPerToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rewardPerTokenPaid",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rewardPerTokenStored",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "rewardRate", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "rewards", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setPirexEth",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setPlatform",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setPlatformFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setWithdrawalPenalty",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalAssets",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalStaked",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawalPenalty",
    data: BytesLike
  ): Result;
}

export namespace ApprovalEvent {
  export type InputTuple = [
    owner: AddressLike,
    spender: AddressLike,
    amount: BigNumberish
  ];
  export type OutputTuple = [owner: string, spender: string, amount: bigint];
  export interface OutputObject {
    owner: string;
    spender: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace DepositEvent {
  export type InputTuple = [
    caller: AddressLike,
    owner: AddressLike,
    assets: BigNumberish,
    shares: BigNumberish
  ];
  export type OutputTuple = [
    caller: string,
    owner: string,
    assets: bigint,
    shares: bigint
  ];
  export interface OutputObject {
    caller: string;
    owner: string;
    assets: bigint;
    shares: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace HarvestEvent {
  export type InputTuple = [caller: AddressLike, value: BigNumberish];
  export type OutputTuple = [caller: string, value: bigint];
  export interface OutputObject {
    caller: string;
    value: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferStartedEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace PlatformFeeUpdatedEvent {
  export type InputTuple = [fee: BigNumberish];
  export type OutputTuple = [fee: bigint];
  export interface OutputObject {
    fee: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace PlatformUpdatedEvent {
  export type InputTuple = [_platform: AddressLike];
  export type OutputTuple = [_platform: string];
  export interface OutputObject {
    _platform: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RewardAddedEvent {
  export type InputTuple = [reward: BigNumberish];
  export type OutputTuple = [reward: bigint];
  export interface OutputObject {
    reward: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace SetPirexEthEvent {
  export type InputTuple = [_pirexEth: AddressLike];
  export type OutputTuple = [_pirexEth: string];
  export interface OutputObject {
    _pirexEth: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TransferEvent {
  export type InputTuple = [
    from: AddressLike,
    to: AddressLike,
    amount: BigNumberish
  ];
  export type OutputTuple = [from: string, to: string, amount: bigint];
  export interface OutputObject {
    from: string;
    to: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace WithdrawEvent {
  export type InputTuple = [
    caller: AddressLike,
    receiver: AddressLike,
    owner: AddressLike,
    assets: BigNumberish,
    shares: BigNumberish
  ];
  export type OutputTuple = [
    caller: string,
    receiver: string,
    owner: string,
    assets: bigint,
    shares: bigint
  ];
  export interface OutputObject {
    caller: string;
    receiver: string;
    owner: string;
    assets: bigint;
    shares: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace WithdrawalPenaltyUpdatedEvent {
  export type InputTuple = [penalty: BigNumberish];
  export type OutputTuple = [penalty: bigint];
  export interface OutputObject {
    penalty: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface ApxEth extends BaseContract {
  connect(runner?: ContractRunner | null): ApxEth;
  waitForDeployment(): Promise<this>;

  interface: ApxEthInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  DOMAIN_SEPARATOR: TypedContractMethod<[], [string], "view">;

  acceptOwnership: TypedContractMethod<[], [void], "nonpayable">;

  allowance: TypedContractMethod<
    [arg0: AddressLike, arg1: AddressLike],
    [bigint],
    "view"
  >;

  approve: TypedContractMethod<
    [spender: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  asset: TypedContractMethod<[], [string], "view">;

  assetsPerShare: TypedContractMethod<[], [bigint], "view">;

  balanceOf: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  convertToAssets: TypedContractMethod<
    [shares: BigNumberish],
    [bigint],
    "view"
  >;

  convertToShares: TypedContractMethod<
    [assets: BigNumberish],
    [bigint],
    "view"
  >;

  decimals: TypedContractMethod<[], [bigint], "view">;

  deposit: TypedContractMethod<
    [assets: BigNumberish, receiver: AddressLike],
    [bigint],
    "nonpayable"
  >;

  earned: TypedContractMethod<[], [bigint], "view">;

  harvest: TypedContractMethod<[], [void], "nonpayable">;

  lastTimeRewardApplicable: TypedContractMethod<[], [bigint], "view">;

  lastUpdateTime: TypedContractMethod<[], [bigint], "view">;

  maxDeposit: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  maxMint: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  maxRedeem: TypedContractMethod<[owner: AddressLike], [bigint], "view">;

  maxWithdraw: TypedContractMethod<[owner: AddressLike], [bigint], "view">;

  mint: TypedContractMethod<
    [shares: BigNumberish, receiver: AddressLike],
    [bigint],
    "nonpayable"
  >;

  name: TypedContractMethod<[], [string], "view">;

  nonces: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  notifyRewardAmount: TypedContractMethod<[], [void], "nonpayable">;

  owner: TypedContractMethod<[], [string], "view">;

  pendingOwner: TypedContractMethod<[], [string], "view">;

  periodFinish: TypedContractMethod<[], [bigint], "view">;

  permit: TypedContractMethod<
    [
      owner: AddressLike,
      spender: AddressLike,
      value: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  pirexEth: TypedContractMethod<[], [string], "view">;

  platform: TypedContractMethod<[], [string], "view">;

  platformFee: TypedContractMethod<[], [bigint], "view">;

  previewDeposit: TypedContractMethod<[assets: BigNumberish], [bigint], "view">;

  previewMint: TypedContractMethod<[shares: BigNumberish], [bigint], "view">;

  previewRedeem: TypedContractMethod<[shares: BigNumberish], [bigint], "view">;

  previewWithdraw: TypedContractMethod<
    [assets: BigNumberish],
    [bigint],
    "view"
  >;

  redeem: TypedContractMethod<
    [shares: BigNumberish, receiver: AddressLike, owner: AddressLike],
    [bigint],
    "nonpayable"
  >;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  rewardPerToken: TypedContractMethod<[], [bigint], "view">;

  rewardPerTokenPaid: TypedContractMethod<[], [bigint], "view">;

  rewardPerTokenStored: TypedContractMethod<[], [bigint], "view">;

  rewardRate: TypedContractMethod<[], [bigint], "view">;

  rewards: TypedContractMethod<[], [bigint], "view">;

  setPirexEth: TypedContractMethod<
    [_pirexEth: AddressLike],
    [void],
    "nonpayable"
  >;

  setPlatform: TypedContractMethod<
    [_platform: AddressLike],
    [void],
    "nonpayable"
  >;

  setPlatformFee: TypedContractMethod<
    [fee: BigNumberish],
    [void],
    "nonpayable"
  >;

  setWithdrawalPenalty: TypedContractMethod<
    [penalty: BigNumberish],
    [void],
    "nonpayable"
  >;

  symbol: TypedContractMethod<[], [string], "view">;

  totalAssets: TypedContractMethod<[], [bigint], "view">;

  totalStaked: TypedContractMethod<[], [bigint], "view">;

  totalSupply: TypedContractMethod<[], [bigint], "view">;

  transfer: TypedContractMethod<
    [to: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  transferFrom: TypedContractMethod<
    [from: AddressLike, to: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  withdraw: TypedContractMethod<
    [assets: BigNumberish, receiver: AddressLike, owner: AddressLike],
    [bigint],
    "nonpayable"
  >;

  withdrawalPenalty: TypedContractMethod<[], [bigint], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "DOMAIN_SEPARATOR"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "acceptOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "allowance"
  ): TypedContractMethod<
    [arg0: AddressLike, arg1: AddressLike],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "approve"
  ): TypedContractMethod<
    [spender: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "asset"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "assetsPerShare"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "balanceOf"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "convertToAssets"
  ): TypedContractMethod<[shares: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "convertToShares"
  ): TypedContractMethod<[assets: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "decimals"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "deposit"
  ): TypedContractMethod<
    [assets: BigNumberish, receiver: AddressLike],
    [bigint],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "earned"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "harvest"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "lastTimeRewardApplicable"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "lastUpdateTime"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "maxDeposit"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "maxMint"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "maxRedeem"
  ): TypedContractMethod<[owner: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "maxWithdraw"
  ): TypedContractMethod<[owner: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "mint"
  ): TypedContractMethod<
    [shares: BigNumberish, receiver: AddressLike],
    [bigint],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "name"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "nonces"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "notifyRewardAmount"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "pendingOwner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "periodFinish"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "permit"
  ): TypedContractMethod<
    [
      owner: AddressLike,
      spender: AddressLike,
      value: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "pirexEth"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "platform"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "platformFee"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "previewDeposit"
  ): TypedContractMethod<[assets: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "previewMint"
  ): TypedContractMethod<[shares: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "previewRedeem"
  ): TypedContractMethod<[shares: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "previewWithdraw"
  ): TypedContractMethod<[assets: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "redeem"
  ): TypedContractMethod<
    [shares: BigNumberish, receiver: AddressLike, owner: AddressLike],
    [bigint],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "rewardPerToken"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "rewardPerTokenPaid"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "rewardPerTokenStored"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "rewardRate"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "rewards"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "setPirexEth"
  ): TypedContractMethod<[_pirexEth: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setPlatform"
  ): TypedContractMethod<[_platform: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setPlatformFee"
  ): TypedContractMethod<[fee: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setWithdrawalPenalty"
  ): TypedContractMethod<[penalty: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "symbol"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "totalAssets"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "totalStaked"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "totalSupply"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "transfer"
  ): TypedContractMethod<
    [to: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferFrom"
  ): TypedContractMethod<
    [from: AddressLike, to: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "withdraw"
  ): TypedContractMethod<
    [assets: BigNumberish, receiver: AddressLike, owner: AddressLike],
    [bigint],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "withdrawalPenalty"
  ): TypedContractMethod<[], [bigint], "view">;

  getEvent(
    key: "Approval"
  ): TypedContractEvent<
    ApprovalEvent.InputTuple,
    ApprovalEvent.OutputTuple,
    ApprovalEvent.OutputObject
  >;
  getEvent(
    key: "Deposit"
  ): TypedContractEvent<
    DepositEvent.InputTuple,
    DepositEvent.OutputTuple,
    DepositEvent.OutputObject
  >;
  getEvent(
    key: "Harvest"
  ): TypedContractEvent<
    HarvestEvent.InputTuple,
    HarvestEvent.OutputTuple,
    HarvestEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferStarted"
  ): TypedContractEvent<
    OwnershipTransferStartedEvent.InputTuple,
    OwnershipTransferStartedEvent.OutputTuple,
    OwnershipTransferStartedEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "PlatformFeeUpdated"
  ): TypedContractEvent<
    PlatformFeeUpdatedEvent.InputTuple,
    PlatformFeeUpdatedEvent.OutputTuple,
    PlatformFeeUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "PlatformUpdated"
  ): TypedContractEvent<
    PlatformUpdatedEvent.InputTuple,
    PlatformUpdatedEvent.OutputTuple,
    PlatformUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "RewardAdded"
  ): TypedContractEvent<
    RewardAddedEvent.InputTuple,
    RewardAddedEvent.OutputTuple,
    RewardAddedEvent.OutputObject
  >;
  getEvent(
    key: "SetPirexEth"
  ): TypedContractEvent<
    SetPirexEthEvent.InputTuple,
    SetPirexEthEvent.OutputTuple,
    SetPirexEthEvent.OutputObject
  >;
  getEvent(
    key: "Transfer"
  ): TypedContractEvent<
    TransferEvent.InputTuple,
    TransferEvent.OutputTuple,
    TransferEvent.OutputObject
  >;
  getEvent(
    key: "Withdraw"
  ): TypedContractEvent<
    WithdrawEvent.InputTuple,
    WithdrawEvent.OutputTuple,
    WithdrawEvent.OutputObject
  >;
  getEvent(
    key: "WithdrawalPenaltyUpdated"
  ): TypedContractEvent<
    WithdrawalPenaltyUpdatedEvent.InputTuple,
    WithdrawalPenaltyUpdatedEvent.OutputTuple,
    WithdrawalPenaltyUpdatedEvent.OutputObject
  >;

  filters: {
    "Approval(address,address,uint256)": TypedContractEvent<
      ApprovalEvent.InputTuple,
      ApprovalEvent.OutputTuple,
      ApprovalEvent.OutputObject
    >;
    Approval: TypedContractEvent<
      ApprovalEvent.InputTuple,
      ApprovalEvent.OutputTuple,
      ApprovalEvent.OutputObject
    >;

    "Deposit(address,address,uint256,uint256)": TypedContractEvent<
      DepositEvent.InputTuple,
      DepositEvent.OutputTuple,
      DepositEvent.OutputObject
    >;
    Deposit: TypedContractEvent<
      DepositEvent.InputTuple,
      DepositEvent.OutputTuple,
      DepositEvent.OutputObject
    >;

    "Harvest(address,uint256)": TypedContractEvent<
      HarvestEvent.InputTuple,
      HarvestEvent.OutputTuple,
      HarvestEvent.OutputObject
    >;
    Harvest: TypedContractEvent<
      HarvestEvent.InputTuple,
      HarvestEvent.OutputTuple,
      HarvestEvent.OutputObject
    >;

    "OwnershipTransferStarted(address,address)": TypedContractEvent<
      OwnershipTransferStartedEvent.InputTuple,
      OwnershipTransferStartedEvent.OutputTuple,
      OwnershipTransferStartedEvent.OutputObject
    >;
    OwnershipTransferStarted: TypedContractEvent<
      OwnershipTransferStartedEvent.InputTuple,
      OwnershipTransferStartedEvent.OutputTuple,
      OwnershipTransferStartedEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;

    "PlatformFeeUpdated(uint256)": TypedContractEvent<
      PlatformFeeUpdatedEvent.InputTuple,
      PlatformFeeUpdatedEvent.OutputTuple,
      PlatformFeeUpdatedEvent.OutputObject
    >;
    PlatformFeeUpdated: TypedContractEvent<
      PlatformFeeUpdatedEvent.InputTuple,
      PlatformFeeUpdatedEvent.OutputTuple,
      PlatformFeeUpdatedEvent.OutputObject
    >;

    "PlatformUpdated(address)": TypedContractEvent<
      PlatformUpdatedEvent.InputTuple,
      PlatformUpdatedEvent.OutputTuple,
      PlatformUpdatedEvent.OutputObject
    >;
    PlatformUpdated: TypedContractEvent<
      PlatformUpdatedEvent.InputTuple,
      PlatformUpdatedEvent.OutputTuple,
      PlatformUpdatedEvent.OutputObject
    >;

    "RewardAdded(uint256)": TypedContractEvent<
      RewardAddedEvent.InputTuple,
      RewardAddedEvent.OutputTuple,
      RewardAddedEvent.OutputObject
    >;
    RewardAdded: TypedContractEvent<
      RewardAddedEvent.InputTuple,
      RewardAddedEvent.OutputTuple,
      RewardAddedEvent.OutputObject
    >;

    "SetPirexEth(address)": TypedContractEvent<
      SetPirexEthEvent.InputTuple,
      SetPirexEthEvent.OutputTuple,
      SetPirexEthEvent.OutputObject
    >;
    SetPirexEth: TypedContractEvent<
      SetPirexEthEvent.InputTuple,
      SetPirexEthEvent.OutputTuple,
      SetPirexEthEvent.OutputObject
    >;

    "Transfer(address,address,uint256)": TypedContractEvent<
      TransferEvent.InputTuple,
      TransferEvent.OutputTuple,
      TransferEvent.OutputObject
    >;
    Transfer: TypedContractEvent<
      TransferEvent.InputTuple,
      TransferEvent.OutputTuple,
      TransferEvent.OutputObject
    >;

    "Withdraw(address,address,address,uint256,uint256)": TypedContractEvent<
      WithdrawEvent.InputTuple,
      WithdrawEvent.OutputTuple,
      WithdrawEvent.OutputObject
    >;
    Withdraw: TypedContractEvent<
      WithdrawEvent.InputTuple,
      WithdrawEvent.OutputTuple,
      WithdrawEvent.OutputObject
    >;

    "WithdrawalPenaltyUpdated(uint256)": TypedContractEvent<
      WithdrawalPenaltyUpdatedEvent.InputTuple,
      WithdrawalPenaltyUpdatedEvent.OutputTuple,
      WithdrawalPenaltyUpdatedEvent.OutputObject
    >;
    WithdrawalPenaltyUpdated: TypedContractEvent<
      WithdrawalPenaltyUpdatedEvent.InputTuple,
      WithdrawalPenaltyUpdatedEvent.OutputTuple,
      WithdrawalPenaltyUpdatedEvent.OutputObject
    >;
  };
}