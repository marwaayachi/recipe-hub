import z from "zod";

export const recipeSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),

  description: z.string().min(10, "Description is too short"),

  category_id: z.coerce.number(),
  
  ingredients: z
    .string()
    .transform((val) => val.split(",").map((i) => i.trim()))
    .refine((arr) => arr.length >= 2, {
      message: "Add at least two ingredients separated by commas",
    }),

  instructions: z
    .string()
    .transform((val) => val.split(",").map((i) => i.trim()))
    .refine((arr) => arr.length >= 2, {
      message: "Add at least two steps separated by commas",
    }),

    is_public: z
      .preprocess((val) => {
        if (val === "on") return true;
        if (val === undefined) return false;
        return Boolean(val);
      }, z.boolean())
      .default(false),
});