import { supabase } from "../supabase/client";

export async function deleteImage(imageUrl:string) {
    if (!imageUrl) return;

    try {
        const urlWithoutQuery = imageUrl.split("?")[0];

        const parts = urlWithoutQuery.split("/recipes-images/");
        const filePath = parts[1];

        if (!filePath) return;

        const { error } = await supabase.storage
            .from("recipes-images")
            .remove([filePath]);

        if ( error ) {
            console.error("Error deleting image:", error.message);
        }
    } catch (err) {
        console.error("Unexpected delete error:", err);
    }
}