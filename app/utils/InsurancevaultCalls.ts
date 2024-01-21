import {
  INSURANCE_VAULT_ABI,
  INSURANCE_VAULT_ADDRESS,
} from "@/constants/InsuranceVault";
import { getAccount, getPublicClient, getWalletClient } from "wagmi/actions";
import { getContract, parseEther } from "viem";
import { approveGHO } from "./GHOToken";

export const depositFunds = async (amount: number) => {
  const { address: account } = getAccount();
  const publicClient = getPublicClient();
  const walletClient = await getWalletClient();
  if (!account) {
    return;
  }

  const INSURANCE_VAULT_CONTRACT = getContract({
    address: INSURANCE_VAULT_ADDRESS,
    abi: INSURANCE_VAULT_ABI,
  });

  await approveGHO(INSURANCE_VAULT_ADDRESS, amount);

  const data = await publicClient.simulateContract({
    account: account,
    address: INSURANCE_VAULT_ADDRESS,
    abi: INSURANCE_VAULT_ABI,
    functionName: "deposit",
    args: [parseEther(amount.toString()), account],
  });
  if (!walletClient) {
    return;
  }
  const tx = await walletClient.writeContract(data.request);
  console.log("Transaction Sent");
  const transaction = await publicClient.waitForTransactionReceipt({
    hash: tx,
  });
  console.log(transaction);
  console.log(data.result);
  return {
    transaction,
    data,
  };
};

export const withdrawFunds = async (amount: number) => {
  const { address: account } = getAccount();
  const publicClient = getPublicClient();
  const walletClient = await getWalletClient();
  if (!account) {
    return;
  }

  const INSURANCE_VAULT_CONTRACT = getContract({
    address: INSURANCE_VAULT_ADDRESS,
    abi: INSURANCE_VAULT_ABI,
  });

  const data = await publicClient.simulateContract({
    account: account,
    address: INSURANCE_VAULT_ADDRESS,
    abi: INSURANCE_VAULT_ABI,
    functionName: "withdraw",
    args: [parseEther(amount.toString()), account, account],
  });
  if (!walletClient) {
    return;
  }
  const tx = await walletClient.writeContract(data.request);
  console.log("Transaction Sent");
  const transaction = await publicClient.waitForTransactionReceipt({
    hash: tx,
  });
  console.log(transaction);
  console.log(data.result);
  return {
    transaction,
    data,
  };
};

export const registerInsurance = async (
  insuredAmount: number,
  companyCID: string,
  companyAddr: `0x${string}`
) => {
  const { address: account } = getAccount();
  const publicClient = getPublicClient();
  const walletClient = await getWalletClient();
  if (!account) {
    return;
  }

  const INSURANCE_VAULT_CONTRACT = getContract({
    address: INSURANCE_VAULT_ADDRESS,
    abi: INSURANCE_VAULT_ABI,
  });

  await approveGHO(INSURANCE_VAULT_ADDRESS, insuredAmount);

  const data = await publicClient.simulateContract({
    account: account,
    address: INSURANCE_VAULT_ADDRESS,
    abi: INSURANCE_VAULT_ABI,
    functionName: "registerInsurance",
    args: [companyAddr, companyCID, parseEther(insuredAmount.toString())],
  });
  if (!walletClient) {
    return;
  }
  const tx = await walletClient.writeContract(data.request);
  console.log("Transaction Sent");
  const transaction = await publicClient.waitForTransactionReceipt({
    hash: tx,
  });
  console.log(transaction);
  console.log(data.result);
  return {
    transaction,
    data,
  };
};


export const depositPremium = async (premiumAmount: number) => {
  const { address: account } = getAccount();
  const publicClient = getPublicClient();
  const walletClient = await getWalletClient();
  if (!account) {
    return;
  }

  const INSURANCE_VAULT_CONTRACT = getContract({
    address: INSURANCE_VAULT_ADDRESS,
    abi: INSURANCE_VAULT_ABI,
  });

  await approveGHO(INSURANCE_VAULT_ADDRESS, premiumAmount);

  const data = await publicClient.simulateContract({
    account: account,
    address: INSURANCE_VAULT_ADDRESS,
    abi: INSURANCE_VAULT_ABI,
    functionName: "depositPremium",
  });
  if (!walletClient) {
    return;
  }
  const tx = await walletClient.writeContract(data.request);
  console.log("Transaction Sent");
  const transaction = await publicClient.waitForTransactionReceipt({
    hash: tx,
  });
  console.log(transaction);
  console.log(data.result);
  return {
    transaction,
    data,
  };
};


export const requestClaim = async (claimAmount: number, proofCID: string) => {
  const { address: account } = getAccount();
  const publicClient = getPublicClient();
  const walletClient = await getWalletClient();
  if (!account) {
    return;
  }

  const INSURANCE_VAULT_CONTRACT = getContract({
    address: INSURANCE_VAULT_ADDRESS,
    abi: INSURANCE_VAULT_ABI,
  });

  const data = await publicClient.simulateContract({
    account: account,
    address: INSURANCE_VAULT_ADDRESS,
    abi: INSURANCE_VAULT_ABI,
    functionName: "requestClaim",
    args: [proofCID, parseEther(claimAmount.toString())],
  });
  if (!walletClient) {
    return;
  }
  const tx = await walletClient.writeContract(data.request);
  console.log("Transaction Sent");
  const transaction = await publicClient.waitForTransactionReceipt({
    hash: tx,
  });
  console.log(transaction);
  console.log(data.result);
  return {
    transaction,
    data,
  };
};

export const validClaim = async (claimId: string) => {
  const { address: account } = getAccount();
  const publicClient = getPublicClient();
  const walletClient = await getWalletClient();
  if (!account) {
    return;
  }
  const data = await publicClient.simulateContract({
    account: account,
    address: INSURANCE_VAULT_ADDRESS,
    abi: INSURANCE_VAULT_ABI,
    functionName: "requestClaim",
    args: [claimId, BigInt(1)],
  });
  if (!walletClient) {
    return;
  }
  const tx = await walletClient.writeContract(data.request);
  console.log("Transaction Sent");
  const transaction = await publicClient.waitForTransactionReceipt({
    hash: tx,
  });
  console.log(transaction);
  console.log(data.result);
  return {
    transaction,
    data,
  };
};

export const invalidClaim = async (claimId: string) => {
  const { address: account } = getAccount();
  const publicClient = getPublicClient();
  const walletClient = await getWalletClient();
  if (!account) {
    return;
  }
  const data = await publicClient.simulateContract({
    account: account,
    address: INSURANCE_VAULT_ADDRESS,
    abi: INSURANCE_VAULT_ABI,
    functionName: "requestClaim",
    args: [claimId, BigInt(2)],
  });
  if (!walletClient) {
    return;
  }
  const tx = await walletClient.writeContract(data.request);
  console.log("Transaction Sent");
  const transaction = await publicClient.waitForTransactionReceipt({
    hash: tx,
  });
  console.log(transaction);
  console.log(data.result);
  return {
    transaction,
    data,
  };
};