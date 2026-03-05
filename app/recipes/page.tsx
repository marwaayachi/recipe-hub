"use client";

import { recipes } from "@/data/recipes";
import { RecipeCard } from "@/components/ui/RecipeCard";

export default function RecipesPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">All Recipes</h1>

      <div className="max-w-6xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </main>
  );
}
