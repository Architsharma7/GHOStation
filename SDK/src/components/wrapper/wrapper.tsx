import React, { ReactNode } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import {
  ConnectButton,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import {
  configureChains,
  createClient,
  useAccount,
  useNetwork,
  WagmiConfig,
} from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { useState, useEffect } from "react";

import { configDataType, configType } from "../config/index";
// NOTE: WE HAVE TO DEFINE THE TYPE OF THE CONFIG FILE INPUT WE WANT HERE , REMOVE THE REST METHODS

import styled from "styled-components";
import { Spinner } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";

const API_KEY: any = process.env.ALCHEMY_ID;

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [alchemyProvider({ apiKey: API_KEY }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "SDK",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export interface IWrapperProps {
  config: configType;
  alchemyApiKey: string;
  children: ReactNode;
}

// MODIFY THE CONFIG
// for next Only
export const Wrapper: React.FunctionComponent<IWrapperProps> = ({
  config,
  alchemyApiKey,
  children,
}) => {
  const { address } = useAccount();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | undefined>();
  const [configData, setConfigData] = useState<configDataType | undefined>();
  const [showConnectModel, setShowConnectModel] = useState(false);
  const { chain, chains } = useNetwork();

  // NOTE : MAIN LOGIC GOES HERE
  // WE CAN WRITE THE EXTRA logic component seperately and then call them here via the UI

  // check the URL and accordingly the condition
  // Open up a ConnectWallet section in case there is no address
  // Show a Loading icon when the details are loading
  // In the end , if the user is restricted , then Show the User a message

  const ConnectButtonUi = () => {
    return (
      <ConnectUi>
        <TopText>
          <p>Token Gated WebPage </p>
          <p>
            Built with{" "}
            <a href="https://www.npmjs.com/package/token-gating-sdk">
              @token-gating-sdk
            </a>
          </p>
        </TopText>
        <ConnectButton />
        <Message>{message && message}</Message>
        <BottomText>
          <p>
            Brought to you in partnership with : &nbsp;{" "}
            <p style={{ color: "orange" }}>Replit</p> &nbsp; x &nbsp;{" "}
            <p style={{ color: "slateblue" }}>Alchemy</p>
          </p>
        </BottomText>
      </ConnectUi>
    );
  };

  const LoaderUi = () => {
    return (
      <ConnectUi>
        <TopText>
          <p>Token Gated WebPage </p>
          <p>
            Built with{" "}
            <a href="https://www.npmjs.com/package/token-gating-sdk">
              @token-gating-sdk
            </a>
          </p>
        </TopText>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        <p>Checking wallet for NFTs and Tokens...</p>
        <Message>{message && message}</Message>
        <BottomText>
          <p>
            Brought to you in partnership with : &nbsp;{" "}
            <p style={{ color: "orange" }}>Replit</p> &nbsp; x &nbsp;{" "}
            <p style={{ color: "slateblue" }}>Alchemy</p>
          </p>
        </BottomText>
      </ConnectUi>
    );
  };

  const RestrictedUi = () => {
    return (
      <ConnectUi>
        <TopText>
          <p>Token Gated WebPage </p>
          <p>
            Built with{" "}
            <a href="https://www.npmjs.com/package/token-gating-sdk">
              @token-gating-sdk
            </a>
          </p>
        </TopText>
        <Restricteddiv>
          <p>This page is restricted for you.</p>
          {/* <p>Your wallet must have {getMessage()}</p> */}
        </Restricteddiv>
        <Message>{message && message}</Message>
        <BottomText>
          <p>
            Brought to you in partnership with : &nbsp;{" "}
            <p style={{ color: "orange" }}>Replit</p> &nbsp; x &nbsp;{" "}
            <p style={{ color: "slateblue" }}>Alchemy</p>
          </p>
        </BottomText>
      </ConnectUi>
    );
  };

  return (
    <ChakraProvider>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          {/*NOTE THE MAIN UI GOES IN BETWEEN THE RAINBOWKIT PROVIDER */}

          <Content>{children}</Content>
          {/* THIS IS THE CONTENT WHICH IS OF THE PARENT COMPONENT OR THE COMPONENT WHICH IMPORTS IT ALL */}
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
};

export const TokenGatingUI = () => {
  return (
    <div>
      <ConnectButton />
    </div>
  );
};

const Content = styled.div`
  height: 100vh;
  background-color: black;
  p {
    color: white;
  }
  h1 {
    color: white;
  }
  a {
    color: white;
  }
`;
const Content2 = styled.div`
  height: 100vh;
  background-color: #edf2ef;
  a {
    color: black;
  }
  p {
    color: black;
  }
`;

const ConnectUi = styled.div`
  height: 100vh;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  p {
    color: black;
    font-size: 30px;
  }
`;

const TopText = styled.div`
  margin-bottom: 60px;
  text-align: center;
  font-weight: 700;
  a {
    text-decoration: underline;
  }
`;

const Message = styled.div`
  margin-top: 20px;
  color: black;
  font-size: 30px;
  text-align: center;
`;

const BottomText = styled.div`
  text-align: center;
  padding: 10px 20px 10px 20px;
  background-color: black;
  border-radius: 20px;
  margin-top: 60px;
  p {
    color: white;
  }
`;

const Restricteddiv = styled.div`
  height: 300px;
  width: 550px;
  padding: 20px 20px 20px 20px;
  border: 2px solid black;
  border-radius: 10px;
  background-color: white;
  p {
    justify-content: center;
    align-items: center;
    display: flex;
    color: black;
    font-size: 30px;
    text-align: center;
    vertical-align: middle;
    margin-bottom: 10px;
    margin-top: 20px;
  }
`;
