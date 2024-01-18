import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SupplyModal from "./supply-modal";
import BorrowModal from "./borrow-modal";
import VaultDeposit from "./vault-deposit";
import Pools from "./pools";
import SupplyTable from "./supply-table";
import VaultStats from "./vault-stats";
import Vault from "./vault";
import DashboardCharts from "./dashboard-charts";

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
        <TabsTrigger className="rounded-md" value="earn">
          Earn
        </TabsTrigger>
      </TabsList>
      <TabsContent value="dashboard" className="py-8">
        <div className=" space-x-2 py-3 space-y-10">
          <DashboardCharts />
        </div>
      </TabsContent>
      <TabsContent value="tools"  className="py-8">
        <div className=" space-x-2 py-3 space-y-10">
          <SupplyTable />

          <VaultDeposit />
          <SupplyModal />
          <BorrowModal />
        </div>
      </TabsContent>
      <TabsContent
        value="earn"
        className=" flex items-start justify-normal gap-12 py-8"
      >
        <div className=" w-3/5">
          <Vault />
        </div>
        <div className=" w-3/5">
          <Pools />
        </div>
      </TabsContent>
    </Tabs>
  );
}
