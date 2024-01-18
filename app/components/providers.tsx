import { WagmiConfig, createConfig, sepolia } from "wagmi";
import {
  ConnectKitProvider,
  ConnectKitButton,
  getDefaultConfig,
} from "connectkit";

const chains = [sepolia];

const config = createConfig(
  getDefaultConfig({
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_API,
    walletConnectProjectId: process.env
      .NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
    chains,
    appName: "GHO-Station",
    appDescription:
      "A Platform + SDK, acting as one stop solution for GHO operations",
  })
);

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>{children}</ConnectKitProvider>
    </WagmiConfig>
  );
};
