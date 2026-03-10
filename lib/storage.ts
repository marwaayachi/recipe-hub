import { supabase } from "./supabaseClient";
import imageCompression from "browser-image-compression";
import { v4 as uuidv4 } from "uuid";

type UploadProps = {
    file: File;
    bucket : string;
    folder? : string;
};

export async function uploadImage({file, bucket, folder} : UploadProps) {
    try {
        // Compress image
        const compressedFile = await imageCompression(file, {
            maxSizeMB: 1,
        });

        // create unique filename
        const fileExt = file.name.split(".").pop();
        const fileName = `${uuidv4()}.${fileExt}`;

        // build storage path
        const filePath = folder ? `${folder}/${fileName}` : fileName;

        // upload to Supabase Storage
        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(filePath, compressedFile);

        if (error) {
             console.error("Upload error:", error);
            return { imageUrl: "", error: error.message };
        }

        // build public url
        const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${data.path}`;

        return {imageUrl, error:""};
    } catch (error) {
         console.error("Image upload failed:", error);
         return { imageUrl: "", error: "Image upload failed" };
    }
}




