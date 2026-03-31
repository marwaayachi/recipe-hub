import { supabase } from "@/lib/supabase/client";
import { RecipeCardData } from "../types/recipe";

export default async function getPublicRecipes(): Promise<RecipeCardData[]>{
    const { data, error } = await supabase
        .from("recipes")
        .select(`
            id,
            title,
            description,
            image_url,
            is_public,
            categories(id, name)
        `)
        .eq("is_public", true);

        if ( error ) {
            console.error("Error fetching public recipes:", error);
            return [];
        }

        return (data ?? []) as RecipeCardData[];
}