import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowRight } from "lucide-react";
import VaultDeposit from "./vault-deposit";
import { Button } from "./ui/button";
import ViewPoolDetails from "./view-pool-details";

const data = [
  {
    composition: {
      token1: "GHO",
      token2: "USDC",
    },
    poolValue: "$500",
    volume: "$100",
    apr: "10.00 %",
  },
  {
    composition: {
      token1: "GHO",
      token2: "USDC",
    },
    poolValue: "$500",
    volume: "$100",
    apr: "10.00 %",
  },
  {
    composition: {
      token1: "GHO",
      token2: "USDC",
    },
    poolValue: "$500",
    volume: "$100",
    apr: "10.00 %",
  },
  {
    composition: {
      token1: "GHO",
      token2: "USDC",
    },
    poolValue: "$500",
    volume: "$100",
    apr: "10.00 %",
  },
  {
    composition: {
      token1: "GHO",
      token2: "USDC",
    },
    poolValue: "$500",
    volume: "$100",
    apr: "10.00 %",
  },
];

export default function Pools() {
  return (
    <Card className=" border-0 border-neutral-300 shadow-[0_3px_10px_rgb(0,0,0,0.2)] gradient min-h-96 p-6 px-8 rounded-xl space-y-3 ">
      <h1 className=" text-xl font-semibold tracking-wide">Pools</h1>
      <Table className=" w-full  ">
        <TableHeader className=" ">
          <TableRow className=" ">
            <TableHead className="text-neutral-700 rounded-l-xl bg-violet-300/30 ">
              Composition
            </TableHead>
            <TableHead className="text-neutral-700 bg-violet-300/30">
              Pool Value
            </TableHead>
            <TableHead className="text-neutral-700 bg-violet-300/30">
              Volume
            </TableHead>
            <TableHead className="text-neutral-700  bg-violet-300/30">
              APR
            </TableHead>
            <TableHead className="text-neutral-700 rounded-r-xl bg-violet-300/30">
              Details
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {data.map((row, idx) => (
            <TableRow key={idx} className=" hover:bg-white/10 cursor-pointer">
              <TableCell className=" flex items-center gap-1">
                <Badge variant={"default"}>{row.composition.token1}</Badge>
                <ArrowRight className=" h-4 w-4" />
                <Badge variant={"outline"} className="bg-white/90">
                  {row.composition.token2}
                </Badge>
              </TableCell>
              <TableCell>{row.poolValue}</TableCell>
              <TableCell>{row.volume}</TableCell>
              <TableCell>{row.apr}</TableCell>
              <TableCell className=" w-40">
                <ViewPoolDetails />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
