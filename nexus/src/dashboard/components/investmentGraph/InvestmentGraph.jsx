import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { name: "Jan", investment: 4000 },
  { name: "Feb", investment: 3000 },
  { name: "Mar", investment: 5000 },
  { name: "Apr", investment: 2000 },
  { name: "May", investment: 2780 },
  { name: "Jun", investment: 1890 },
];

export default function InvestmentGraph() {
  return (
    <div className="text-white bg-[#777f88] p-4 rounded-lg">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#aaa" />
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="investment"
            stroke="#fff"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
