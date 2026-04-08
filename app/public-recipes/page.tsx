"use client";

import RecipesFilter from "@/features/recipes/components/RecipesFilter";
import { useCategories } from "@/features/recipes/hooks/useCategories";
import usePublicRecipes from "@/features/recipes/hooks/usePublicRecipes";

export default function PublicRecipesPage() {
  const { data: publicRecipes = [], isLoading: recipesLoading } = usePublicRecipes();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();

  if (recipesLoading || categoriesLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!publicRecipes.length)
    return <p className="text-center mt-40 font-bold text-3xl">No public recipes yet.</p>;

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <RecipesFilter recipes={publicRecipes} categories={categories} variant="public"/>
    </main>
  );
}
