import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useAccount } from "wagmi";
import { useBalance } from "wagmi";
import { Card } from "./ui/card";
import { ArrowLeft, ChevronLeft, ChevronRight, FuelIcon } from "lucide-react";
import Loader from "./ui/loader";
import CustomConnectButton from "./custom-connect-btn";

export default function TokenPairSupplyModal() {
  const { isConnected, address } = useAccount();
  const balance = useBalance({
    address,
  });

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"custom"}>Supply</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supply</DialogTitle>
          <DialogDescription>
            Supply your GHO tokens to the GHO-Station platform.
          </DialogDescription>
        </DialogHeader>
        <div className=" space-y-5">
          <div className="flex flex-col items-start space-y-2">
            <Label htmlFor="terms">Amount</Label>
            <Input placeholder="e.g: 18" />
            <div className="text-sm self-end">
              Wallet Balance: {balance.data?.formatted} SEth
            </div>
          </div>

          <Card className=" bg-[#bc9dff]/20 p-3 space-y-4">
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
      </DialogContent>
    </Dialog>
  );
}
