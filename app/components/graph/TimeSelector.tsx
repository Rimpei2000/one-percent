export type TimePeriod = "1M" | "3M" | "6M" | "1Y" | "ALL";

interface TimeSelectorProps {
  selectedPeriod: TimePeriod;
  onChange: (period: TimePeriod) => void;
}

export function TimeSelector({ selectedPeriod, onChange }: TimeSelectorProps) {
  const periods: TimePeriod[] = ["1M", "3M", "6M", "1Y", "ALL"];

  return (
    <div className="inline-flex gap-1 p-1 bg-gray-100 rounded-full">
      {periods.map((period) => (
        <button
          key={period}
          onClick={() => onChange(period)}
          className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
            selectedPeriod === period
              ? "bg-white text-gray-800 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {period}
        </button>
      ))}
    </div>
  );
}
