import {
  getAccount,
  getPublicClient,
  getWalletClient,
  getNetwork,
} from "wagmi/actions";
import { getContract, parseEther } from "viem";
import { GHO_ADDRESS, ABI as GHO_ABI } from "@/constants/GHOTokenABI";

export const approveGHO = async (spender: `0x${string}`, amount: number) => {
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

  console.log(publicClient.chain);
  console.log(walletClient?.chain);

  const GHO_CONTRACT = getContract({
    address: GHO_ADDRESS,
    abi: GHO_ABI,
  });

  const stakingAmount = parseEther(amount.toString());

  const data = await publicClient.simulateContract({
    account,
    address: GHO_ADDRESS,
    abi: GHO_ABI,
    functionName: "approve",
    args: [spender, stakingAmount],
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
