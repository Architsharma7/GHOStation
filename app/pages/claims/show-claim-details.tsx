import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";

// struct ClaimProposal {
//     address companyAddress;
//     address verifierAddress;
//     uint256 claimAmount;
//     string proofCID;
//     uint claimProposalTime;
//     ClaimStatus \_status;
//     ClaimResult \_result;
//     }

interface Props {
  companyAddress: string;
  verifierAddress: string;
  claimAmount: number;
  //   proofCID: string;
  claimProposalTime: string;
  ClaimStatus: string;
  ClaimResult: string;
}

export default function ShowClaimDetails({
  companyAddress,
  verifierAddress,
  claimAmount,
  //   proofCID,
  claimProposalTime,
  ClaimStatus,
  ClaimResult,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>{companyAddress}</div>
      </DialogTrigger>
      <DialogContent>
        <CardTitle>Claim Details</CardTitle>
        <Card className=" p-4 rounded-md shadow-md mt-2 bg-violet-100 border-0 flex flex-col items-start gap-3 justify-between">
          <div className=" space-y-1">
            <div className=" text-lg font-semibold">Company Address :</div>{" "}
            <div> {companyAddress}</div>
          </div>
          <div>
            <div className=" text-lg font-semibold">Verifier address:</div>
            <div>{verifierAddress}</div>
          </div>
        </Card>

        <div className=" space-y-3">
          <Card className=" p-4 rounded-md shadow-none bg-transparent border-0 flex items-start gap-3 justify-between">
            <div>
              <div className=" text-lg font-semibold">Claim amount: </div>{" "}
              <div>{claimAmount}</div>
            </div>
            <div>
              <div className=" text-lg font-semibold">Proposal claim time:</div>{" "}
              <div> {claimProposalTime}</div>
            </div>
          </Card>
          <Card className=" gap-3 p-4 rounded-md shadow-md bg-violet-100 border-0 flex items-start justify-between">
            <div className=" space-y-3">
              <div>
                <div className=" text-lg font-semibold">Claim amount: </div>{" "}
                <div>{claimAmount}</div>
              </div>
              <div>
                <div className=" text-lg font-semibold">
                  Proposal claim time:
                </div>{" "}
                <div> {claimProposalTime}</div>
              </div>
            </div>
            <div className=" space-y-3">
              <div>
                <div className=" text-lg font-semibold">Claim Status: </div>{" "}
                <div>
                  <Badge variant={"secondary"}>{ClaimStatus}</Badge>
                </div>
              </div>
              <div>
                <div className=" text-lg font-semibold">Claim result: </div>{" "}
                <div>
                  <Badge variant={"secondary"}>{ClaimResult}</Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
