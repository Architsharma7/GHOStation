import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Vault from "./vault";
import DashboardCharts from "./dashboard-charts";
import ghost from "@/assets/ghost.png";
import Image from "next/image";
import Proposals from "./proposals";
import InsuranceVault from "./insurance-vault";
import VerifierStaking from "./verifier-staking";
import { Card, CardDescription, CardTitle } from "./ui/card";
import TransactionHistoryTable from "./transaction-history-table";

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
          <div className="w-full space-y-8">
            <Card className="relative p-6 space-y-2  shadow-[0_3px_10px_rgb(0,0,0,0.2)] border-0">
              <CardTitle>Become a verifier</CardTitle>
              <CardDescription>
                Stake your GHO tokens to become a verifier on GHOSTATION
              </CardDescription>
            </Card>
            <div className=" flex items-start justify-between gap-10">
              <div className=" w-full">
                <VerifierStaking />
              </div>
              <div className=" w-full">
                <TransactionHistoryTable />
              </div>
            </div>

            <Image
              src={ghost}
              alt="ghost"
              className="absolute bottom-[630px]  left-20 -z-10 w-80"
            />
            <Image
              src={ghost}
              alt="ghost"
              className="absolute bottom-[250px] transform -scale-x-100 right-20 -z-30 w-80 -scale-1 "
            />
          </div>
          <div className="">
            <Card className="relative p-6 space-y-2 my-10 bg-violet-50 shadow-[0_3px_10px_rgb(0,0,0,0.2)] border-0">
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                Analytics of your wallet and GHO transactions
              </CardDescription>
            </Card>

            <DashboardCharts />
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
        className="absolute top-24 left-14 -z-10 w-80"
      />
      <Image
        src={ghost}
        alt="ghost"
        className="absolute -top-16 transform -scale-x-100 -right-20 -z-30 w-80 -scale-1 "
      />
    </Tabs>
  );
}
