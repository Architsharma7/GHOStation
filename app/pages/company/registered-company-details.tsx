import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RegisteredCompanyDetails() {
  return (
    <Card className=" border-0 p-6 shadow-md rounded-xl space-y-4 ">
      <CardHeader className=" p-0">
        <CardTitle>Your Insurance Details</CardTitle>
      </CardHeader>
      <div className=" space-y-3 mt-2">
        <Card className=" p-3 bg-violet-100 flex flex-col items-start justify-between gap-1">
          <div className=" text-lg">Company Wallet Address</div>
          <div className=" truncate text-sm">
            0xfB01b5397E39D10108c1343cA8C27e9B4036beEF
          </div>
        </Card>
        <Card className=" p-3 bg-violet-100 flex items-start justify-between gap-3">
          <div className=" flex items-start gap-1 flex-col justify-between">
            <div className=" text-lg">Insured Amount</div>
            <div>1000 GHO</div>
          </div>
          <div className=" flex items-start gap-1 flex-col justify-between">
            <div className=" text-lg">Monthly Premium Amount</div>
            <div>9000 GHO</div>
          </div>
        </Card>
        <Card className=" p-3 bg-violet-100 flex items-start justify-between gap-3">
          <div className=" flex items-start gap-1 flex-col justify-between">
            <div className=" text-lg">Premium Last Deposited</div>
            <div>1000 GHO</div>
          </div>
          <div className=" flex items-start gap-1 flex-col justify-between">
            <div className=" text-lg">Registered On</div>
            <div>1000 GHO</div>
          </div>
        </Card>
        <Card className=" p-3 bg-violet-100 flex items-start justify-between gap-3">
          <div className=" flex items-start gap-1 flex-col justify-between">
            <div className=" text-lg">Last Claim Filed On</div>
            <div>1000 GHO</div>
          </div>
          <div className=" flex items-start gap-1 flex-col justify-between">
            <div className=" text-lg">Last Claim Amount</div>
            <div>1000 GHO</div>
          </div>
        </Card>
      </div>
    </Card>
  );
}
