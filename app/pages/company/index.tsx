import { CreateProposal } from "@/components/create-proposal";
import React, { useEffect, useState } from "react";
import PremiumHistory from "./premium-history";
import { CreateCompany } from "./create-company";
import DepositPremium from "./deposit-premium";
import { Card, CardTitle } from "@/components/ui/card";
import { getCompanyInsuranceData } from "@/utils/InsurancevaultCalls";
import { useAccount } from "wagmi";
import RegisteredCompanyDetails from "./registered-company-details";

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
      <div className=" w-full flex items-center justify-between">
        <div className=" text-2xl font-semibold tracking-wide">Get Insured</div>
        <CreateProposal />
      </div>
      <div className=" flex items-stretch gap-10 justify-between">
        <div className=" w-full">
          {companyDetails ? <RegisteredCompanyDetails /> : <CreateCompany />}
        </div>
        <div className=" w-full">
          <DepositPremium amount={companyDetails ? companyDetails[3] : 0} />
        </div>
      </div>

      <div className=" grid grid-cols-12 gap-10">
        <div className=" col-span-12">
          <PremiumHistory />
        </div>
      </div>
    </div>
  );
}
