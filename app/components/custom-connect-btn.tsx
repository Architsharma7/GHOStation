import { ConnectKitButton } from "connectkit";
import React from "react";
import { Button, ButtonProps, buttonVariants } from "./ui/button";

export default function CustomConnectButton(props: ButtonProps) {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, hide, address, ensName, chain }) => {
        return (
          <Button variant={"default"} onClick={show} {...props}>
            {isConnected ? address : "Connect Wallet"}
          </Button>
        );
      }}
    </ConnectKitButton.Custom>
  );
}
