import React, {useState} from "react";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { Coins, Wallet2Icon } from "lucide-react";
import SupplyModal from "./token-pair-supply-modal";
import BorrowModal from "./borrow-modal";
import { useAccount, useBalance } from "wagmi";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import VaultStats from "./vault-stats";

export default function Vault() {
  const { address, isConnected } = useAccount();
  const balance = useBalance({
    address,
    token: "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60",
  });

  return (
    <div className=" h-full w-full">
      <Card className=" w-full gradien bg-white rounded-xl  shadow-[0_3px_10px_rgb(0,0,0,0.2)] border-0 p-5  ">
        <div className=" flex items-center justify-between">
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
        <div className=" flex items-center justify-center flex-col">
          <VaultStats />
        </div>

        <Separator className=" my-4" />
        <div className=" flex items-start justify-between gap-6">
          <div className=" flex items-end gap-3 w-full flex-col justify-between ">
            <div className=" space-y-1 w-full ">
              <div>Deposit</div>
              <Input placeholder="e.g: 18" />
            </div>
            <Button className=" w-full" variant={"custom"}>
              Deposit
            </Button>
          </div>
          <Separator orientation="vertical" className="h-24 self-center" />
          <div className=" flex items-end gap-3 w-full flex-col justify-between ">
            <div className=" space-y-1 w-full ">
              <div>Withdraw</div>
              <Input placeholder="e.g: 10" />
            </div>
            <Button className=" w-full" variant={"custom"}>
              Withdraw
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
