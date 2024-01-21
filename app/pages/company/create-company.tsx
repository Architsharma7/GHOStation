import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export function CreateCompany() {
  const [protocolName, setProtocolName] = useState("");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState("");


// struct InsuranceDetails {
//   address companyAddress;
//   string companyCID;
//   uint256 insuredAmount;
//   uint256 premium;
//   uint256 lastPremiumDepositTime;
//   uint256 registerationTime;
//   uint256 lastClaimTime;
//   uint256 lastClaimAmount;
//   }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="custom">Register</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] border-0 shadow-md bg-[#eae0ff]">
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
          <DialogDescription>
            Fill your company details to get started with Ghostation.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="col-span-full">
              Protocol Name
              <Input
                value={protocolName}
                onChange={(e) => setProtocolName(e.target.value)}
                type="text"
                placeholder="e.g: GHOSTATION"
                className="mt-2 w-full"
              />
            </Label>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="col-span-full">
              Protocol Wallet Address
              <Input
                value={address}
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g: 0xfB01b5397E39D10108c1343cA8C27e9B4036beEF"
                className="mt-2 w-full"
              />
            </Label>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="col-span-full">
              Insurance Amount
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="mt-2 w-full"
              />
            </Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="custom" className="w-full">
            Register
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
