'use client';

import { Category, RecipeCardData } from "@/features/recipes/types/recipe";
import CategorySelect from "./CategorySelect";
import RecipesList from "./recipesList";
import { useState } from "react";


interface Props {
    recipes: RecipeCardData[];
    categories: Category[];
}
export default function RecipesFilter({ recipes, categories }: Props) {

    const [selectedCategory, setSelectedCategory] = useState<number | "">("");

    const filteredRecipes = 
        selectedCategory === ""
        ? recipes
        : recipes.filter((r) => r.categories?.id === selectedCategory);
  return (
    <div className="max-w-6xl mx-auto mt-25 flex flex-col gap-6">
    
      <CategorySelect
        categories={categories}
        selectedCategory={selectedCategory}
        onChange={setSelectedCategory}
      />

     
      {filteredRecipes.length > 0 ? (
        <RecipesList recipes={filteredRecipes} />
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">
          No recipes found for this category.
        </p>
      )}
    </div>
  );
}