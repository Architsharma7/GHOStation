import DashboardTabs from "@/components/dashboard-tabs";
import { useAccount } from "wagmi";

export default function Home() {
  const { address, isConnecting, isDisconnected } = useAccount();

  return (
    <div className="min-h-screen">
      <DashboardTabs />
    </div>
  );
}
