"use server";

import { deleteImage } from "@/lib/storage/deleteImage";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function deleteRecipeAction(formData: FormData) {
  const supabase = await createClient();

  const id = Number(formData.get("id")); 

  if (!id || isNaN(id)) {
    throw new Error("Invalid recipe ID");
  }

    // fetch the image URL before deleting the recipe
  const { data: recipe, error: fetchError } = await supabase
    .from("recipes")
    .select("image_url")
    .eq("id", id)
    .single();

  if (fetchError) throw new Error(fetchError.message);

  if (recipe?.image_url) {
    await deleteImage(recipe.image_url); // delete old image
  }

  const { error } = await supabase
    .from("recipes")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  redirect("/user-recipes"); 
}

