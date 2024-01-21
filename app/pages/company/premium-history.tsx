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

export default function PremiumHistory() {
  return (
    <Card className=" border-0 border-neutral-300 shadow-[0_3px_10px_rgb(0,0,0,0.2)] gradient min-h-96 p-6 px-8 rounded-xl space-y-3 ">
      <CardTitle className=" text-xl font-semibold tracking-wide">
        Premium Histroy
      </CardTitle>
      <CardDescription>Your all the previous premium payments.</CardDescription>

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
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          <TableRow className=" hover:bg-white/10 cursor-pointer">
            <TableCell className=" flex items-center gap-1">data</TableCell>
            <TableCell className="">data</TableCell>
            <TableCell>data</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
}
