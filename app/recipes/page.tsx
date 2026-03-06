import { getRecipes } from "@/lib/recipesApi";
import RecipesList from "@/components/ui/recipesList";


export default async function RecipesPage() {
  const recipesPromise = getRecipes();

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <RecipesList recipesPromise={recipesPromise}/>
    </main>
  );
}
