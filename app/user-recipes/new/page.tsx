"use client";

import { useState } from "react";
import { createRecipe } from "../../../features/recipes/API/CreateRecipe";
import { useRouter } from "next/navigation";
import RecipeForm from "@/features/recipes/components/RecipeForm";
import Image from "next/image";
import { Category } from "@/features/recipes/types/recipe";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCategories } from "@/features/recipes/API/getCategories";

export default function NewRecipePage() {
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});
  const router = useRouter();

  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  })

 const mutation = useMutation({
   mutationFn: createRecipe,
   onSuccess: (result) => {
     if (result.success) {
       router.push("/user-recipes");
     } else {
       const normalizedErrors: Record<string, string[]> = {};
       Object.entries(result.errors || {}).forEach(([key, value]) => {
         normalizedErrors[key] = value || [];
       });
       setFormErrors(normalizedErrors);
     }
   },
 });

  const handleSubmit = async (formData: FormData) => {
    setFormErrors({});
    await mutation.mutateAsync(formData);
  };

    if (isLoading)
      return (
        <p className="text-white text-center mt-10">Loading categories...</p>
      );


  

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
        <RecipeForm
          onSubmit={handleSubmit}
          submitLabel="Create Recipe"
          categories={categories}
          errors={formErrors}
        />
      </div>
    </div>
  );
}
