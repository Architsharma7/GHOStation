import React, {useEffect, useState} from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateProposal } from "@/components/create-proposal";
import { Separator } from "@/components/ui/separator";
import ShowClaimDetails from "./show-claim-details";

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


export default function AllClaimsTable() {

  return (
    <Card className=" w-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] min-h-96 p-6 px-8 rounded-xl space-y-3 ">
      <Table className="mt-4 w-full   ">
        <TableHeader className=" ">
          <TableRow className=" ">
            <TableHead className="text-neutral-700 rounded-l-xl bg-violet-300/30 ">
              Protocol Name
            </TableHead>
            <TableHead className="text-neutral-700 bg-violet-300/30 ">
              Claim Date
            </TableHead>
            <TableHead className="text-neutral-700 bg-violet-300/30">
              Claim Amount
            </TableHead>
            <TableHead className="text-neutral-700 bg-violet-300/30">
              Status
            </TableHead>

            <TableHead className="text-neutral-700 rounded-r-xl bg-violet-300/30"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          <TableRow className=" hover:bg-white/10 cursor-pointer">
            <TableCell>
              <ShowClaimDetails
                companyAddress={"0xfB01b5397E39D10108c1343cA8C27e9B4036beEF"}
                verifierAddress={"0x8jbbe87h5397E39D10108c1343cA8C27e9B4036beEF"}
                claimAmount={1000}
                claimProposalTime={"2022-03-11T12:00:00"}
                ClaimStatus={"Pending"}
                ClaimResult={"Pending"}
              />
            </TableCell>
            <TableCell className="">data</TableCell>
            <TableCell>data</TableCell>
            <TableCell>data</TableCell>
            <TableCell className=" w-32">
              <Button variant={"destructive"}>Dispute</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
}
