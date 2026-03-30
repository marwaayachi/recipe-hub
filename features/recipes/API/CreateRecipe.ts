// 'use server';

// import { createClient } from '@/lib/supabase/server';
// import { getCurrentUser } from '@/features/auth/API/getCurrentUser';
// import { uploadImageClient } from '@/lib/storage';
// import { recipeSchema } from '@/features/recipes/validation/recipeSchema';


// export type FieldErrors = {
//   [key: string]: string[] | undefined;
// };

// export async function createRecipe(
//   prevState: { success?: true; errors?: FieldErrors },
//   formData: FormData
// ): Promise<{ success?: true; errors?: FieldErrors }>  {
    
//     const supabase = await createClient();
//     const user = await getCurrentUser();

//     if (!user) return { errors: { general: ["User not logged in"] } };

//   const parsed = recipeSchema.safeParse({
//       title: formData.get("title"),
//       description: formData.get("description"),
//       ingredients: formData.get("ingredients"),
//       instructions: formData.get("instructions"),
//       category_id: Number(formData.get("category_id")),
//   });

//   if (!parsed.success) {
//     return { errors: parsed.error.flatten().fieldErrors };
//   }

//   const { title, description, category_id, ingredients, instructions } = parsed.data;

//   const file = formData.get("image") as File;

//   if (!file) return { errors: { image: ["No file provided"] } };
  

//   // Upload image 
//   const image_url = await uploadImageClient(file);

//   // Insert recipe
//   const { error } = await supabase.from("recipes").insert([
//     {
//       title,
//       description,
//       image_url,
//       ingredients,
//       instructions,
//       user_id: user.id,
//       category_id,
      
//     }
//   ]);

//   if (error) return { errors: { general: [error.message] } };


//   return { success: true };
  
// }


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
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const { title, description, category_id, ingredients, instructions } =
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
      user_id: userData.user?.id,
      category_id,
    },
  ]);

  if (error) {
    return { errors: { general: [error.message] } };
  }

  return { success: true };
}