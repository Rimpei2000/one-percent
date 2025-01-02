"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Chart } from "../components/graph/Chart";
import { TimeSelector, TimePeriod } from "@/components/graph/TimeSelector";
import { filterDataByPeriod } from "../../utils/dataFilter";
import { ProgressData, ProgressResponse } from "../../types/graph";

const DynamicChart = dynamic(() => Promise.resolve(Chart), {
  ssr: false,
});

export default function GraphPage() {
  const [progressData, setProgressData] = useState<ProgressData[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("ALL");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/graph");
        const { data } = (await response.json()) as ProgressResponse;
        const dataWithTime = data.map((item) => ({
          ...item,
          date: new Date(`${item.date}T00:00:00`).toISOString(),
        }));
        setProgressData(dataWithTime);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = filterDataByPeriod(progressData, selectedPeriod);
  const growth = (
    (filteredData[filteredData.length - 1]?.progress /
      filteredData[0]?.progress) *
      100 -
    100
  ).toFixed(2);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        {isLoading ? (
          <div className="h-[400px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Growth Journey
              </h2>
              {filteredData.length > 0 && (
                <div className="text-2xl font-bold text-custom-green">
                  {!growth.startsWith("-") && "+"}
                  {growth}%
                </div>
              )}
            </div>
            <DynamicChart data={filteredData} />
            <div className="flex justify-center">
              <TimeSelector
                selectedPeriod={selectedPeriod}
                onChange={setSelectedPeriod}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
