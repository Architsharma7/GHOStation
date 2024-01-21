import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Vault from "./vault";
import DashboardCharts from "./dashboard-charts";
import ghost from "@/assets/ghost.png";
import Image from "next/image";
import Proposals from "./proposals";
import InsuranceVault from "./insurance-vault";
import VerifierStaking from "./verifier-staking";

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
          <div className="gap-10 flex items-start justify-between">
            <div className="w-full">
              <DashboardCharts />
            </div>
            <div className="w-full">
              <VerifierStaking />
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
          <div className=" grid grid-cols-12 gap-10">
            <div className=" col-span-6">
              <Vault />
            </div>
            <div className=" col-span-6">
              <InsuranceVault />
            </div>
          </div>
          {/* <div className=" w-7/12">
            <Pools />
          </div> */}
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
