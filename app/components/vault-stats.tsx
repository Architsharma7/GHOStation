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
  { name: "Dex C", value: 40 },
  { name: "Dex B", value: 24 },
  { name: "Dex C", value: 35 },
  { name: "Dex A", value: 11 },
];

export default function VaultStats() {
  return (
    <>
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
    </>
  );
}
