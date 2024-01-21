import { STAKING_ABI, STAKING_ADDRESS } from "@/constants/StakingContract";
import {
  getAccount,
  getPublicClient,
  getWalletClient,
  getNetwork,
} from "wagmi/actions";
import { getContract, parseEther } from "viem";
import { approveGHO } from "./GHOToken";

export const stakeAsVerifier = async () => {
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

  const STAKING_CONTRACT = getContract({
    address: STAKING_ADDRESS,
    abi: STAKING_ABI,
  });
  const amount = 10;
  const stakingAmount = parseEther(amount.toString());

  // Wait for the approval first and then Stake
  await approveGHO(STAKING_ADDRESS, amount);

  const data = await publicClient.simulateContract({
    account,
    address: STAKING_ADDRESS,
    abi: STAKING_ABI,
    functionName: "stake",
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

export const getVerifierStatus = async (address: `0x${string}`) => {
  const { address: account } = getAccount();
  const publicClient = getPublicClient();

  const STAKING_CONTRACT = getContract({
    address: STAKING_ADDRESS,
    abi: STAKING_ABI,
  });

  const data = await publicClient.readContract({
    account,
    address: STAKING_ADDRESS,
    abi: STAKING_ABI,
    functionName: "isVerifier",
    args: [address],
  });

  console.log(data);
  return data;
};

export const UnstakeAsVerifier = async () => {
  const { address: account } = getAccount();
  const publicClient = getPublicClient();
  const walletClient = await getWalletClient();
  if (!account) {
    return;
  }

  const STAKING_CONTRACT = getContract({
    address: STAKING_ADDRESS,
    abi: STAKING_ABI,
  });

  const data = await publicClient.simulateContract({
    account,
    address: STAKING_ADDRESS,
    abi: STAKING_ABI,
    functionName: "unstake",
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
