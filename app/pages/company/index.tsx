import { CreateProposal } from "@/components/create-proposal";
import React from "react";
import PremiumHistory from "./premium-history";
import { CreateCompany } from "./create-company";
import DepositPremium from "./deposit-premium";
import { Card, CardTitle } from "@/components/ui/card";

export default function Company() {
  return (
    <div className="min-h-screen space-y-8">
      {/* border-b border-neutral-300 */}
      <Card className=" bg-white flex items-center justify-between p-6 border-0 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <CardTitle className=" text-xl font-semibold tracking-wide">Get Insured</CardTitle>
        <CreateCompany />
      </Card>
      <div className=" grid grid-cols-12 gap-10">
        <div className=" col-span-6">
          <DepositPremium />
        </div>
        <div className=" col-span-6">
          <PremiumHistory />
        </div>
      </div>
    </div>
  );
}
