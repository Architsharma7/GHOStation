import React from "react";
import { Card } from "./ui/card";
import MintGHO from "./mint-gho";
import { Button } from "./ui/button";
import Image from "next/image";
import ghost from "@/assets/ghost6.png";
import ghost2 from "@/assets/ghost.png";

const mockData = [
  {
    protocolName: "XYZ Protocol",
    amount: 3209302,
    reason:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto libero aperiam iste voluptatum, id eum nobis! Laudantium harum nihil enim repudiandae voluptas deleniti sit, aliquid tenetur odit quaerat, perspiciatis eius!",
    address: "0xkj9adjk23j09fnksu9o3ndla9iejdnk",
  },
  {
    protocolName: "XYZ Protocol",
    amount: 3209302,
    reason:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto libero aperiam iste voluptatum, id eum nobis!",
    address: "0xkj9adjk23j09fnksu9o3ndla9iejdnk",
  },
  {
    protocolName: "XYZ Protocol",
    amount: 3209302,
    reason:
      "Lorem ipsum dolor sit amet consectetur  nihil enim repudiandae voluptas deleniti sit, aliquid tenetur odit quaerat, perspiciatis eius!",
    address: "0xkj9adjk23j09fnksu9o3ndla9iejdnk",
  },
  {
    protocolName: "XYZ Protocol",
    amount: 3209302,
    reason: "Lorem ipsum dolor sit amet consectetur",
    address: "0xkj9adjk23j09fnksu9o3ndla9iejdnk",
  },
];

export default function Proposals() {
  return (
    <div className="grid grid-cols-12 gap-10">
      {mockData.map((proposal, idx) => (
        <div key={idx} className=" col-span-6">
          <ProposalCard
            protocolName={proposal.protocolName}
            address={proposal.address}
            amount={proposal.amount}
            reason={proposal.reason}
          />
        </div>
      ))}
    </div>
  );
}

export function ProposalCard({
  protocolName,
  amount,
  reason,
  address,
}: {
  protocolName: string;
  amount: number;
  reason: string;
  address: string;
}) {
  return (
    // max-w-lg min-w-[580px] px-2 
    <div className="relative h-full w-full">
      <Card className="border-0 relative h-full border-neutral-300 shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white min-h-96 px-6 py-8 rounded-xl z-10 flex flex-col ">
        <div className="flex-col flex items-stretch justify-between gap-5 z-10 mb-6">
          <div className=" flex flex-col gap-2 bg-[#bc9dff]/30 p-4 rounded-lg">
            <div className=" flex items-center justify-between">
              <h1 className="tracking-wide text-2xl font-bold">
                {protocolName}
              </h1>
              <div className="tracking-wide text-lg font-semibold">
                $ {amount}
              </div>
            </div>
            <div className="tracking-wide font-[500]">{address}</div>
          </div>
          <div className="tracking-wide font-[500] ">{reason}</div>
        </div>
        <div className="w-full mt-auto items-center flex justify-between gap-5">
          <Button className="w-full" variant={"destructive"}>
            Reject
          </Button>
          <Button className="w-full" variant={"custom"}>
            Approve
          </Button>
        </div>
        <Image
          src={ghost2}
          alt="ghost"
          className=" -z-10 absolute right-10 bottom-12 w-12 opacity-[70%] transform -scale-x-100 "
        />
      </Card>
    </div>
  );
}
