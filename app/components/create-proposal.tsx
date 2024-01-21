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
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { uploadData } from "@/utils/ipfsstorage";
import { requestClaim } from "@/utils/InsurancevaultCalls";

export function CreateProposal() {
  const [protocolName, setProtocolName] = useState("");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState("");

  const requestClaimProposal = async () => {
    const data = {
      protocolName: protocolName,
    };
    const cid = await uploadData(data);
    const tx = await requestClaim(amount, cid);
    console.log(tx);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="custom">Create Proposal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] border-0 shadow-md bg-[#f8f5ff]">
        <DialogHeader>
          <DialogTitle>Claim Proposal</DialogTitle>
          <DialogDescription>
            Create a claim proposal for your protocol.
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
              Address to receive funds
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
              Amount required
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="mt-2 w-full"
              />
            </Label>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="col-span-full">
              Reason for insurance claim
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g: We were hacked by a group of hackers"
                className="mt-2 w-full"
              />
            </Label>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => requestClaimProposal()}
            variant="custom"
            className="w-full"
          >
            File Claim
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
