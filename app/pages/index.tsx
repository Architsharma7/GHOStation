import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import ghost from "@/assets/ghost.gif";
// import ghost from "@/assets/ghost4.png";
import Features from "@/components/features";
import { getFile, getFileContent } from "@/utils/ipfsstorage";

export default function App() {
  return (
    <div className="min-h-scren relative py-10">
      {/* min-h-[70vh] mt-48 */}
      {/* <div className="flex items-center justify-center z-10"> */}
      <div className="relative space-y-3 flex gap-x-10 items-center flex-col justify-center gap-4">
        <h1 className="font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-purple-600 to-violet-500">
          {/* <h1 className="text-5xl font-bold tracking-wide text-center"> */}
          GHOSTATION
        </h1>
        <Image
          src={ghost}
          alt="ghost"
          className="rounded-xl w-3/12"
          // className=" w-8/12 -z-10 -top-40 absolute op-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl"
        />
        <Card className="text-lg font-semibold tracking-wide max-w-2xl z-10 p-7 text-center">
          GHO-Station brings together all DeFi operations into one simple,
          unified platform. Take advantage of yield opportunities, and all
          things GHO - all from one powerful solution.
        </Card>
      </div>
      {/* </div> */}
      <div className="py-10 px-20">
        <Features />
      </div>
      {/* <div className=" bg-yellow-400 p-10 min-h-[40vh] -mt-20 w-full">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure eius quam
        itaque quod. Eum sint laudantium facilis commodi numquam, incidunt
        fugiat possimus labore ut eligendi corrupti obcaecati! Sed, dignissimos
        corrupti.
      </div> */}
    </div>
  );
}
