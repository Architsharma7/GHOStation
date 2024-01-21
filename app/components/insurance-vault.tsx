import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { Coins, Wallet2Icon } from "lucide-react";
import SupplyModal from "./token-pair-supply-modal";
import BorrowModal from "./borrow-modal";
import { useAccount, useBalance } from "wagmi";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import VaultStats from "./vault-stats";
import { depositFunds, withdrawFunds } from "@/utils/InsurancevaultCalls";
import {
  INSURANCE_VAULT_ABI,
  INSURANCE_VAULT_ADDRESS,
} from "@/constants/InsuranceVault";
import { getAccount, getPublicClient, getWalletClient } from "wagmi/actions";
import { formatEther, parseEther } from "viem";

export default function InsuranceVault() {
  const { address, isConnected } = useAccount();
  const [depositAmount, setDepositAmount] = useState<number>(0);
  const [sharesOut, setSharesOut] = useState<number>(0);
  const [shareIn, setshareIn] = useState<number>(0);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const balance = useBalance({
    address,
    token: "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60",
  });

  useEffect(() => {
    if (!TVL || !totalShares || !shareValue) {
      getTVL();
      getTotalshares();
      // getShareValue(10);
    }
  }, []);

  const [TVL, setTVL] = useState<number>(0);
  const [totalShares, setTotalShares] = useState<number>(0);
  const [shareValue, setShareValue] = useState<number>(0);

  const getTVL = async () => {
    const { address: account } = getAccount();
    const publicClient = getPublicClient();
    if (account === undefined) {
      return;
    }

    const data = await publicClient.readContract({
      account,
      address: INSURANCE_VAULT_ADDRESS,
      abi: INSURANCE_VAULT_ABI,
      functionName: "totalAssets",
    });

    console.log(formatEther(data));
    setTVL(Number(formatEther(data)));
  };

  const getTotalshares = async () => {
    const { address: account } = getAccount();
    const publicClient = getPublicClient();
    if (account === undefined) {
      return;
    }

    const data = await publicClient.readContract({
      account,
      address: INSURANCE_VAULT_ADDRESS,
      abi: INSURANCE_VAULT_ABI,
      functionName: "balanceOf",
      args: [account],
    });
    console.log(data);
    setTotalShares(Number(formatEther(data)));
    getShareValue(data);
    return data;
  };

  const getShareValue = async (share: bigint) => {
    const { address: account } = getAccount();
    const publicClient = getPublicClient();
    if (account === undefined) {
      return;
    }
    const data = await publicClient.readContract({
      account,
      address: INSURANCE_VAULT_ADDRESS,
      abi: INSURANCE_VAULT_ABI,
      functionName: "previewRedeem",
      args: [share],
    });
    console.log(data);
    setShareValue(Number(formatEther(data)));
  };

  useEffect(() => {
    if (depositAmount) {
      getSharesOut();
    }
  }, [depositAmount]);

  useEffect(() => {
    if (withdrawAmount) {
      getSharesIn();
    }
  }, [withdrawAmount]);

  const getSharesOut = async () => {
    const { address: account } = getAccount();
    const publicClient = getPublicClient();
    if (account === undefined) {
      return;
    }
    const data = await publicClient.readContract({
      account,
      address: INSURANCE_VAULT_ADDRESS,
      abi: INSURANCE_VAULT_ABI,
      functionName: "previewDeposit",
      args: [parseEther(depositAmount.toString())],
    });
    console.log(data);
    setSharesOut(Number(formatEther(data)));
  };

  const getSharesIn = async () => {
    const { address: account } = getAccount();
    const publicClient = getPublicClient();
    if (account === undefined) {
      return;
    }
    const data = await publicClient.readContract({
      account,
      address: INSURANCE_VAULT_ADDRESS,
      abi: INSURANCE_VAULT_ABI,
      functionName: "previewRedeem",
      args: [parseEther(withdrawAmount.toString())],
    });
    console.log(data);
    setshareIn(Number(formatEther(data)));
  };

  return (
    <div className=" w-full h-full">
      {/* <Card className=" w-full -full gradien bg-white rounded-xl  shadow-[0_3px_10px_rgb(0,0,0,0.2)] border-0 p-5  "> */}
      <Card className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] gradient backdrop-blur-xl border-0 min-h-96 p-6 px-8 rounded-xl space-y-5 ">
        <div className=" flex items-center justify-between pb-5 border-b border-neutral-300">
          <div className=" flex items-center gap-3">
            <Coins className=" h-6 w-6" />
            <div>
              <div className=" text-sm">Number of Shares</div>
              <div className=" text-base font-semibold">
                {totalShares && totalShares.toFixed(3)}
              </div>
            </div>
          </div>
          <div>
            <div className=" text-sm">Share Value</div>
            <div className=" text-base font-semibold">
              {shareValue && shareValue.toFixed(3)} GHO
            </div>
          </div>
        </div>
        <div className=" flex items-start justify-start gap-3 flex-col mt-4">
          <div className="text-xl font-semibold">GHO Insurance Vault</div>
          <p className=" text-sm">
            GHO token is being used to back the biggest protocols in the GHO
            ecosystem
          </p>
          <div className=" flex font-semibold font-sans items-center justify-between w-full">
            <div>APY 18%</div>
            <div>TVL : {TVL && TVL} GHO</div>
          </div>
        </div>

        <Card className=" p-4 mt-4 border-0 text-sm flex items-end justify-between ">
          Please keep note that the funds will be locked for 30 days.
        </Card>
        <Separator className="" />
        <div className=" flex items-end justify-between pb-2 ">
          <div className=" space-y-1 w-8/12">
            <div>Deposit</div>
            <Input
              onChange={(e) => setDepositAmount(Number(e.target.value))}
              placeholder="e.g: 18"
            />
          </div>
          <Button
            onClick={() => depositFunds(depositAmount)}
            className=" w-28"
            variant={"custom"}
          >
            Deposit
          </Button>
        </div>
        <div className="text-sm self-end">
          Available: {balance.data?.formatted} {balance.data?.symbol}
        </div>
        <div className="text-sm self-end">
          Minted Shares: {sharesOut && sharesOut.toFixed(3)}
        </div>
        <Separator className=" mb-4 mt-6" />
        <div className=" flex items-end justify-between ">
          <div className=" space-y-1 w-8/12">
            <div>Withdraw</div>
            <Input
              onChange={(e) => setWithdrawAmount(Number(e.target.value))}
              placeholder="e.g: 10"
            />
          </div>
          <Button
            onClick={() => withdrawFunds(withdrawAmount)}
            className=" w-28"
            variant={"custom"}
          >
            Withdraw
          </Button>
        </div>
        <div className="text-sm self-end">
          Burned Shares: {shareIn && shareIn.toFixed(3)}
        </div>
      </Card>
    </div>
  );
}
