import { getCategories } from "@/features/recipes/API/getCategories";
import RecipesFilter from "@/features/recipes/components/RecipesFilter";
import { getRecipes } from "@/features/recipes/API/getRecipes";



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
