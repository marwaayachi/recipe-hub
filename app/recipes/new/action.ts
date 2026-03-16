'use server';

import { createClient } from '@/lib/supabase/server';
import { getCurrentUser } from '@/app/user/action';
import { recipe_category } from '@/types/recipe';
import { uploadImageClient } from '@/lib/storage';
import { recipeSchema } from '@/lib/validation/recipeSchema';
import { redirect } from 'next/dist/server/api-utils';


export type FieldErrors = {
  [key: string]: string[] | undefined;
};

export async function createRecipe(
  prevState: { success?: true; errors?: FieldErrors },
  formData: FormData
): Promise<{ success?: true; errors?: FieldErrors }>  {
    
    const supabase = await createClient();
    const user = await getCurrentUser();

    if (!user) return { errors: { general: ["User not logged in"] } };

  const parsed = recipeSchema.safeParse({
      title: formData.get("title"),
      description: formData.get("description"),
      categories: formData.get("categories"),
      ingredients: formData.get("ingredients"),
      instructions: formData.get("instructions"),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const { title, description, categories, ingredients, instructions } = parsed.data;

  const file = formData.get("image") as File;

  if (!file) return { errors: { image: ["No file provided"] } };
  

  // Upload image 
  const image_url = await uploadImageClient(file);

  // Insert recipe
  const { error } = await supabase.from("recipes").insert([
    {
      title,
      description,
      categories,
      ingredients,
      instructions,
      image_url,
      user_id: user.id
    }
  ]);

  if (error) return { errors: { general: [error.message] } };


  return { success: true };
  
}
