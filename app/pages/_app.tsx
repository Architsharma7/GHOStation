import FlareCursor from "@/components/custom-cursor";
import Navbar from "@/components/navbar";
import { Providers } from "@/components/providers";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  return (
    <Providers>
      <div className={cn(pathname === "/" && "max-w-7xl p-6 mx-auto", " px-0")}>
        <div className={cn(pathname !== "/" && "max-w-7xl mx-auto", " px-0")}>
          <Navbar />
        </div>
        <div className={cn(pathname === "/" && "p-6", " px-0")}>
          <FlareCursor />
          <Component {...pageProps} />
        </div>
      </div>
    </Providers>
  );
}
