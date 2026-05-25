import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Helper to create Supabase Admin client
const getSupabaseAdmin = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supabaseAdmin = getSupabaseAdmin();
    
    // If user_id is provided, make sure a corresponding profile exists to prevent foreign key violations
    if (body.user_id) {
      const { data: existingProfile, error: profileCheckError } = await supabaseAdmin
        .from("profiles")
        .select("id")
        .eq("id", body.user_id)
        .maybeSingle();

      if (profileCheckError) {
        console.error("Profile check error:", profileCheckError.message);
      }

      if (!existingProfile) {
        console.log(`Profile for user ${body.user_id} not found. Auto-creating a profile record...`);
        const { error: profileInsertError } = await supabaseAdmin
          .from("profiles")
          .insert([
            {
              id: body.user_id,
              full_name: body.shipping_address?.full_name || "New Client",
              email: body.shipping_address?.email || "",
              tier: "Silver"
            }
          ]);
        
          if (profileInsertError) {
            console.error("Auto-creation of profile failed:", profileInsertError.message);
          } else {
            console.log(`Profile row successfully created for user ${body.user_id}`);
          }
      }
    }
    
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

export async function GET() {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    
    const { data, error } = await supabaseAdmin
      .from("orders")
      .select(`
        *,
        profiles (
          full_name
        )
      `)
      .order("created_at", { ascending: false });
      
    if (error) {
      console.error("Server order fetch error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    
    return NextResponse.json({ data });
  } catch (err: any) {
    console.error("API GET error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    
    if (!id || !status) {
      return NextResponse.json({ error: "Missing order ID or status" }, { status: 400 });
    }
    
    const supabaseAdmin = getSupabaseAdmin();
    
    const { data, error } = await supabaseAdmin
      .from("orders")
      .update({ status })
      .eq("id", id)
      .select();
      
    if (error) {
      console.error("Server order status update error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    
    return NextResponse.json({ data: data?.[0] || null });
  } catch (err: any) {
    console.error("API PATCH error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

