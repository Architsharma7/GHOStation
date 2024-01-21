import {
  LineChart,
  Line,
  Pie,
  PieChart,
  XAxis,
  AreaChart,
  Area,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card } from "./ui/card";
import {
  getMarketReserveData,
  getGHOReserveData,
  getGHOUserData,
  getUserSummary,
  getUserSummaryHistory,
} from "@/utils/analytics";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import {
  availableBorrowsUSD,
  chartData,
  healthFactorData,
  totalBorrowsUSD,
  totalCollateralUSD,
} from "./charts-data";

// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     // pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     // pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     // pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     // pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     // pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     // pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     // pv: 4300,
//     amt: 2100,
//   },
// ];

export default function DashboardCharts() {
  // const { address, isConnecting, isDisconnected } = useAccount();
  const [userSummaryHistory, setUserSummaryHistory] = useState<any>(null);
  const [graphData, setGraphData] = useState<any>(null);

  const getUserHistory = async () => {
    try {
      if ("0x41D22F2e55BD7B6bbb16f82e852a58c36C5D5Cf8") {
        const data = await getUserSummaryHistory(
          "0x41D22F2e55BD7B6bbb16f82e852a58c36C5D5Cf8"
        );
        const transformedData = data.map((entry) => ({
          timestamp: new Date(entry.timestamp * 1000).toLocaleDateString(),
          healthFactor: parseFloat(entry.userSummary.healthFactor) / 1000,
          totalBorrowsUSD: parseFloat(entry.userSummary.totalBorrowsUSD),
          totalCollateralUSD: parseFloat(entry.userSummary.totalCollateralUSD),
          availableBorrowsUSD: parseFloat(
            entry.userSummary.availableBorrowsUSD
          ),
        }));
        console.log("transformedData", transformedData);
        setUserSummaryHistory(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const formattedData =
  //   userSummaryHistory &&
  //   userSummaryHistory.map((item: any) => ({
  //     name: item.timestamp,
  //     uv: item.healthFactor,
  //     pv: item.totalBorrowsUSD,
  //   }));

  // console.log("userSummaryHistory", formattedData);

  useEffect(() => {
    const getData = async () => {
      const data = await getUserHistory();
      // if (data !== null) {
      // setGraphData(data);
      // }
    };

    // Create individual datasets for each key
    const datasets =
      userSummaryHistory &&
      Object.keys(userSummaryHistory && userSummaryHistory[0]).map((key) => {
        return userSummaryHistory.map((item: any) => ({
          timestamp: item.timestamp,
          [key]: item[key],
        }));
      });

    setGraphData(datasets);

    getData();
  }, [userSummaryHistory]);

  return (
    <div className=" grid grid-cols-12 gap-10">
      <Card className=" col-span-6 bg-white flex items-center flex-wrap gap-10 w-fit rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] border-0 p-5  ">
        <div>
          <LineChart width={520} height={300} data={healthFactorData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="healthFactor" stroke="#8884d8" />
          </LineChart>
        </div>
      </Card>
      <Card className=" col-span-6 bg-white flex items-center flex-wrap gap-10 w-fit rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] border-0 p-5  ">
        <div>
          <LineChart width={520} height={300} data={totalBorrowsUSD}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="totalBorrowsUSD" stroke="#8884d8" />
          </LineChart>
        </div>
      </Card>
      <Card className="col-span-6 bg-white flex items-center flex-wrap gap-10 w-fit rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] border-0 p-5  ">
        <div>
          <LineChart width={520} height={300} data={totalCollateralUSD}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="totalCollateralUSD"
              stroke="#8884d8"
            />
          </LineChart>
        </div>
      </Card>
      <Card className="col-span-6 bg-white flex items-center flex-wrap gap-10 w-fit rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] border-0 p-5  ">
        <div>
          <LineChart width={520} height={300} data={availableBorrowsUSD}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="availableBorrowsUSD"
              stroke="#8884d8"
            />
          </LineChart>
        </div>
      </Card>
    </div>
  );
}
