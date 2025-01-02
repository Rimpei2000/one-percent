import { NextResponse } from "next/server";
import { createClient } from "../../../utils/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("sentiments")
      .select("date, sentiment")
      .eq("user_id", session.user.id)
      .order("date", { ascending: true });

    if (error) throw error;

    let currentProgress = 1;
    const progressData = data.map((entry) => {
      currentProgress =
        entry.sentiment === "up"
          ? currentProgress * 1.01
          : currentProgress * 0.99;

      return {
        date: entry.date,
        sentiment: entry.sentiment,
        progress: Math.round(currentProgress * 10000) / 10000,
      };
    });
    const totalGrowthPercentage = ((currentProgress - 1) * 100).toFixed(2);

    const response = {
      data: progressData,
      metadata: {
        startDate: data[0]?.date || null,
        endDate: data[data.length - 1]?.date || null,
        totalDays: data.length,
        startValue: 1,
        currentValue: Math.round(currentProgress * 10000) / 10000,
        totalGrowth: totalGrowthPercentage,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json(
      { error: "Failed to fetch progress data" },
      { status: 500 }
    );
  }
}

// import { generateTestData } from "../../../utils/generateTestData";

// export async function GET() {
//   try {
//     // Generate test data
//     const data = generateTestData();

//     // Calculate metadata
//     const lastEntry = data[data.length - 1];
//     const metadata = {
//       startDate: data[0].date,
//       endDate: lastEntry.date,
//       totalDays: data.length,
//       startValue: 1,
//       currentValue: lastEntry.progress,
//       totalGrowth: ((lastEntry.progress - 1) * 100).toFixed(2),
//     };

//     return NextResponse.json({
//       data,
//       metadata,
//     });
//   } catch (error) {
//     console.error("Error generating test data:", error);
//     return NextResponse.json(
//       { error: "Failed to generate test data" },
//       { status: 500 }
//     );
//   }
// }
