'use server';

import { uploadImageClient } from "@/lib/storage";
import { createClient } from "@/lib/supabase/server";
import { recipeSchema } from "@/lib/validation/recipeSchema";
import { redirect } from "next/navigation";


export async function getRecipeById(id: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("recipes")
    .select(`*,categories(id, name)`)
    .eq("id", id)
    .single();

  if (error)  throw new Error("Recipe ID is missing");
  console.log("ID:to crate", id);

  console.log("Recipe info:", data)

  return data;
}

export async function updateRecipe(id: number, formData: FormData) {
  const supabase = await createClient();

  const parsed = recipeSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    category_id: Number(formData.get("category_id")),
    ingredients: formData.get("ingredients"),
    instructions: formData.get("instructions"),
  });

   if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  const { title, description, category_id, ingredients, instructions } =
    parsed.data;

  const file = formData.get("image") as File;
  let image_url;

  if (file && file.size > 0) {
    image_url = await uploadImageClient(file);
  }

  const updateData: any = {
    title,
    description,
    category_id,
    ingredients,
    instructions,
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
  //redirect(`/recipes/${id}`);
}


