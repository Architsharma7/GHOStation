import React, { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { ChevronLeft, FuelIcon } from "lucide-react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import CustomConnectButton from "../../components/custom-connect-btn";
import Loader from "../../components/ui/loader";
import { useAccount, useBalance } from "wagmi";
import { Button } from "../../components/ui/button";
import { depositPremium } from "@/utils/InsurancevaultCalls";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function DepositPremium() {
  const [inputValue, setInputValue] = useState<Number>();
  const { address, isConnected } = useAccount();
  const balance = useBalance({
    address,
    token: "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60",
  });
  return (
    <Card className="border-0 h-full border-neutral-300 shadow-[0_3px_10px_rgb(0,0,0,0.2)] gradient min-h-96 p-6 px-8 rounded-xl space-y-3 ">
      <CardHeader className=" p-0">
        <CardTitle>Deposit Premium</CardTitle>
        <CardDescription>
          Deposit Insurance Premium to the GHO-Station.
        </CardDescription>
      </CardHeader>
      <div className=" space-y-6">
        <div className="flex bg-white p-4 rounded-lg shadow-lg flex-col items-start space-y-5 mt-6">
          <div className="flex items-start w-full justify-between">
            <div>
              <div>Your next premium is due on :</div>
              <div className="mt-1 text-xs rounded-md w-full">
                Please make sure you make the payment before due date
              </div>
            </div>
            <div>30/01/2024</div>
          </div>
          <Separator />
          <div className="flex items-center w-full justify-between">
            <div>Premium amount</div>
            <div>30 GHO </div>
          </div>
          {/* <Input
            type="number"
            placeholder="e.g: 18"
            onChange={(e) => setInputValue(Number(e.target.value))}
          /> */}

          {/* <div className="text-sm self-end">
            Wallet Balance: {balance.data?.formatted} {balance.data?.symbol}
          </div> */}
        </div>

        <Card className=" bg-[#bc9dff]0 bg-white p-3 space-y-4">
          {/*<div className=" flex items-center justify-between ">
            <div>Supply</div>
             <div className=" flex items-center ">
              <ChevronRight />
              <ChevronLeft className=" h-4 w-4" />
              <div>0.01 %</div>
            </div>
          </div>
          */}
          <div className="  flex items-center justify-between ">
            <div>Estimated Gas</div>
            <div className="text-sm flex items-center gap-2 ">
              <FuelIcon className=" h-4 w-4" />
              <div>0.033 ETH</div>
            </div>
          </div>
        </Card>
      </div>
      <div className="w-full">
        {isConnected ? (
          <Button
            onClick={() => depositPremium(inputValue as number)}
            variant={"custom"}
            className=" w-full "
          >
            Initiate Transaction <Loader />
          </Button>
        ) : (
          <CustomConnectButton className="w-full rounded-lg" />
        )}
      </div>
    </Card>
  );
}
