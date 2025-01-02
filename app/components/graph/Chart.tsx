import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CustomTooltip } from "./CustomTooltip";
import { ProgressData } from "../../../types/graph";

interface ChartProps {
  data: ProgressData[];
}

export function Chart({ data }: ChartProps) {
  if (!data.length) return null;

  const minValue = Math.min(...data.map((d) => d.progress));
  const maxValue = Math.max(...data.map((d) => d.progress));
  const padding = (maxValue - minValue) * 0.1;

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={false}
          />
          <YAxis
            domain={[minValue - padding, maxValue + padding]}
            axisLine={false}
            tickLine={false}
            tick={false}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "#888", strokeWidth: 1, strokeDasharray: "5 5" }}
          />
          <Line
            type="monotone"
            dataKey="progress"
            stroke="#5C8145"
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 6,
              fill: "#5C8145",
              stroke: "#fff",
              strokeWidth: 2,
            }}
            fill="#4ade8020"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
