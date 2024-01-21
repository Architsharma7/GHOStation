import React, { useState } from "react";
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

export default function InsuranceVault() {
  const { address, isConnected } = useAccount();
  const [depositAmount, setDepositAmount] = useState<number>(0);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const balance = useBalance({
    address,
    token: "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60",
  });
  return (
    <div className=" w-full h-full">
      {/* <Card className=" w-full -full gradien bg-white rounded-xl  shadow-[0_3px_10px_rgb(0,0,0,0.2)] border-0 p-5  "> */}
      <Card className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] gradient backdrop-blur-xl border-0 min-h-96 p-6 px-8 rounded-xl space-y-5 ">
        <div className=" flex items-center justify-between pb-5 border-b border-neutral-300">
          <div className=" flex items-center gap-3">
            <Coins className=" h-6 w-6" />
            <div>
              <div className=" text-sm">Number of Shares</div>
              <div className=" text-base font-semibold">10</div>
            </div>
          </div>
          <div>
            <div className=" text-sm">Share Value</div>
            <div className=" text-base font-semibold">29 GHO</div>
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
            <div>TVL : 1000 GHO</div>
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
        <Separator className=" mb-4 mt-6" />
        <div className=" flex items-end justify-between ">
          <div className=" space-y-1 w-8/12">
            <div>Withdraw</div>
            <Input onChange={(e) => setWithdrawAmount(Number(e.target.value))} placeholder="e.g: 10" />
          </div>
          <Button onClick={() => withdrawFunds(withdrawAmount)} className=" w-28" variant={"custom"}>
            Withdraw
          </Button>
        </div>
      </Card>
    </div>
  );
}
