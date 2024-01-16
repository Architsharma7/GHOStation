import "../styles/globals.css";
import type { AppProps } from "next/app";

// import { NextGatingWrapper, UniversalGatingWrapper } from "token-gating-sdk";
// NOTE : IMPORT respective Component to Wrap
import "@rainbow-me/rainbowkit/styles.css";

import { configData } from "../config/config";
// NOTE : Modify the input config data type according to the requirements

const API_KEY: any = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

export default function App({ Component, pageProps }: AppProps) {
  return (
    // <NextGatingWrapper config={configData} alchemyApiKey={API_KEY}>
    <Component {...pageProps} />
    // </NextGatingWrapper>
  );
}
