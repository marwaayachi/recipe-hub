export type recipe_category = "Dessert"| "Vegetarian"| "Quick"| "Vegan"| "Drink";

export type RecipeFormInput = {
  id: number;
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  categories: recipe_category;
  image: File;
};

export type cardData = {
  id: number;
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  categories: recipe_category;
  image_url: string;
}