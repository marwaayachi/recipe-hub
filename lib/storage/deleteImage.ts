import { createClient } from "../supabase/server";

export async function deleteImage(imageUrl: string) {
  const supabase = await createClient();

  if (!imageUrl) return;

  try {
    const url = new URL(imageUrl);

    // Extract path AFTER /object/public/recipes-images/
    const filePath = url.pathname.split("/object/public/recipes-images/")[1];
    

    if (!filePath) {
      console.error("No file path extracted");
      return;
    }

    await supabase.storage
      .from("recipes-images")
      .remove([filePath]);
    

  } catch (err) {
    console.error("Unexpected delete error:", err);
  }
}