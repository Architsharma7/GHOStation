import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SupplyModal from "./token-pair-supply-modal";
import BorrowModal from "./borrow-modal";
import VaultDeposit from "./vault-deposit";
import Pools from "./pools";
import SupplyTable from "./supply-table";
import VaultStats from "./vault-stats";
import Vault from "./vault";
import DashboardCharts from "./dashboard-charts";
import Borrow from "./borrow";
import Deposit from "./deposit";
import MintGHO from "./mint-gho";

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
        <div className=" space-x-2 flex items-start justify-between">
          <div className=" w-7/12">
            <DashboardCharts />
          </div>
          <div className=" w-5/12">
            <MintGHO />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="tools" className="py-8">
        <div className=" flex items-start gap-10 justify-between">
          <div className=" w-5/12 flex flex-col gap-5">
            <div>
              <Borrow />
            </div>
            <div>
              <Deposit />
            </div>
          </div>
          <div className=" w-7/12">
            <SupplyTable />
          </div>

          {/* <VaultDeposit /> */}
        </div>
      </TabsContent>
      <TabsContent
        value="earn"
        className=" flex items-start justify-normal gap-12 py-8"
      >
        <div className=" w-5/12">
          <Vault />
        </div>
        <div className=" w-7/12">
          <Pools />
        </div>
      </TabsContent>
    </Tabs>
  );
}
