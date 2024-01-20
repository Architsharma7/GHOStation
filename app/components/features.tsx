import React from "react";
import { Card } from "./ui/card";
import Image from "next/image";
import ghost from "@/assets/ghost3.jpeg";

export default function Features() {
  return (
    <Card className="relative p-8 w-10/12 z-10">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum nemo
      obcaecati optio inventore nostrum recusandae ut voluptate aliquid,
      sapiente iusto. Quidem ad nobis unde ipsam! Facere exercitationem ipsa
      quod natus?
    </Card>
  );
}

export function FeatureCard() {
  return (
    <div className="relative tracking-wider">
      {/* <Image src={ghost} alt="ghost" className=" w-4/12" /> */}
    </div>
  );
}
