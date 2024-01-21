import React, { useEffect, useState } from "react";
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
import { getAllClaims } from "@/utils/InsurancevaultCalls";
import { parseEther } from 'viem'
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
  const [data, setData] = useState<any>(null);

  const getClaims = async () => {
    const data = await getAllClaims();
    console.log(data);
    setData(data);
  };

  useEffect(() => {
    getClaims();
  }, []);

  return (
    <Card className=" w-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] min-h-96 p-6 px-8 rounded-xl space-y-3 ">
      <Table className="mt-4 w-full   ">
        <TableHeader className=" ">
          <TableRow className=" ">
            <TableHead className="text-neutral-700 rounded-l-xl bg-violet-300/30 ">
              Protocol Address
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
          {data &&
            data.map((data: any, id: any) => {
              return (
                <TableRow key={id} className=" hover:bg-white/10 cursor-pointer">
                  <TableCell>
                    <ShowClaimDetails
                      companyAddress={
                        data[0]
                      }
                      verifierAddress={
                        data[1]
                      }
                      claimAmount={data[2]}
                      claimProposalTime={data[4]}
                      ClaimStatus= {data[5] === 0 ? "Pending" : "Verified"}
                      ClaimResult={data[6] === 0 ? "NOT_PROCESSED" : "VALID"}
                    />
                  </TableCell>
                  <TableCell className="">{new Date(Number(data[4])*1000).toLocaleDateString()}</TableCell>
                  <TableCell>{((data[2]).toString()/1e18)}</TableCell>
                  <TableCell><p>{data[5] === 0 ? "Pending" : "Verified" }</p></TableCell>
                  <TableCell className=" w-32">
                    <Button variant={"destructive"}>Dispute</Button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </Card>
  );
}
