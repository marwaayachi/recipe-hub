import { supabase } from "@/lib/supabase/client";
import { recipeSchema } from "@/features/recipes/validation/recipeSchema";
import { uploadImageClient } from "@/lib/storage/uploadImage";



export async function createRecipe(formData: FormData) {
  // 1. Validate
  const parsed = recipeSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    ingredients: formData.get("ingredients"),
    instructions: formData.get("instructions"),
    category_id: Number(formData.get("category_id")),
    is_public: formData.get("is_public"),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const { title, description, category_id, ingredients, instructions, is_public } =
    parsed.data;

  // 2. Image
  const file = formData.get("image") as File;
  if (!file) {
    return { errors: { image: ["Please select an image"] } };
  }

  const image_url = await uploadImageClient(file);

  // 3. Insert
  const { data: userData } = await supabase.auth.getUser();

  const { error } = await supabase.from("recipes").insert([
    {
      title,
      description,
      image_url,
      ingredients,
      instructions,
      category_id,
      is_public,
      user_id: userData.user?.id,
    },
  ]);

  if (error) {
    return { errors: { general: [error.message] } };
  }

  return { success: true };
}