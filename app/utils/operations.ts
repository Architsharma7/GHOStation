import { Pool, InterestRate } from "@aave/contract-helpers";
import { ethers } from "ethers";
import { EthereumTransactionTypeExtended } from "@aave/contract-helpers";
import { BigNumber } from "ethers";
import { prepareSendTransaction } from "@wagmi/core";
import { createWalletClient, custom, publicActions, http } from "viem";
import { sendTransaction } from "@wagmi/core";
import { ABI } from "@/constants/GHOTokenABI";
import { parseUnits, parseEther } from "ethers/lib/utils";
import { getPublicClient, getWalletClient } from "wagmi/actions";

const provider = new ethers.providers.JsonRpcProvider(
  //    process.env.NEXT_PUBLIC_RPC_URL
  "https://sepolia.infura.io/v3/ba8a3893f5f34779b1ea295f176a73c6"
);

// declare var window: any
// const provider = new ethers.providers.Web3Provider(
//     window && (window as any)?.ethereum
// );

const pool = new Pool(provider, {
  POOL: "0x69529987FA4A075D0C00B0128fa848dc9ebbE9CE",
  WETH_GATEWAY: "0x387d311e47e80b498169e6fb51d3193167d89F7D",
});

/*
- @param `user` The ethereum address that will receive the borrowed amount 
- @param `reserve` The ethereum address of the reserve asset 
- @param `amount` The amount to be borrowed, in human readable units (e.g. 2.5 ETH)
- @param `interestRateMode`//Whether the borrow will incur a stable (InterestRate.Stable) or variable (InterestRate.Variable) interest rate
- @param @optional `debtTokenAddress` The ethereum address of the debt token of the asset you want to borrow. Only needed if the reserve is ETH mock address 
- @param @optional `onBehalfOf` The ethereum address for which user is borrowing. It will default to the user address 
*/
// 2 options for `debtTokenAddress`: variable: 0x67ae46EF043F7A4508BD1d6B94DB6c33F0915844
// stable: 0xdCA691FB9609aB814E59c62d70783da1c056A9b6 depending on the interestRateMode

const supplyCollateral = async (
  user: `0x${string}` | undefined,
  reserve: string,
  amount: string,
  onBehalfOf?: string
) => {
  const txs: EthereumTransactionTypeExtended[] = await pool.supply({
    user: user || "",
    reserve,
    amount,
    onBehalfOf,
  });
  console.log(txs);
};

const borrowGHO = async (
  user: `0x${string}` | undefined,
  amount: string,
  interestRateMode: InterestRate,
//   debtTokenAddress: string,
//   onBehalfOf?: string,
//   referralCode?: string
) => {
  try {
    const txs: EthereumTransactionTypeExtended[] = await pool.borrow({
      user: user || "",
      reserve: "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60",
      amount: amount,
      interestRateMode: interestRateMode,
    //   debtTokenAddress: debtTokenAddress,
    //   onBehalfOf: onBehalfOf,
    //   referralCode,
    });
    console.log(txs);
    const extendedTxData = await txs[0].tx();
    console.log(extendedTxData);
    const publicClient = getPublicClient();
    const walletClient = await getWalletClient();
    console.log(walletClient);
    if (!walletClient) {
      console.log("no wallet client");
    }
    const { ...txData } = await extendedTxData;
    console.log(txData.to, txData.from, txData.value, txData.data, txData.value);

    // const req = await publicClient.prepareTransactionRequest({
    //   //@ts-ignore
    //   to: txData.to,
    //   //@ts-ignore
    //   account: txData.from,
    //   value: txData.value ? BigInt(txData.value) : undefined,
    //   //@ts-ignore
    //   data: txData.data,
    //   gas: txData.gasLimit ? BigInt(txData.gasLimit.toString()) : undefined,
    //   gasPrice: txData.gasPrice
    //     ? BigInt(txData.gasPrice.toString())
    //     : undefined,
    // });
    const request = await walletClient?.prepareTransactionRequest({
      //@ts-ignore
      to: txData.to,
      //@ts-ignore
      account: txData.from,
      value: txData.value ? BigInt(txData.value) : undefined,
      //@ts-ignore
      data: txData.data,
    //   gas: txData.gasLimit ? BigInt(txData.gasLimit.toString()) : undefined,
    //   gasPrice: txData.gasPrice
    //     ? BigInt(txData.gasPrice.toString())
    //     : undefined,
    });
    console.log(request);
    if (request) {
      // const signature = await walletClient?.signTransaction(request);
      // const hash = await walletClient?.sendRawTransaction(signature);
      // console.log(hash);
      const hash = await walletClient?.sendTransaction(request);
      console.log(hash);
    } else {
      console.log("no request");
    }
  } catch (error) {
    console.log(error);
  }
};

const repayGHO = async (
  user: `0x${string}` | undefined,
  amount: string,
  interestRateMode: InterestRate,
  onBehalfOf?: string
) => {
  const txs: EthereumTransactionTypeExtended[] = await pool.repay({
    user: user || "",
    reserve: "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60",
    amount: amount,
    interestRateMode: interestRateMode,
    onBehalfOf: onBehalfOf,
  });
  console.log(txs);
  if (txs.length === 1) {
    const extendedTxData = await txs[0].tx();
    const { from, ...txData } = extendedTxData;
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner(from);
    // const signer = useWalletClient();
    const client = createWalletClient({
      chain: sepolia,
      transport: custom(window.ethereum),
    });
    const txResponse = await signer.sendTransaction({
      ...txData,
      value: txData.value ? BigNumber.from(txData.value) : undefined,
    });
    console.log(txResponse);
    return txResponse;
  } else {
    erc20ApprovalGHO(user, amount, interestRateMode, onBehalfOf);
    const extendedTxData = await txs[1].tx();
    const { from, ...txData } = extendedTxData;
    const signer = provider.getSigner(from);
    const txResponse = await signer.sendTransaction({
      ...txData,
      value: txData.value ? BigNumber.from(txData.value) : undefined,
    });
    console.log(txResponse);
    return txResponse;
  }
};

const erc20ApprovalGHO = async (
  user: `0x${string}` | undefined,
  amount: string,
  interestRateMode: InterestRate,
  onBehalfOf?: string
) => {
  try {
    const txs: EthereumTransactionTypeExtended[] = await pool.repay({
      user: user || "",
      reserve: "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60",
      amount: amount,
      interestRateMode: interestRateMode,
      onBehalfOf: onBehalfOf,
    });
    console.log(txs);
    const extendedTxData = await txs[0].tx();
    const { from, ...txData } = extendedTxData;
    // await provider.send("eth_requestAccounts", []);
    // const signer = provider.getSigner(from);
    const signer = useWalletClient();
    const txResponse = await signer.data?.sendTransaction({
      ...txData,
      value: txData.value ? BigNumber.from(txData.value) : undefined,
    });
    console.log(txResponse);
    return txResponse;
  } catch (error) {
    console.log(error);
  }
};

export { borrowGHO, repayGHO, supplyCollateral };
