"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";

import RecipeForm from "@/features/recipes/components/RecipeForm";
import { getRecipeById } from "@/features/recipes/API/getRecipeByID";
import { updateRecipe } from "@/features/recipes/API/updateRecipe";
import { useCategories } from "@/features/recipes/hooks/useCategories";
import { Recipe } from "@/features/recipes/types/recipe";

type Props = {
   id: string;
};

export default function EditRecipePage({ id }: Props) {
  const numericId = Number(id);
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});
  const router = useRouter();

  // Fetch recipe
  const {
    data: recipe,
    isLoading: recipeLoading,
    isError,
    error,
  } = useQuery<Recipe>({
    queryKey: ["userRecipe", numericId],
    queryFn: () => getRecipeById(numericId),
  });

  // Fetch categories
 const { data: categories = [], isLoading: categoriesLoading } = useCategories();

  // Mutation for updating recipe
  const mutation = useMutation({
    mutationFn: (formData: FormData) => updateRecipe(numericId, formData),

    onSuccess: (result) => {
      if (result.success) {
        router.push(`/user-recipes/${numericId}`);
      }
    },
  });

  if (recipeLoading || categoriesLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (isError) {
    return <p>Error: {(error as Error).message}</p>;
  }

  const handleSubmit = async (formData: FormData) => {
    setFormErrors({});

    const result = await mutation.mutateAsync(formData);

    if (!result.success) {
      const normalizedErrors: Record<string, string[]> = {};
      Object.entries(result.errors || {}).forEach(([key, value]) => {
        normalizedErrors[key] = value || [];
      });
      setFormErrors(normalizedErrors);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gray-100">
      <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-pink-400 to-purple-500 opacity-20" />

      <div className="relative z-10 w-full max-w-2xl px-8 py-10 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
          Edit Recipe
        </h1>

        <RecipeForm
          initialValues={recipe!}
          onSubmit={handleSubmit}
          submitLabel="Update Recipe"
          categories={categories || []}
          errors={formErrors}
        />

        {recipe?.image_url && (
          <div className="mt-6 flex flex-col items-center">
            <span className="text-gray-600 mb-2 font-medium">
              Current Image:
            </span>
            <img
              src={recipe.image_url}
              alt={recipe.title}
              className="w-48 h-48 object-cover rounded-xl border border-gray-300 shadow-md"
            />
          </div>
        )}
      </div>
    </div>
  );
}
