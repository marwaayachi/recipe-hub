export const recipeCategories = ["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan", "Quick", "Drink"];
export type RecipeCategory = (typeof recipeCategories)[number]

export type Category = {
  id: number;
  name: string;
};

export type Recipe = {
  id: number;
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  category_id: number;
  categories?: Category;
  image_url: string;
  is_public?: boolean;
};

export type RecipeCardData = {
  id: number;
  title: string;
  description: string;
  categories: Category | null;
  image_url: string;
};

export type RecipeFormInput = {
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  category_id: number;
  image_url?: string;
  is_public?: boolean;
};


export type UpdateRecipeInput = {
  title: string;
  description: string;
  category_id: number;
  ingredients: string[];
  instructions: string[];
  image_url?: string;
  is_public: boolean;
};