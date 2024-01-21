import React, { useEffect, useState } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAccount } from "wagmi";
import { getCompanyInsuranceData } from "@/utils/InsurancevaultCalls";
import { formatEther } from "viem";

export default function RegisteredCompanyDetails() {
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
    <Card className=" border-0 p-6 shadow-md rounded-xl space-y-4 ">
      <CardHeader className=" p-0">
        <CardTitle>Your Insurance Details</CardTitle>
      </CardHeader>
      <div className=" space-y-3 mt-2">
        <Card className=" p-3 bg-violet-100 flex flex-col items-start justify-between gap-1">
          <div className=" text-lg">Company Wallet Address</div>
          <div className=" truncate text-sm">
            {companyDetails && companyDetails[0]}
          </div>
        </Card>
        <Card className=" p-3 bg-violet-100 flex items-start justify-between gap-3">
          <div className=" flex items-start gap-1 flex-col justify-between">
            <div className=" text-lg">Insured Amount</div>
            <div>
              {companyDetails &&
                Number(formatEther(companyDetails[2])).toFixed(2)}
            </div>
          </div>
          <div className=" flex items-start gap-1 flex-col justify-between">
            <div className=" text-lg">Monthly Premium Amount</div>
            <div>
              {companyDetails &&
                Number(formatEther(companyDetails[3])).toFixed(2)}
            </div>
          </div>
        </Card>
        <Card className=" p-3 bg-violet-100 flex items-start justify-between gap-3">
          <div className=" flex items-start gap-1 flex-col justify-between">
            <div className=" text-lg">Premium Last Deposited</div>
            <div>
              {companyDetails &&
                new Date(Number(companyDetails[4])).toLocaleDateString()}
            </div>
          </div>
          <div className=" flex items-start gap-1 flex-col justify-between">
            <div className=" text-lg">Registered On</div>
            <div>
              {companyDetails &&
                new Date(Number(companyDetails[5])).toLocaleDateString()}
            </div>
          </div>
        </Card>
        <Card className=" p-3 bg-violet-100 flex items-start justify-between gap-3">
          <div className=" flex items-start gap-1 flex-col justify-between">
            <div className=" text-lg">Last Claim Filed On</div>
            <div>
              {companyDetails &&
                new Date(Number(companyDetails[6])).toLocaleDateString()}
            </div>
          </div>
          <div className=" flex items-start gap-1 flex-col justify-between">
            <div className=" text-lg">Last Claim Amount</div>
            <div>
              {companyDetails &&
                Number(formatEther(companyDetails[7])).toFixed(2)}
            </div>
          </div>
        </Card>
      </div>
    </Card>
  );
}
