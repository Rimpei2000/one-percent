import { ProgressData } from "../types/graph";

export function generateTestData(): ProgressData[] {
  const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  const generateRandomSentiment = (): "up" | "down" => {
    return Math.random() < 0.6 ? "up" : "down";
  };

  const data: ProgressData[] = [];
  let currentProgress = 1;

  const startDate = new Date("2024-07-01");
  const endDate = new Date();
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const sentiment = generateRandomSentiment();

    currentProgress *= sentiment === "up" ? 1.01 : 0.99;

    data.push({
      date: formatDate(currentDate),
      sentiment,
      progress: Math.round(currentProgress * 10000) / 10000,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
}
