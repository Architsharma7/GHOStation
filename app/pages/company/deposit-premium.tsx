import React from "react";
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

export default function DepositPremium() {
  const [inputValue, setInputValue] = React.useState("");
  const { address, isConnected } = useAccount();
  const balance = useBalance({
    address,
  });
  return (
    <Card className="border-0 border-neutral-300 shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white min-h-96 p-6 px-8 rounded-xl space-y-3 ">
      <CardHeader className=" p-0">
        <CardTitle>Deposit Premium</CardTitle>
        <CardDescription>
          Deposit Insurance Premium to the GHO-Station.
        </CardDescription>
      </CardHeader>
      <div className=" space-y-6">
        <div className="flex flex-col items-start space-y-2 mt-6">
          <Label htmlFor="terms">Amount</Label>
          <Input
            type="number"
            placeholder="e.g: 18"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="text-sm self-end">
            Wallet Balance: {balance.data?.formatted} {balance.data?.symbol}
          </div>
        </div>

        <Card className=" bg-[#bc9dff]/20 p-3 space-y-4">
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
          <Button variant={"custom"} className=" w-full ">
            Initiate Transaction <Loader />
          </Button>
        ) : (
          <CustomConnectButton className="w-full rounded-lg" />
        )}
      </div>
    </Card>
  );
}
