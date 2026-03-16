'use server';

import { createClient } from "./supabase/server";
import { Recipe } from "@/types/recipe";
import { getCurrentUser } from "@/app/user/action";

export async function getRecipes(): Promise<Recipe[]> {
    const supabase = await createClient();
    const user = await getCurrentUser();
    if (!user) throw new Error("User not logged in");
 
    const {data, error} = await supabase.from("recipes").select("*").eq("user_id", user.id);
    console.log("Recipes :", JSON.stringify(data, null, 2));

    if (error) {
        console.error("Error fetching recipes:", error);
        return [];
    }

    return data as Recipe[];
}