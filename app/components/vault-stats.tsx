import { Dot } from "lucide-react";
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

const data02 = [
  { name: "Curve", value: 30 },
  { name: "Uniswap", value: 30 },
  { name: "Balancer", value: 40 },
];

export default function VaultStats() {
  return (
    <>
      <div className="text-sm">Token Distribution Chart</div>

      <PieChart width={430} height={250}>
        <Pie
          data={data02}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={50}
          fill="#a074ff"
        />

        <Pie
          data={data02}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          fill="#8e59ff"
          label
        />
      </PieChart>
      <div className="text-sm flex items-center">
        Curve : 30% <Dot /> Uniswap : 30% <Dot /> Balancer : 40%
      </div>
    </>
  );
}
