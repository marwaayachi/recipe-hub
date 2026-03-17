"use client";

import { useState } from "react";
import Form from "next/form";
import CustomFileInput from "@/components/ui/CustomFileInput";

interface RecipeFormProps {
  initialValues?: {
    title?: string;
    description?: string;
    ingredients?: string;
    instructions?: string;
    categories?: string;
    image_url?: string;
  };
  onSubmit: (formData: FormData) => Promise<void>;
  submitLabel: string;
}

export default function RecipeForm({
  initialValues = {},
  onSubmit,
  submitLabel,
}: RecipeFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    initialValues.image_url || null,
  );
  const [fileError, setFileError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (formData: FormData) => {
    if (!selectedFile && !initialValues.image_url) {
      setFileError("Please select an image!");
      return;
    }

    if (selectedFile) formData.set("image", selectedFile);

    await onSubmit(formData);
  };

  return (
    <Form action={handleSubmit} className="flex flex-col gap-4">
      <input
        name="title"
        placeholder="Recipe title"
        defaultValue={initialValues.title}
        className="w-full p-3 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400"
        required
      />
      {errors?.title && <p className="text-red-500">{errors.title[0]}</p>}

      <textarea
        name="description"
        placeholder="Recipe description"
        defaultValue={initialValues.description}
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
        defaultValue={initialValues.ingredients}
        className="w-full p-3 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400"
        rows={3}
        required
      />
      {errors?.ingredients && (
        <p className="text-red-500">{errors.ingredients[0]}</p>
      )}

      <textarea
        name="instructions"
        placeholder="Example: Mix ingredients, Bake at 180C, Let cool"
        defaultValue={initialValues.instructions}
        className="w-full p-3 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400"
        rows={4}
        required
      />
      {errors?.instructions && (
        <p className="text-red-500">{errors.instructions[0]}</p>
      )}

      <select
        name="categories"
        defaultValue={initialValues.categories || ""}
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

      <button
        type="submit"
        className="mt-2 bg-red-500 hover:bg-red-600 transition-all duration-200 text-white font-semibold p-3 rounded-lg shadow-lg hover:scale-[1.02]"
      >
        {submitLabel}
      </button>
    </Form>
  );
}
