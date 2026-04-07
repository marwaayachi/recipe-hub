'use server';

import { createClient } from "../supabase/server";

export async function uploadImageClient(file: File, folder: string = "recipes") {
  const supabase = await createClient();

   const { data: { user } }  = await supabase.auth.getUser();

   if (!user) throw new Error("User not logged in");

  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { error } = await supabase
  .storage.from("recipes-images")
  .upload(filePath, file, { metadata: { owner: user.id } });


  if (error) throw error;

  const imageUrl = supabase.storage.from("recipes-images").getPublicUrl(filePath).data.publicUrl;
  return imageUrl;
}