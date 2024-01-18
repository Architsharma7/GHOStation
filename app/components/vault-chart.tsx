import { Chart } from "react-google-charts";

export const data = [
  ["Token", "Distribution %"],
  ["Aave", 41],
  ["Uniswap", 10],
  ["Balancer", 25],
  ["xDEX", 24],
];

// export const data = [
//   ["Aave", 41],
//   ["Uniswap", 10],
//   ["Balancer", 25],
//   ["xDEX", 24],
// ];

export const options = {
  title: "My Daily Activities",
  is3D: true,
};

export default function ValutChart() {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}
