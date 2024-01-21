import {
  INSURANCE_VAULT_ABI,
  INSURANCE_VAULT_ADDRESS,
} from "@/constants/InsuranceVault";
import {
  getAccount,
  getPublicClient,
  getWalletClient,
  getNetwork,
} from "wagmi/actions";
import { getContract, parseEther } from "viem";
import { approveGHO } from "./GHOToken";
import { getFileContent } from "./ipfsstorage";

export const depositFunds = async (amount: number) => {
  const { address: account } = getAccount();
  const publicClient = getPublicClient();
  const network = getNetwork();
  if (!network) {
    return;
  }
  const walletClient = await getWalletClient({ chainId: network?.chain.id });
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
  const network = getNetwork();
  if (!network) {
    return;
  }
  const walletClient = await getWalletClient({ chainId: network?.chain.id });
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
  const network = getNetwork();
  if (!network) {
    return;
  }
  const walletClient = await getWalletClient({ chainId: network?.chain.id });
  if (!account) {
    return;
  }

  // calculate 1.5% of the total Insured amount
  const premiumAmount = insuredAmount * 0.015;

  const INSURANCE_VAULT_CONTRACT = getContract({
    address: INSURANCE_VAULT_ADDRESS,
    abi: INSURANCE_VAULT_ABI,
  });

  await approveGHO(INSURANCE_VAULT_ADDRESS, premiumAmount);

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
  const network = getNetwork();
  if (!network) {
    return;
  }
  const walletClient = await getWalletClient({ chainId: network?.chain.id });
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
  const network = getNetwork();
  if (!network) {
    return;
  }
  const walletClient = await getWalletClient({ chainId: network?.chain.id });
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

export const validateClaim = async (claimId: string) => {
  const { address: account } = getAccount();
  const publicClient = getPublicClient();
  const network = getNetwork();
  if (!network) {
    return;
  }
  const walletClient = await getWalletClient({ chainId: network?.chain.id });
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

export const invalidateClaim = async (claimId: string) => {
  const { address: account } = getAccount();
  const publicClient = getPublicClient();
  const network = getNetwork();
  if (!network) {
    return;
  }
  const walletClient = await getWalletClient({ chainId: network?.chain.id });
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

export const raiseDisputeForClaims = async (claimId: number) => {
  const { address: account } = getAccount();
  const publicClient = getPublicClient();
  const network = getNetwork();
  if (!network) {
    return;
  }
  const walletClient = await getWalletClient({ chainId: network?.chain.id });
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

  // const fileData = await getFileContent(data[3]);
  // console.log(fileData);
  data.push(claimId);
  console.log(data);
  return data;
};

export const getAllClaims = async (): Promise<any[] | undefined> => {
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

export const getAllClaimProposals = async (): Promise<any[] | undefined> => {
  try {
    // filtered by Status , only show PENDING claims
    const allClaimData = await getAllClaims();

    const pendingClaims = allClaimData?.filter((claim) => claim[5] === 0);
    console.log(pendingClaims);
    return pendingClaims;
  } catch (error) {
    console.log(error);
  }
};
