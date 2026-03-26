import { createClient } from "@/lib/supabase/server";

export async function getRecipeById(id: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("recipes")
    .select(`*,categories(id, name)`)
    .eq("id", id)
    .single();

  if (error)  throw new Error("Recipe ID is missing");
  console.log("ID:to crate", id);

  console.log("Recipe info:", data)

  return data;
}