import { NextResponse } from "next/server";
import { createClient } from "../../../utils/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { sentiment } = await request.json();

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const date = new Date().toLocaleDateString();

    const { error } = await supabase.from("sentiments").upsert(
      {
        user_id: session.user.id,
        sentiment,
        date,
      },
      {
        onConflict: "user_id,date",
      }
    );

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving sentiment:", error);
    return NextResponse.json(
      { error: "Failed to save sentiment" },
      { status: 500 }
    );
  }
}
