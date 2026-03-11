"use client";

import Form from "next/form";
import Image from "next/image";
import { useState } from "react";
import { redirect } from "next/navigation";

import { createRecipe } from "./action";
import CustomFileInput from "@/components/ui/CustomFileInput";

type FieldErrors = {
  [key: string]: string[] | undefined;
};

export default function NewRecipePage() {
  const [errors, setErrors] = useState<FieldErrors>({});


  const handleSubmit = async (formData: FormData) => {
    const res = await createRecipe(formData);

    if (res?.errors) {
      setErrors(res.errors);
    } else {
       redirect(`/recipes`);
    }
  }

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <Image
        src="/add-recipes-bg.jpg"
        alt="add recipe"
        fill
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 w-full max-w-xl px-6 py-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Create a Recipe
        </h1>

        <Form action={handleSubmit} className="flex flex-col gap-4">
          <input
            name="title"
            placeholder="Recipe title"
            className="w-full p-3 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />
          {errors?.title && <p className="text-red-500">{errors.title[0]}</p>}

          <textarea
            name="description"
            placeholder="Recipe description"
            className="w-full p-3 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400"
            rows={3}
            required
          />
          {errors?.description && (
            <p className="text-red-500">{errors.description[0]}</p>
          )}

          <textarea
            name="ingredients"
            placeholder="Example: flour, sugar, eggs, butter"
            className="w-full p-3 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400"
            rows={3}
            required
          />
          {errors.ingredients && (
            <p className="text-red-500">{errors.ingredients[0]}</p>
          )}

          <textarea
            name="instructions"
            placeholder="Example: Mix ingredients, Bake at 180C, Let cool"
            className="w-full p-3 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400"
            rows={4}
            required
          />
          {errors.instructions && (
            <p className="text-red-500">{errors.instructions[0]}</p>
          )}

          <select
            name="categories"
            className="w-full p-3 rounded-lg bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          >
            <option value="">Select category</option>
            <option value="Dessert">Dessert</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Quick">Quick</option>
            <option value="Vegan">Vegan</option>
            <option value="Drink">Drink</option>
          </select>

          <CustomFileInput name="image" />

          <button
            type="submit"
            className="mt-2 bg-red-500 hover:bg-red-600 transition-all duration-200 text-white font-semibold p-3 rounded-lg shadow-lg hover:scale-[1.02]"
          >
            Create Recipe
          </button>
        </Form>
      </div>
    </div>
  );
}
