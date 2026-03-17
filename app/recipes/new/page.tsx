"use client";

import { useActionState } from "react";
import { createRecipe } from "./action";
import { useRouter } from "next/navigation";
import RecipeForm from "@/components/RecipeForm";
import Image from "next/image";

export default function NewRecipePage() {
  const [state, formAction] = useActionState(createRecipe, { errors: {} });
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    await formAction(formData);
    if (state.success) router.push("/recipes");
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <Image
        src="/add-recipes-bg.jpg"
        alt="add recipe"
        fill
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 w-full max-w-xl px-6 py-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Create a Recipe
        </h1>
        <RecipeForm onSubmit={handleSubmit} submitLabel="Create Recipe" />
      </div>
    </div>
  );
}
