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
    <Card className="  bg-white flex items-center flex-wrap gap-10 w-fit rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] border-0 p-5  ">
      {graphData &&
        graphData.map(
          (data, index) =>
            data && (
              <LineChart
                key={index}
                width={630}
                height={300}
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey={Object.keys(data[0])[1]}
                  stroke="#8884d8"
                  name={Object.keys(data[0])[1]}
                />
              </LineChart>
            )
        )}

      {/* <LineChart
        width={730}
        height={250}
        // data={formattedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart> */}
      {/* <AreaChart
        width={630}
        height={300}
        data={formattedData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="uv"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey="pv"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart> */}
    </Card>
  );
}
