import z from "zod";

export const recipeSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(10, "Description is too short"),
    categories: z.enum(["Dessert", "Vegetarian", "Quick", "Vegan", "Drink"]),
    ingredients: z
        .string()
        .refine((val) => val.includes(","), {
             message: "Ingredients must be separated by commas",
         }),
    instructions: z
        .string()
        .refine((val) => val.includes(","), {
            message: "Instructions must be separated by commas",
        }),
});
