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