'use server';

import { createClient } from "@/lib/supabase/server";
import { RecipeCardData } from "../types/recipe";

import { getCurrentUser } from "@/features/auth/API/getCurrentUser";


export async function getRecipes(): Promise<RecipeCardData[]> {
  const supabase = await createClient();
  const user = await getCurrentUser();

  if (!user) throw new Error("User not logged in");

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
  .eq("user_id", user.id);

  if (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }

  

  return (data ?? []) as RecipeCardData[];
}