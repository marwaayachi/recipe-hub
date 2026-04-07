'use server';

import { uploadImageClient } from "@/lib/storage/uploadImage";
import { createClient } from "@/lib/supabase/server";
import { recipeSchema } from "@/features/recipes/validation/recipeSchema";
import { UpdateRecipeInput } from "../types/recipe";
import { deleteImage } from "@/lib/storage/deleteImage";



export async function updateRecipe(id: number, formData: FormData) {
   const supabase = await createClient();

  const parsed = recipeSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    category_id: Number(formData.get("category_id")),
    ingredients: formData.get("ingredients"),
    instructions: formData.get("instructions"),
    is_public: formData.get("is_public"),
  });

   if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  const { title, description, category_id, ingredients, instructions, is_public } = parsed.data;

  const file = formData.get("image") as File;
  let image_url;

  const { data: oldRecipe, error: fetchError } = await supabase
    .from("recipes")
    .select("image_url")
    .eq("id", id)
    .single();


  if (fetchError) {
    return { success: false, errors: { form: [fetchError.message] } };
  }


  if (file && file.size > 0) {
    if (oldRecipe?.image_url) {
      await deleteImage(oldRecipe.image_url);
    }

    image_url = await uploadImageClient(file);
  }

 const updateData: Partial<UpdateRecipeInput> = {
    title,
    description,
    category_id,
    ingredients,
    instructions,
    is_public,
  };


  if (image_url) {
    updateData.image_url = image_url;
  }


  const { error } = await supabase
    .from("recipes")
    .update(updateData)
    .eq("id", id);

  if (error) return { success: false, errors: { form: [error.message] } };
  return { success: true }; 

}


