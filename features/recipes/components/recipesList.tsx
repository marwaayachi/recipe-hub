

import { RecipeCardData } from "@/features/recipes/types/recipe";
import { RecipeCard } from "./RecipeCard";

type Props = {
  recipes: RecipeCardData[];
  variant?: "public" | "private";
};

export default function RecipesList({ recipes, variant = "public" }: Props) {
  return (
    <div className="mt-20">
      <div className="max-w-6xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} variant={variant} />
        ))}
      </div>
    </div>
  );
}
