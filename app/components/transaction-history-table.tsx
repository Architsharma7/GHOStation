import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { fetchUserTransactions } from "@/utils/transactions";
import { useAccount } from "wagmi";

export default function TransactionHistoryTable() {
  const [data, setData] = useState<any>(null);
  const { address, isConnected } = useAccount();

  const setHistory = async () => {
    const history = await fetchUserTransactions(address);
    console.log(history);
    await setData(history);
  };

  useEffect(() => {
    setHistory();
  }, []);
  return (
    <Card className="gradient w-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] min-h-96 p-6 px-8 rounded-xl space-y-3 ">
      <CardTitle>Transaction History</CardTitle>
      <Table className="mt-4 w-full   ">
        <TableHeader className=" ">
          <TableRow className=" ">
            <TableHead className="text-neutral-700 rounded-l-xl bg-violet-300/30 ">
              From
            </TableHead>
            <TableHead className="text-neutral-700 bg-violet-300/30 ">
              To
            </TableHead>
            <TableHead className="text-neutral-700 bg-violet-300/30">
              Transaction Hash
            </TableHead>
            <TableHead className="text-neutral-700 bg-violet-300/30">
              Amount
            </TableHead>

            <TableHead className="text-neutral-700 rounded-r-xl bg-violet-300/30"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {data &&
            data.map((data: any, idx: any) => {
              return (
                <TableRow className=" hover:bg-white/10 cursor-pointer">
                  <TableCell>{`${data.senderAddress.slice(
                    0,
                    19
                  )}...`}</TableCell>
                  <TableCell>{`${data.recipientAddress.slice(
                    0,
                    19
                  )}...`}</TableCell>
                  <TableCell className="text-blue-500">
                    <a
                      href={`https://sepolia.etherscan.io/${data.transactionHash}`}
                      target="_blank"
                    >{`${data.transactionHash.slice(0, 19)}...`}</a>
                  </TableCell>
                  <TableCell>
                    {parseInt(data.transactionAmount) / 1e18}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </Card>
  );
}
