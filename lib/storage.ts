import { supabase } from "./supabase/client";

export async function uploadImageClient(file: File, folder: string = "recipes") {
  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { data, error } = await supabase.storage.from("recipes-images").upload(filePath, file);
  console.log(data);

  if (error) throw error;

  const imageUrl = supabase.storage.from("recipes-images").getPublicUrl(filePath).data.publicUrl;
  return imageUrl;
}