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

export function CreateProposal() {
  const [protocolName, setProtocolName] = useState("");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className=" cursor-pointer">Create Proposal</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-0 shadow-md bg-[#eae0ff]">
        <DialogHeader>
          <DialogTitle>Create Proposal</DialogTitle>
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
                placeholder="e.g: 0xjjh73bh8.....3859"
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
          <Button variant="custom" className="w-full">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
