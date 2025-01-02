export interface ProgressData {
  date: string;
  sentiment: "up" | "down";
  progress: number;
}

export interface ProgressMetadata {
  startDate: string | null;
  endDate: string | null;
  totalDays: number;
  startValue: number;
  currentValue: number;
  totalGrowth: string;
}

export interface ProgressResponse {
  data: ProgressData[];
  metadata: ProgressMetadata;
}
