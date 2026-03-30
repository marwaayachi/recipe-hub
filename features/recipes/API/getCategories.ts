
import { supabase } from "@/lib/supabase/client";

export async function getCategories() {
    const { data, error } = await supabase
    .from("categories")
    .select("*");
    
  if (error) throw new Error(error.message);
   console.log("ERROR:", error);

  console.log("categories from API:", data);

  return data || [];
}