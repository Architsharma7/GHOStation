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

export default function ViewPoolDetails() {
  const { address, isConnected } = useAccount();
  const balance = useBalance({
    address,
  });

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"custom"}>View Details</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Pool Details</DialogTitle>
        </DialogHeader>
        <div className=" space-y-5">
          <Card className="bg-[#bc9dff]/20 p-3 space-y-6 ">
            <div className=" flex items-center gap-3">
              <Wallet2Icon className=" h-6 w-6" />
              <div>
                <div className=" text-sm">Wallet Balance</div>
                <div className=" text-base font-semibold">{balance.data?.formatted} {balance.data?.symbol}</div>
              </div>
            </div>
            <Separator />
            <div className=" flex items-start justify-between ">
              <div>
                <div>Available to Supply</div>
                <div>
                  <span className=" font-sans font-semibold">93892</span>{" "}
                  <span>GHO</span>
                </div>
              </div>
              <div>
                {/* <SupplyModal /> */}
              </div>
            </div>
            <div className=" flex items-start justify-between ">
              <div>
                <div>Available to Borrow</div>
                <div>
                  <span className=" font-sans font-semibold">93892</span>{" "}
                  <span>GHO</span>
                </div>
              </div>
              <div>
                <BorrowModal />
              </div>
            </div>
          </Card>
        </div>
        
      </DialogContent>
    </Dialog>
  );
}
