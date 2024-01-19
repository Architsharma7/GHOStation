import React from "react";
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
  });
  return (
    <div>
      <Card className=" gradien bg-white rounded-xl  shadow-[0_3px_10px_rgb(0,0,0,0.2)] border-0 p-5  ">
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
          <div className="text-sm">
            Token Distribution across different DEX's
          </div>
        </div>
        <Separator className=" my-4" />
        <div className=" flex items-end justify-between ">
          <div className=" space-y-1 w-8/12">
            <div>Deposit</div>
            <Input placeholder="e.g: 18" />
          </div>
          <Button className=" w-28" variant={"custom"}>
            Deposit
          </Button>
        </div>
        <Separator className=" mb-4 mt-6" />
        <div className=" flex items-end justify-between ">
          <div className=" space-y-1 w-8/12">
            <div>Withdraw</div>
            <Input placeholder="e.g: 10" />
          </div>
          <Button className=" w-28" variant={"custom"}>
            Withdraw
          </Button>
        </div>
      </Card>
    </div>
  );
}