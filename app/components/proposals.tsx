import React from "react";
import { Card } from "./ui/card";
import MintGHO from "./mint-gho";

export default function Proposals() {
  return (
    <div className="space-y-8 w-5/12">
      <Card className="border-0 flex-col  flex items-stretch justify-center border-neutral-300 shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white min-h-96 p-6 px-8 rounded-xl space-y-3 ">
        Mint GHO and Supply GHO token pairs
      </Card>
      <MintGHO />
    </div>
  );
}

export function ProposalCard() {
  return (
    <div className="space-y-8 w-5/12">
      <Card className="border-0 flex-col  flex items-stretch justify-center border-neutral-300 shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white min-h-96 p-6 px-8 rounded-xl space-y-3 ">
        Mint GHO and Supply GHO token pairs
      </Card>
      <MintGHO />
    </div>
  );
}
