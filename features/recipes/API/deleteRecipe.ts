"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function deleteRecipeAction(formData: FormData) {
  const supabase = await createClient();

  const id = Number(formData.get("id")); 

  if (!id || isNaN(id)) {
    throw new Error("Invalid recipe ID");
  }

  const { error } = await supabase
    .from("recipes")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  redirect("/recipes"); 
}