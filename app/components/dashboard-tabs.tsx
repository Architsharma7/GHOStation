import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Pools from "./pools";
import SupplyTable from "./supply-table";
import Vault from "./vault";
import DashboardCharts from "./dashboard-charts";
import MintGHO from "./mint-gho";
import { Card } from "./ui/card";
import ghost from "@/assets/ghost.png";
import Image from "next/image";
import Proposals from "./proposals";

export default function DashboardTabs() {
  return (
    <Tabs defaultValue="dashboard" className="relative z-40">
      <TabsList className=" ">
        <TabsTrigger className="rounded-md" value="dashboard">
          Dashboard
        </TabsTrigger>
        <TabsTrigger className="rounded-md" value="tools">
          Proposals
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
          <Proposals />
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
      <Image
        src={ghost}
        alt="ghost"
        className="absolute top-16 left-14 -z-10 w-80"
      />
      <Image
        src={ghost}
        alt="ghost"
        className="absolute -top-16 transform -scale-x-100 -right-20 -z-30 w-80 -scale-1 "
      />
    </Tabs>
  );
}
