import { ProgressData } from "../types/graph";
import { TimePeriod } from "@/components/graph/TimeSelector";

export function filterDataByPeriod(
  data: ProgressData[],
  period: TimePeriod
): ProgressData[] {
  const now = new Date();
  const startDate = new Date();

  switch (period) {
    case "1M":
      startDate.setMonth(now.getMonth() - 1);
      break;
    case "3M":
      startDate.setMonth(now.getMonth() - 3);
      break;
    case "6M":
      startDate.setMonth(now.getMonth() - 6);
      break;
    case "1Y":
      startDate.setFullYear(now.getFullYear() - 1);
      break;
    default:
      return data;
  }

  return data.filter((item) => new Date(item.date) >= startDate);
}
