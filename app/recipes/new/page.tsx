"use client";

import Form from "next/form";
import Image from "next/image";
import { useActionState, useState } from "react";
import CustomFileInput from "@/components/ui/CustomFileInput";
import { createRecipe } from "./action";
import { useRouter } from "next/navigation";


const initialState = { errors: {} };

export default function NewRecipePage() {
  const [state, formAction] = useActionState(createRecipe, initialState);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const router = useRouter();


 
  const handleSubmit = async (formData: FormData) => {
    if (!selectedFile) {
      setFileError("Please select an image !");
      return;
    }

    formData.set("image", selectedFile);
    await formAction(formData);
   if (state.success) {
    router.push("/recipes");
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
          {state.errors?.title && (
            <p className="text-red-500">{state.errors.title[0]}</p>
          )}
          <textarea
            name="description"
            placeholder="Recipe description"
            className="w-full p-3 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400"
            rows={3}
            required
          />
          {state.errors?.description && (
            <p className="text-red-500">{state.errors.description[0]}</p>
          )}

          <textarea
            name="ingredients"
            placeholder="Example: flour, sugar, eggs, butter"
            className="w-full p-3 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400"
            rows={3}
            required
          />
          {state.errors?.ingredients && (
            <p className="text-red-500">{state.errors.ingredients[0]}</p>
          )}

          <textarea
            name="instructions"
            placeholder="Example: Mix ingredients, Bake at 180C, Let cool"
            className="w-full p-3 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400"
            rows={4}
            required
          />
          {state.errors?.instructions && (
            <p className="text-red-500">{state.errors.instructions[0]}</p>
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

          <CustomFileInput
            name="image"
            onFileSelect={(file) => {
              setSelectedFile(file);
              setPreview(URL.createObjectURL(file));
              setFileError(null);
            }}
          />
          {fileError && <p className="text-red-500">{fileError}</p>}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg mt-2 text-center"
            />
          )}

          {fileError && <p className="text-red-500">{fileError}</p>}
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

}
