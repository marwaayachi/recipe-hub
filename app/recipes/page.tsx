"use client";

import RecipesFilter from "@/features/recipes/components/RecipesFilter";
import { useRecipes } from "@/features/recipes/hooks/useRecipes";
import { useCategories } from "@/features/recipes/hooks/useCategories";

export default function RecipesPage() {
  const { data: recipes = [], isLoading: recipesLoading } = useRecipes();
  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories();

  if (recipesLoading || categoriesLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <RecipesFilter recipes={recipes} categories={categories} />
    </main>
  );
}
