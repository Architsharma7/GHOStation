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

const data02 = [
  { name: "Dex C", value: 40 },
  { name: "Dex B", value: 24 },
  { name: "Dex C", value: 35 },
  { name: "Dex A", value: 11 },
];

const data = [
  {
    name: "Page A",
    uv: 4000,
    // pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    // pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    // pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    // pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    // pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    // pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    // pv: 4300,
    amt: 2100,
  },
];

export default function DashboardCharts() {
  return (
    <Card className="  bg-white  w-fit rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] border-0 p-5  ">  
      <AreaChart
        width={630}
        height={300}
        data={data}
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
      </AreaChart>
    </Card>
  );
}
