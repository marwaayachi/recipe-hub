
import { supabase } from '@/lib/supabaseClient';
import { uploadImage } from '@/lib/storage';
import { recipeSchema } from '@/lib/validation/recipeSchema';
 
export async function createRecipe(formData: FormData) {

   const rawData = {
         title: formData.get("title"),
         description: formData.get("description"),
         categories: formData.get("categories"),
         ingredients: formData.get("ingredients"),
         instructions: formData.get("instructions"),
   };

   const result = recipeSchema.safeParse(rawData);

   if (!result.success) {
    // return errors to the form
      return { errors: result.error.flatten().fieldErrors };
   }

   const data = result.data;

   const ingredientsArray = data.ingredients
      .split(",")
      .map((i) => i.trim());

   const instructionsArray = data.instructions
      .split(",")
      .map((i) => i.trim());

 

   const file = formData.get("image") as File;

   const { imageUrl, error } = await uploadImage({
      file,
      bucket:"recipes-images",
      folder: "recipes"
   })
 
   if (error) {
         console.error(error);
         throw new Error("Image upload failed");
   }
  
        
   const {error: insertError } = await supabase.from("recipes").insert([
      {
         title: data.title,
         description: data.description,
         ingredients : ingredientsArray,
         instructions : instructionsArray,
         categories: data.categories, 
         image_url : imageUrl,
      }
   ])

   if (insertError) {
      throw new Error(insertError.message)
   }  
}