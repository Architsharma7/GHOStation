// no SDK , only interaction method is via direct Contract call
// we first add liquidity to the curve pool
// then stake the LP token to earn CRV
import { CURVE_ABI } from "@/contracts/curveContract";
const CURVE_POOL_ADDRESS = "0x86152dF0a0E321Afb3B0B9C4deb813184F365ADa";
import { getAccount, getPublicClient, getWalletClient } from "wagmi/actions";
import { getContract, parseEther } from "viem";

// https://resources.curve.fi/reward-gauges/understanding-gauges/#the-dao
// https://docs.curve.fi/stableswap-exchange/stableswap-ng/pools/plainpool/?h=#remove_liquidity
async function addLiquidityCurvePool() {
  const { address: account } = getAccount();
  const publicClient = getPublicClient();
  const walletClient = await getWalletClient();
  if (!account) {
    return;
  }

  const CURVECONTRACT = getContract({
    address: CURVE_POOL_ADDRESS,
    abi: CURVE_ABI,
  });

  const amount_0 = parseEther("0.1");
  const amount_1 = parseEther("0.1");

  const data = await publicClient.simulateContract({
    account,
    address: CURVE_POOL_ADDRESS,
    abi: CURVE_ABI,
    functionName: "add_liquidity",
    args: [[amount_0, amount_1], BigInt(0), account],
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
}

async function removeLiquidityCurvePool() {
  const { address: account } = getAccount();
  const publicClient = getPublicClient();
  const walletClient = await getWalletClient();
  if (!account) {
    return;
  }

  const CURVECONTRACT = getContract({
    address: CURVE_POOL_ADDRESS,
    abi: CURVE_ABI,
  });

  const amount = BigInt(100);

  const data = await publicClient.simulateContract({
    account,
    address: CURVE_POOL_ADDRESS,
    abi: CURVE_ABI,
    functionName: "remove_liquidity",
    args: [amount, [BigInt(0), BigInt(0)], account],
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
}
