import { supabase } from "./supabaseClient";
import { Recipe } from "@/types/recipe";

export async function getRecipes(): Promise<Recipe[]> {
    const {data, error} = await supabase.from("recipes").select("*");
    console.log("Recipes :", JSON.stringify(data, null, 2));

    if (error) {
        console.error("Error fetching recipes:", error);
        return [];
    }

    return data as Recipe[];
}