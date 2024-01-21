import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchPremiumTransaction } from "@/utils/transactions";
import { useAccount } from "wagmi";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatEther } from "viem";

export default function PremiumHistory() {
  const [premiumData, setPremiumData] = useState<any>();
  const { address } = useAccount();

  // fetch Company Insurance Data
  useEffect(() => {
    if (!premiumData && address) {
      getPremiumHistoryData();
    }
  }, [address]);

  const getPremiumHistoryData = async () => {
    if (!address) return;
    const data = await fetchPremiumTransaction(address, 15);
    console.log(data);
    setPremiumData(data);
  };

  return (
    <Card className=" border-0 border-neutral-300 shadow-[0_3px_10px_rgb(0,0,0,0.2)] min-h-96 p-6 px-8 rounded-xl space-y-3 ">
      <CardHeader className="p-0">
        <CardTitle className=" text-xl font-semibold tracking-wide">
          Premium Histroy
        </CardTitle>
        <CardDescription>
          Your all the previous premium payments.
        </CardDescription>
      </CardHeader>

      <Table className="mt-4 w-full  ">
        <TableHeader className=" ">
          <TableRow className=" ">
            <TableHead className="text-neutral-700 rounded-l-xl bg-violet-300/30 ">
              Date
            </TableHead>
            <TableHead className="text-neutral-700 bg-violet-300/30">
              Premium Amount
            </TableHead>
            <TableHead className="text-neutral-700 bg-violet-300/30 rounded-r-xl">
              TxHash
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {premiumData ? (
            premiumData.map((data: any) => {
              return (
                <TableRow className=" hover:bg-white/10 cursor-pointer">
                  <TableCell className=" flex items-center gap-1">
                    {new Date(Number(data.txTime)).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="">
                    {Number(formatEther(data.transactionValue))}
                  </TableCell>
                  <TableCell>{data.transactionHash}</TableCell>
                </TableRow>
              );
            })
          ) : (
            <a>No Premiums Paid</a>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
