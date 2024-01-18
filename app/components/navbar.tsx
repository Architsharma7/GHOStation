import { ConnectKitButton } from "connectkit";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="px-5 w-full">
      <div className="flex py-4 border-b-neutral-500/30 border-b items-center justify-between mx-auto">
        <Link href={'/'} className=" text-xl font-bold tracking-wide">GHO-S</Link>
        <ConnectKitButton/>
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
