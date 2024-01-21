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

  try {
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
  } catch (error) {
    console.log(error);
  }
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

export const getAllClaims = async (): any[] | undefined => {
  // fetch the total Number of claims
  // Run a for loop , to get data of each Claim and then prepare the data in the needed format

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
    functionName: "totalClaimProposals",
  });

  console.log(data);
  const totalClaimProposals = Number(data);

  try {
    const promises = [];

    for (let id = 0; id < totalClaimProposals; id++) {
      const claimPromise = getClaimData(id);
      promises.push(claimPromise);
    }

    const claims = await Promise.all(promises);
    console.log(claims);
    return claims;
  } catch (error) {
    console.log(error);
  }
};

export const getAllClaimProposals = async (): any[] | undefined => {
  try {
    // filtered by Status , only show PENDING claims
    const allClaimData = await getAllClaims();

    const pendingClaims = allClaimData.filter((claim) => claim._status === 0);
    console.log(pendingClaims);
    return pendingClaims;
  } catch (error) {
    console.log(error);
  }
};
