import { supabase } from "@/lib/supabase/client";
import { RecipeCardData } from "../types/recipe";


export async function getUserRecipes(userId:string): Promise<RecipeCardData[]> {
 
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
    `)
    .eq("user_id", userId);
  
  if (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }

  

  return (data ?? []).map((recipe: any) => ({
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      image_url: recipe.image_url,
      categories: recipe.categories
        ? {
            id: Number(recipe.categories.id),
            name: String(recipe.categories.name),
          }
        : null,
  }));
}