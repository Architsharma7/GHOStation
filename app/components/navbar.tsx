import { ConnectKitButton } from "connectkit";
import React from "react";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <div className="px-5 w-full">
      <div className="flex py-4 border-b-neutral-500/30 border-b items-center justify-between mx-auto">
        <div>GHO-S</div>
        <ConnectKitButton.Custom>
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
                {isConnected ? address : "Custom Connect"}
              </Button>
            );
          }}
        </ConnectKitButton.Custom>
      </div>
    </div>
  );
}
