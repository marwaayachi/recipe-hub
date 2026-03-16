export type recipe_category = "Dessert"| "Vegetarian"| "Quick"| "Vegan"| "Drink";

export type RecipeFormInput = {
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  categories: recipe_category;
  image: File;
};