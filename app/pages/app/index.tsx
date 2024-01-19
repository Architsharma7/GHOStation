import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import ghost from "@/assets/ghost4.png";

export default function App() {
  return (
    <div className="min-h-scren relative">
      <div className="flex items-center justify-center min-h-[70vh] py-10 mt-48 z-10 ">
        <div className="relative space-y-3">
          <Card className="text-lg font-semibold tracking-wide max-w-2xl z-10 p-7 text-center">
            GHO-Station brings together all DeFi operations into one simple,
            unified platform. Take advantage of yield opportunities, and all
            things GHO - all from one powerful solution.
          </Card>
          <Image
            src={ghost}
            alt="ghost"
            className=" w-10/12 -z-10 -top-40 absolute op-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl"
          />
        </div>
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
