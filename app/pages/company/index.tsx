import { CreateProposal } from "@/components/create-proposal";
import React, { useEffect, useState } from "react";
import PremiumHistory from "./premium-history";
import { CreateCompany } from "./create-company";
import DepositPremium from "./deposit-premium";
import { Card, CardTitle } from "@/components/ui/card";
import { getCompanyInsuranceData } from "@/utils/InsurancevaultCalls";
import { useAccount } from "wagmi";

export default function Company() {
  const [companyDetails, setCompanyDetails] = useState<any>();
  const { address } = useAccount();
  // fetch Company Insurance Data
  useEffect(() => {
    if (!companyDetails && address) {
      getCompanyData();
    }
  }, [address]);

  const getCompanyData = async () => {
    if (!address) return;
    const data = await getCompanyInsuranceData(address);
    console.log(data);
    setCompanyDetails(data);
  };

  return (
    <div className="min-h-screen space-y-8">
      {/* border-b border-neutral-300 */}
      <Card className=" bg-white flex items-center justify-between p-6 border-0 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <CardTitle className=" text-xl font-semibold tracking-wide">
          Get Insured
        </CardTitle>
        <CreateCompany />
      </Card>

      <div className=" grid grid-cols-12 gap-10">
        <div className=" col-span-6">
          <CreateProposal />
        </div>
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
