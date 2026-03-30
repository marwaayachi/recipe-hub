import { supabase } from "@/lib/supabase/client";
import { RecipeCardData } from "../types/recipe";


export async function getRecipes(): Promise<RecipeCardData[]> {
  const { data, error } = await supabase
    .from("recipes")
    .select(`
      id,
      title,
      description,
      image_url,
      categories(
        id,
        name
      )
    `);
  
  if (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }

  

  return (data ?? []) as RecipeCardData[];
}