export type recipeTag = "Dessert"| "Vegetarian"| "Quick"| "Vegan"| "Drink";

export interface Recipe {
    id:string,
    title: string,
    image_url: string,
    description: string,
    ingredients:string[],
    instructions: string[],
    categories:recipeTag[],
    author_id: string
}