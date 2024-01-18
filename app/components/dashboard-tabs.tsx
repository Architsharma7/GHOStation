import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SupplyModal from "./supply-modal";
import BorrowModal from "./borrow-modal";
import ValutChart from "./vault-chart";
import VaultDeposit from "./vault-deposit";
import VaultStats from "./vault-stats";
import Pools from "./pools";

export default function DashboardTabs() {
  return (
    <Tabs defaultValue="dashboard">
      <TabsList className=" ">
        <TabsTrigger className="rounded-md" value="dashboard">
          Dashboard
        </TabsTrigger>
        <TabsTrigger className="rounded-md" value="tools">
          Tools
        </TabsTrigger>
      </TabsList>
      <TabsContent value="dashboard">
        <div className=" space-x-2 py-3">
          {/* <ValutChart /> */}
          <Pools />
          <VaultStats />
        </div>
      </TabsContent>
      <TabsContent value="tools">
        <div className=" space-x-2 py-3">
          <VaultDeposit />
          <SupplyModal />
          <BorrowModal />
        </div>
      </TabsContent>
    </Tabs>
  );
}
