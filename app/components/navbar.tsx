import { ConnectKitButton } from "connectkit";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import ghost from "@/assets/ghost.png";
import { CreateProposal } from "./create-proposal";

export default function Navbar() {
  return (
    <div className="px-5 w-full z-50">
      <div className="flex py-4 border-b-neutral-500/30 border-b items-center justify-between mx-auto">
        <Link
          href={"/"}
          className="flex items-center text-xl font-bold tracking-wide gap-1"
        >
          <Image src={ghost} alt="ghost" className="w-12" />
          {/* <div>GHOSTATION</div> */}
          <h1 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-500">
            GHOSTATION
          </h1>
        </Link>
        <div className=" flex items-center gap-5">
          <Link href={"/app"}>Dashboard</Link>
          <Link href={"/company"}>Insurance</Link>
          <Link href={"/claims"}>Claims</Link>
          <ConnectKitButton />
        </div>
        {/* <ConnectKitButton.Custom>
          {({
            isConnected,
            isConnecting,
            show,
            hide,
            address,
            ensName,
            chain,
          }) => {
            return (
              <Button onClick={show}>
                {isConnected ? address : "Connect"}
              </Button>
            );
          }}
        </ConnectKitButton.Custom> */}
      </div>
    </div>
  );
}
