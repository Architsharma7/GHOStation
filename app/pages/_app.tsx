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
      <div
        className={cn(pathname !== "/" && " px-0", "max-w-7xl px-6 mx-auto")}
      >
        <div className={cn(pathname === "/" && " px-0", "max-w-7xl mx-auto")}>
          <Navbar />
        </div>
        <div className={cn(pathname !== "/app" && " px-0",  "p-6")}>
          <FlareCursor />
          <Component {...pageProps} />
        </div>
      </div>
    </Providers>
  );
}
