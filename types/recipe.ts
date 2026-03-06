export type recipe_category = "Dessert"| "Vegetarian"| "Quick"| "Vegan"| "Drink";

export interface Recipe {
    id:number,
    title: string,
    image_url: string,
    description: string,
    ingredients:string[],
    instructions: string[],
    categories:recipe_category
}