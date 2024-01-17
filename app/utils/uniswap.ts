// import { ethers, BigNumber } from "ethers";

// async function getTokenTransferApproval(address: string, amount: BigNumber) {
//   const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

//   const tokenContract = new ethers.Contract(token.address, ERC20_ABI, provider);

//   return tokenContract.approve(
//     NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS,
//     amount
//   );
// }

// https://github.com/Uniswap/examples/blob/main/v3-sdk/minting-position/src/libs/positions.ts
// https://docs.uniswap.org/sdk/v3/guides/advanced/range-orders
import {
  computePoolAddress,
  FeeAmount,
  MintOptions,
  nearestUsableTick,
  NonfungiblePositionManager,
  Pool,
  Position,
} from "@uniswap/v3-sdk";
import {
  Token,
  SupportedChainsType,
  SUPPORTED_CHAINS,
  CurrencyAmount,
  Percent,
} from "@uniswap/sdk-core";
import { ethers } from "ethers";
import IUniswapV3PoolABI from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";

const POOL_ADDRESS = "0x5c95d4B1C3321CF898D25949F41D50Be2dB5bc1d";

const token0 = new Token(
  SUPPORTED_CHAINS[0],
  "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  6,
  "USDC",
  "USD//C"
);

const token1 = new Token(
  SUPPORTED_CHAINS[0],
  "0x40D16FC0246aD3160Ccc09B8D0D3A2cD28aE6C2f",
  18,
  "GHO",
  "Gho Token"
);

const NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS: string =
  "0xC36442b4a4522E871399CD717aBDD847Ab11FE88";

const POOL_FACTORY_CONTRACT_ADDRESS: string =
  "0x1F98431c8aD98523631AE4a59f267346ea31F984";
export const MAX_FEE_PER_GAS = "100000000000";
export const MAX_PRIORITY_FEE_PER_GAS = "100000000000";

// Sets if the example should run locally or on chain
export enum Environment {
  LOCAL,
  WALLET_EXTENSION,
  MAINNET,
}

// Inputs that configure this example to run
export interface ExampleConfig {
  env: Environment;
  rpc: {
    local: string;
    mainnet: string;
  };
  wallet: {
    address: string;
    privateKey: string;
  };
  tokens: {
    token0: Token;
    token0Amount: number;
    token1: Token;
    token1Amount: number;
    poolFee: FeeAmount;
  };
}

export const CurrentConfig: ExampleConfig = {
  env: Environment.LOCAL,
  rpc: {
    local: "http://localhost:8545",
    mainnet: "",
  },
  wallet: {
    address: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
    privateKey:
      "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
  },
  tokens: {
    token0: token0,
    token0Amount: 1000,
    token1: token1,
    token1Amount: 1000,
    poolFee: FeeAmount.LOW,
  },
};

interface PoolInfo {
  token0: string;
  token1: string;
  fee: number;
  tickSpacing: number;
  sqrtPriceX96: ethers.BigNumber;
  liquidity: ethers.BigNumber;
  tick: number;
}

export async function getPoolInfo(): Promise<PoolInfo> {
  const provider = getProvider();
  if (!provider) {
    throw new Error("No provider");
  }

  const currentPoolAddress = computePoolAddress({
    factoryAddress: POOL_FACTORY_CONTRACT_ADDRESS,
    tokenA: CurrentConfig.tokens.token0,
    tokenB: CurrentConfig.tokens.token1,
    fee: CurrentConfig.tokens.poolFee,
  });

  const poolContract = new ethers.Contract(
    currentPoolAddress,
    IUniswapV3PoolABI.abi,
    provider
  );

  const [token0, token1, fee, tickSpacing, liquidity, slot0] =
    await Promise.all([
      poolContract.token0(),
      poolContract.token1(),
      poolContract.fee(),
      poolContract.tickSpacing(),
      poolContract.liquidity(),
      poolContract.slot0(),
    ]);

  return {
    token0,
    token1,
    fee,
    tickSpacing,
    liquidity,
    sqrtPriceX96: slot0[0],
    tick: slot0[1],
  };
}

export async function constructPosition(
  token0Amount: CurrencyAmount<Token>,
  token1Amount: CurrencyAmount<Token>
): Promise<Position> {
  // get pool info
  const poolInfo = await getPoolInfo();

  // construct pool instance
  const configuredPool = new Pool(
    token0Amount.currency,
    token1Amount.currency,
    poolInfo.fee,
    poolInfo.sqrtPriceX96.toString(),
    poolInfo.liquidity.toString(),
    poolInfo.tick
  );

  // create position using the maximum liquidity from input amounts
  return Position.fromAmounts({
    pool: configuredPool,
    tickLower:
      nearestUsableTick(poolInfo.tick, poolInfo.tickSpacing) -
      poolInfo.tickSpacing * 2,
    tickUpper:
      nearestUsableTick(poolInfo.tick, poolInfo.tickSpacing) +
      poolInfo.tickSpacing * 2,
    amount0: token0Amount.quotient,
    amount1: token1Amount.quotient,
    useFullPrecision: true,
  });
}

export async function mintPosition(): Promise<TransactionState> {
  const address = getWalletAddress();
  const provider = getProvider();
  if (!address || !provider) {
    return TransactionState.Failed;
  }

  // Give approval to the contract to transfer tokens
  const tokenInApproval = await getTokenTransferApproval(
    CurrentConfig.tokens.token0
  );
  const tokenOutApproval = await getTokenTransferApproval(
    CurrentConfig.tokens.token1
  );

  // Fail if transfer approvals do not go through
  if (
    tokenInApproval !== TransactionState.Sent ||
    tokenOutApproval !== TransactionState.Sent
  ) {
    return TransactionState.Failed;
  }

  const positionToMint = await constructPosition(
    CurrencyAmount.fromRawAmount(
      CurrentConfig.tokens.token0,
      fromReadableAmount(
        CurrentConfig.tokens.token0Amount,
        CurrentConfig.tokens.token0.decimals
      )
    ),
    CurrencyAmount.fromRawAmount(
      CurrentConfig.tokens.token1,
      fromReadableAmount(
        CurrentConfig.tokens.token1Amount,
        CurrentConfig.tokens.token1.decimals
      )
    )
  );

  const mintOptions: MintOptions = {
    recipient: address,
    deadline: Math.floor(Date.now() / 1000) + 60 * 20,
    slippageTolerance: new Percent(50, 10_000),
  };

  // get calldata for minting a position
  const { calldata, value } = NonfungiblePositionManager.addCallParameters(
    positionToMint,
    mintOptions
  );

  // build transaction
  const transaction = {
    data: calldata,
    to: NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS,
    value: value,
    from: address,
    maxFeePerGas: MAX_FEE_PER_GAS,
    maxPriorityFeePerGas: MAX_PRIORITY_FEE_PER_GAS,
  };

  // send transactions via our own method
  return sendTransaction(transaction);
}

import JSBI from "jsbi";

export function fromReadableAmount(amount: number, decimals: number): JSBI {
  const extraDigits = Math.pow(10, countDecimals(amount));
  const adjustedAmount = amount * extraDigits;
  return JSBI.divide(
    JSBI.multiply(
      JSBI.BigInt(adjustedAmount),
      JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(decimals))
    ),
    JSBI.BigInt(extraDigits)
  );
}

export function toReadableAmount(rawAmount: number, decimals: number): string {
  return JSBI.divide(
    JSBI.BigInt(rawAmount),
    JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(decimals))
  ).toString();
}

function countDecimals(x: number) {
  if (Math.floor(x) === x) {
    return 0;
  }
  return x.toString().split(".")[1].length || 0;
}
