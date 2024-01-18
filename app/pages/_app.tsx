import Navbar from "@/components/navbar";
import { Providers } from "@/components/providers";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <div className="p-6">
          <Component {...pageProps} />
        </div>
      </div>
    </Providers>
  );
}
