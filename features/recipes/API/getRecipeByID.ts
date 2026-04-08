import { supabase } from "@/lib/supabase/client";

export async function getRecipeById(id: number) {

  if (!id || isNaN(id)) {
    throw new Error("Invalid recipe ID");
  }

  const { data, error } = await supabase
    .from("recipes")
    .select(`*, categories(id, name)`)
    .eq("id", id)
    .maybeSingle(); 

  if (error) {
    throw new Error(error.message);
  }
  if (!data) {
    throw new Error("Recipe not found"); 
  }



  return data;
}