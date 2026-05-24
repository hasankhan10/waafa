import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Create Supabase Admin client using Service Role Key to bypass RLS policies
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    
    const { data, error } = await supabaseAdmin
      .from("orders")
      .insert([body])
      .select();
      
    if (error) {
      console.error("Server order insert error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    
    return NextResponse.json({ data });
  } catch (err: any) {
    console.error("API error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
