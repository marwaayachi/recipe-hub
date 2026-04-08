"use client";

import RecipesFilter from "@/features/recipes/components/RecipesFilter";
import { useUserRecipes } from "@/features/recipes/hooks/useUserRecipes";
import { useCategories } from "@/features/recipes/hooks/useCategories";

export default function RecipesPage() {
  const { data: recipes = [], isLoading: recipesLoading } = useUserRecipes();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();

  if (recipesLoading || categoriesLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <RecipesFilter recipes={recipes} categories={categories} variant="private"/>
    </main>
  );
}
