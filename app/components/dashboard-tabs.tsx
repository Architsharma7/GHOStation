import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Pools from "./pools";
import SupplyTable from "./supply-table";
import Vault from "./vault";
import DashboardCharts from "./dashboard-charts";
import MintGHO from "./mint-gho";
import { Card } from "./ui/card";
import ghost from "@/assets/ghost.png";
import Image from "next/image";

export default function DashboardTabs() {
  return (
    <Tabs defaultValue="dashboard" className="relative z-40">
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
      <div className=" z-10">
        <TabsContent value="dashboard" className="py-8 z-10">
          <div className=" space-x-2 flex items-start justify-between">
            <div className=" w-7/12">
              <DashboardCharts />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="tools" className="py-8">
          <div className=" flex items-start gap-10 justify-between">
            <div className="space-y-8 w-5/12">
              <Card className="border-0 flex-col  flex items-stretch justify-center border-neutral-300 shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white min-h-96 p-6 px-8 rounded-xl space-y-3 ">
                Mint GHO and Supply GHO token pairs
              </Card>
              <MintGHO />
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
      </div>
      <Image src={ghost} alt="ghost" className="absolute top-16 left-14 -z-10 w-80" />
      <Image src={ghost} alt="ghost" className="absolute -top-16 transform -scale-x-100 -right-20 -z-10 w-80 -scale-1 " />
    </Tabs>
  );
}
