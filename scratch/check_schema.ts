import { supabase } from "../lib/supabase";

async function checkSchema() {
  const { data, error } = await supabase.from('orders').select('*').limit(1);
  if (error) {
    console.error("Error fetching orders:", error.message);
  } else {
    console.log("Orders sample data:", data);
  }
}

checkSchema();
