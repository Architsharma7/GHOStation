import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { FuelIcon } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import CustomConnectButton from "./custom-connect-btn";
import Loader from "./ui/loader";
import { useAccount, useBalance } from "wagmi";
import { Button } from "./ui/button";

export default function Borrow() {
  const [inputValue, setInputValue] = React.useState("");
  const { address, isConnected } = useAccount();
  const balance = useBalance({
    address,
  });
  return (
    <Card className="border-0 border-neutral-300 shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white min-h-96 p-6 px-8 rounded-xl space-y-3 ">
      <CardHeader className=" p-0">
        <CardTitle>Borrow</CardTitle>
        <CardDescription>Borrow GHO tokens from GHO-Station.</CardDescription>
      </CardHeader>
      <div className=" space-y-5">
        <div className="flex flex-col items-start space-y-2">
          <Label htmlFor="terms">Amount</Label>
          <Input
            type="number"
            placeholder="e.g: 18"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="text-sm self-end">Available: 34.3 max</div>
        </div>
        {inputValue && (
          <Card className=" bg-[#bc9dff]/20 p-3 space-y-4">
            <div className=" flex items-center justify-between ">
              <div>APY, borrow rate</div>
              <div className=" flex items-center ">
                <div>2.01 %</div>
              </div>
            </div>
            <div className="  flex items-center justify-between ">
              <div>Gas</div>
              <div className="text-sm flex items-center gap-2 ">
                <FuelIcon className=" h-4 w-4" />
                <div>$ 6.22 USDC</div>
              </div>
            </div>
          </Card>
        )}
      </div>
      <div className=" mt-3 w-full">
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
