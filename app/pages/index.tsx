import Image from "next/image";
import { Inter } from "next/font/google";
import { ConnectKitButton } from "connectkit";
import { useAccount, usePublicClient } from "wagmi";
import {
  getMarketReserveData,
  getGHOReserveData,
  getGHOUserData,
  getUserSummary,
  getUserSummaryHistory,
} from "@/utils/analytics";
import { useEffect, useState } from "react";
import { borrowGHO, repayGHO } from "@/utils/operations";
import { InterestRate } from "@aave/contract-helpers";
import DashboardTabs from "@/components/dashboard-tabs";
import { fetchUserTransactions } from "@/utils/transactions";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { CreateProposal } from "@/components/create-proposal";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [GHOMarketData, setGHOMarketData] = useState<any>(null);
  const [ghoReserveData, setGhoReserveData] = useState<any>(null);
  const [ghoUserData, setGhoUserData] = useState<any>(null);
  const [userSummary, setUserSummary] = useState<any>(null);
  const [graphData, setGraphData] = useState<any>(null);
  const provider = usePublicClient();
  const { address, isConnecting, isDisconnected } = useAccount();
  const [userSummaryHistory, setUserSummaryHistory] = useState<any>(null);

  const getGHOMarketData = async () => {
    try {
      const MarketData = await getMarketReserveData();
      const GHOMarketdata = MarketData.find(
        (token) => token.name === "Gho Token"
      );
      // console.log(GHOMarketdata);
      setGHOMarketData(GHOMarketdata);
    } catch (error) {
      console.log(error);
    }
  };

  const getGHOReserve = async () => {
    try {
      const data = await getGHOReserveData();
      // console.log(data);
      setGhoReserveData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = async () => {
    try {
      if (address) {
        const data = getGHOUserData(address);
        // console.log(data);
        setGhoUserData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUsersummary = async () => {
    try {
      if (address) {
        const timestamp = dayjs().unix();
        const data = await getUserSummary(address, timestamp);
        // console.log(data);
        setUserSummary(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="min-h-screen">
      <DashboardTabs />
      {/* <div className="space-x-4 ">
        <button onClick={() => getGHOMarketData()}>getMarketData</button>
        <button onClick={() => getGHOReserve()}>getGHOReserveData</button>
        <button onClick={() => getUserData()}>getGHOUserData</button>
        <button onClick={() => getUsersummary()}>getUserSummary</button>
        <button onClick={() => getUserHistory()}>getUserHistory</button>
        {address && <p>{address}</p>}

        <button
          onClick={() =>
            borrowGHO(
              address,
              "0.1",
              InterestRate.Stable,
              "0xdCA691FB9609aB814E59c62d70783da1c056A9b6"
            )
          }
        >
          borrow
        </button>
        <button onClick={() => repayGHO(address, "0.1", InterestRate.Stable)}>
          repay
        </button>
        <button onClick={() => fetchUserTransactions(address)}>
          get history
        </button>
      </div> */}
    </main>
  );
}
