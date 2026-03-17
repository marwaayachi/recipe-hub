'use server';

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";


export async function getRecipeById(id: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("id", id)
    .single();

  if (error)  throw new Error("Recipe ID is missing");
  console.log("ID:to crate", id);

  return data;
}

export async function updateRecipe(id: number, formData: FormData) {
    const supabase = await createClient();

    const title = formData.get("title");
    const description = formData.get("description");

    const { error } = await supabase
        .from("recipes")
        .update({title, description})
        .eq("id", id);

    if (error) throw new Error(error.message);
    console.log("ID to update:", id);

    redirect(`/recipes/${id}`);
}