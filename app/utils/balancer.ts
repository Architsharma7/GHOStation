// balancer code to interact via an SDK
// Deposit assets into the pool and stake to earn extra interest
// https://docs.balancer.fi/sdk/technical-reference/liquidity-provisioning.html

import { BalancerSDK, BalancerSdkConfig, Network } from "@balancer-labs/sdk";

const config: BalancerSdkConfig = {
  network: Network.MAINNET,
  rpcUrl: `https://mainnet.infura.io/v3/${process.env.INFURA}`,
};

const balancer = new BalancerSDK(config);
const poolId =
  "0x8353157092ed8be69a9df8f95af097bbf33cb2af0000000000000000000005d9";

async function joinbalancerPool() {
  const pool = await balancer.pools.find(poolId);
  if (!pool) throw new Error("Pool not found");

  const params = {
    joiner: "0x0000000",
    tokensIn: ["0x0000000", "0x0000000"],
    amountsIn: [""], // in EVM amounts
    slippage: "50", // in Bps
  };

  const { to, functionName, attributes, data } = pool.buildJoin(
    params.joiner,
    params.tokensIn,
    params.amountsIn,
    params.slippage
  );

  // send the tx
}

async function exitbalancerPool() {
  const pool = await balancer.pools.find(poolId);
  if (!pool) throw new Error("Pool not found");

  const params = {
    exiter: "0x0000000",
    tokensOut: ["0x0000000", "0x0000000"],
    amountsOut: [""], // in EVM amounts
    slippage: "50", // in Bps
  };

  const { to, functionName, attributes, data } = pool.buildExitExactTokensOut(
    params.exiter,
    params.tokensOut,
    params.amountsOut,
    params.slippage
  );

  // send the tx
}
