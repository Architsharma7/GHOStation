import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useAccount } from "wagmi";
import { useBalance } from "wagmi";
import { Card, CardHeader } from "./ui/card";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  FuelIcon,
  Wallet2Icon,
} from "lucide-react";
import Loader from "./ui/loader";
import { ConnectKitButton } from "connectkit";
import CustomConnectButton from "./custom-connect-btn";
import SupplyModal from "./token-pair-supply-modal";
import BorrowModal from "./borrow-modal";
import { Separator } from "./ui/separator";
import React from "react";

interface PoolProps {
  isConnected: boolean;
  inputValue: number;
  setInputValue: React.Dispatch<React.SetStateAction<number>>;
}

export default function ViewPoolDetails() {
  const [supplyInput, setSupplyInput] = React.useState<number>(0);
  const [borrowInput, setBorrowInput] = React.useState<number>(0);
  const { address, isConnected } = useAccount();

  const balance = useBalance({
    address,
  });

  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Button variant={"custom"}>View Details</Button>
        </SheetTrigger>
        <SheetContent side={"bottom"} className="  ">
          <SheetHeader className=" px-6 pt-4">
            <SheetTitle>Pool Details</SheetTitle>
            <SheetDescription>
              Supply and borrow details for the Pool token pairs.
            </SheetDescription>
            <Separator />
          </SheetHeader>

          <div className="space-y-5 px-6 py-4">
            <Card className="bg-[#bc9dff]/20 p-3 flex items-center justify-around ">
              <div className=" flex items-start gap-3">
                <Wallet2Icon className=" h-8 w-8" />
                <div className=" text-center">
                  <div className=" text-sm">Wallet Balance</div>
                  <div className=" text-base font-semibold">
                    {balance.data?.formatted} {balance.data?.symbol}
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div>Available to Supply</div>
                <div>
                  <span className=" font-sans font-semibold">93892</span>{" "}
                  <span>GHO</span>
                </div>
              </div>
              <div className="text-center">
                <div>Available to Borrow</div>
                <div>
                  <span className=" font-sans font-semibold">93892</span>{" "}
                  <span>GHO</span>
                </div>
              </div>
            </Card>
            <div className=" flex gap-6 items-center justify-between">
              {/* {!showBorrow && showSupply && ( */}
              <div className=" w-full">
                <SupplyPoolPair
                  inputValue={supplyInput}
                  setInputValue={setSupplyInput}
                  isConnected={isConnected}
                />
              </div>
              {/*  )} */}
              {/* {showBorrow && !showSupply && ( */}
              <div className=" w-full">
                <BorrowPoolPair
                  inputValue={borrowInput}
                  setInputValue={setBorrowInput}
                  isConnected={isConnected}
                />
              </div>
              {/*  )} */}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

const SupplyPoolPair = ({
  isConnected,
  inputValue,
  setInputValue,
}: PoolProps) => {
  return (
    <div className=" border p-6  rounded-lg">
      <div className="text-xl font-semibold mb-2">Supply</div>
      <Separator className="mb-4" />
      <div className=" space-y-5">
        <div className="space-y-2">
          <Label htmlFor="terms">Amount</Label>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(Number(e.target.value))}
            placeholder="e.g: 18"
          />
        </div>

        <Card className=" shadow-none g-[#bc9dff]/20 border-0 p-3 space-y-4">
          <div className=" flex items-center justify-between ">
            <div>Supply</div>
            <div className=" flex items-center ">
              {/* <ChevronRight /> */}
              <ChevronLeft className=" h-4 w-4" />
              <div>0.01 %</div>
            </div>
          </div>
          <div className="  flex items-center justify-between ">
            <div>Gas</div>
            <div className="text-sm flex items-center gap-2 ">
              <FuelIcon className=" h-4 w-4" />
              <div>4.3 USDC</div>
            </div>
          </div>
        </Card>
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
    </div>
  );
};

const BorrowPoolPair = ({
  isConnected,
  inputValue,
  setInputValue,
}: PoolProps) => {
  return (
    <div className=" border p-6 rounded-lg">
      <div className="text-xl font-semibold mb-2">Borrow</div>
      <Separator className="mb-4" />
      <div className=" space-y-5">
        <div className="space-y-2">
          <Label htmlFor="terms">Amount</Label>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(Number(e.target.value))}
            placeholder="e.g: 18"
          />
        </div>

        <Card className=" shadow-none g-[#bc9dff]/20 border-0 p-3 space-y-4">
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
    </div>
  );
};
