import { getAccount, getPublicClient, getWalletClient } from "wagmi/actions";
import { getContract, parseEther } from "viem";
import {
  INSURANCE_VAULT_ABI,
  INSURANCE_VAULT_ADDRESS,
} from "@/constants/InsuranceVault";
import { BigNumber } from "ethers";

export const raiseDisputeForClaims = async (claimId: number) => {
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
    account,
    address: INSURANCE_VAULT_ADDRESS,
    abi: INSURANCE_VAULT_ABI,
    functionName: "raiseDispute",
    args: [BigInt(claimId)],
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

export const getCompanyInsuranceData = async (address: `0x${string}`) => {
  const { address: account } = getAccount();
  const publicClient = getPublicClient();

  const INSURANCE_VAULT_CONTRACT = getContract({
    address: INSURANCE_VAULT_ADDRESS,
    abi: INSURANCE_VAULT_ABI,
  });

  const data = await publicClient.readContract({
    account,
    address: INSURANCE_VAULT_ADDRESS,
    abi: INSURANCE_VAULT_ABI,
    functionName: "_insuranceData",
    args: [address],
  });

  console.log(data);
  return data;
};

export const getClaimData = async (claimId: number) => {
  const { address: account } = getAccount();
  const publicClient = getPublicClient();

  const INSURANCE_VAULT_CONTRACT = getContract({
    address: INSURANCE_VAULT_ADDRESS,
    abi: INSURANCE_VAULT_ABI,
  });

  const data = await publicClient.readContract({
    account,
    address: INSURANCE_VAULT_ADDRESS,
    abi: INSURANCE_VAULT_ABI,
    functionName: "_claimProposals",
    args: [BigInt(claimId)],
  });

  console.log(data);
  return data;
};
