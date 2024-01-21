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
import { registerInsurance } from "@/utils/InsurancevaultCalls";
import { uploadData } from "@/utils/ipfsstorage";
import { useEffect, useState } from "react";

export function CreateCompany() {
  const [protocolName, setProtocolName] = useState("");
  const [address, setAddress] = useState<`0x${string}`>("0x");
  const [amount, setAmount] = useState<number>(0);
  const [premium, setPremium] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState<string>("");
  const [webpage, setWebpage] = useState<string>("");

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

  useEffect(() => {
    if (amount) {
      const premium = calculatePremium(amount);
      const premiumInEther = premium / 10 ** 18;
      setPremium(premiumInEther);
    }
  }, [amount]);

  const calculatePremium = (_amount: number) => {
    // calculate 1.5% of the total Insured amount
    const amountInWei = _amount * 10 ** 18;
    return (amountInWei * 1.5) / 100;
  };

  const registerCom = async () => {
    try {
      const data = {
        protocolName: protocolName,
        contact: contact,
        webpage: webpage,
        description: description,
      };
      const cid = await uploadData(data);
      const tx = await registerInsurance(amount, cid, address);
      console.log(tx);
    } catch (error) {
      console.log(error);
    }
  };

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
            {premium && <p className="col-span-full">Premium: {premium}</p>}
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => registerCom()}
            variant="custom"
            className="w-full"
          >
            Register
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
