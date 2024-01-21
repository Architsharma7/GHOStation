import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export default function TransactionHistoryTable() {
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
              Value
            </TableHead>

            <TableHead className="text-neutral-700 rounded-r-xl bg-violet-300/30"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          <TableRow className=" hover:bg-white/10 cursor-pointer">
            <TableCell>Data here</TableCell>
            <TableCell>Data here</TableCell>
            <TableCell>Data here</TableCell>
            <TableCell>Data here</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
}
