import { TooltipProps } from "recharts";
import { ProgressData } from "../../../types/graph";

export function CustomTooltip({
  active,
  payload,
}: TooltipProps<number, string>) {
  if (!(active && payload && payload.length)) {
    return null;
  }

  const data = payload[0]?.payload as ProgressData;
  const date = new Date(data.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-100">
      <p className="text-gray-600">{date}</p>
      <p className="font-medium">Level: {data.progress.toFixed(4)}</p>
    </div>
  );
}
