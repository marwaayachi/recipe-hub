

import { getRecipes } from "@/lib/recipesApi";
import { getCategories } from "@/lib/API/recipes/getCategories";
import RecipesFilter from "@/components/RecipesFilter";



export default async function RecipesPage() {
  const recipes = await getRecipes();
  const categories = await getCategories()
  console.log("recipes", recipes)

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <RecipesFilter recipes={recipes} categories={categories}/>
    </main>
  );
}
