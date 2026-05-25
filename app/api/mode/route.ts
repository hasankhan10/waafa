import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Helper to create Supabase Admin client
const getSupabaseAdmin = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
};

// GET current website mode
export async function GET() {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    
    const { data, error } = await supabaseAdmin
      .from("site_settings")
      .select("value")
      .eq("key", "website-mode")
      .maybeSingle();

    if (error) {
      console.warn("DB settings fetch error (falling back to live):", error.message);
      return NextResponse.json({ mode: "live" });
    }

    return NextResponse.json({ mode: data?.value || "live" });
  } catch (err: any) {
    console.error("API GET Mode error:", err.message);
    return NextResponse.json({ mode: "live" });
  }
}

// POST/UPDATE website mode
export async function POST(request: Request) {
  try {
    const { mode } = await request.json();

    if (mode !== "live" && mode !== "development") {
      return NextResponse.json({ error: "Invalid mode specified" }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();

    const { data, error } = await supabaseAdmin
      .from("site_settings")
      .upsert({ key: "website-mode", value: mode })
      .select();

    if (error) {
      console.error("DB settings update error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("API POST Mode error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
