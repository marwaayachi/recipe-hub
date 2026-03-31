"use client";

import { useState } from "react";
import CustomFileInput from "@/components/ui/CustomFileInput";
import { RecipeFormInput } from "@/features/recipes/types/recipe";
import { Category } from "@/features/recipes/types/recipe";

interface RecipeFormProps {
  categories: Category[];
  initialValues?: Partial<RecipeFormInput>;
  onSubmit: (formData: FormData) => Promise<void>;
  submitLabel: string;
  errors?: Record<string, string[]>;
}

export default function RecipeForm({
  categories,
  initialValues = {},
  onSubmit,
  submitLabel,
  errors = {},
}: RecipeFormProps) {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    initialValues.image_url || null,
  );

  const [fileError, setFileError] = useState<string | null>(null);


  const handleSubmit = async (formData: FormData) => {
    if (!selectedFile && !initialValues.image_url) {
      setFileError("Please select an image!");
      return;
    }

    if (selectedFile) formData.set("image", selectedFile);

    await onSubmit(formData);
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        await handleSubmit(formData);
      }}
      className="flex flex-col gap-4"
    >
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
        name="category_id"
        defaultValue={initialValues.category_id?.toString() || ""}
        className="w-full p-3 rounded-lg bg-white/90 text-gray-800"
        required
      >
        <option value="">Select category</option>

        {categories.map((cat) => (
          <option key={cat.id} value={cat.id.toString()}>
            {cat.name}
          </option>
        ))}
      </select>
      {errors?.category_id && (
        <p className="text-red-500">{errors.category_id[0]}</p>
      )}

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
    </form>
  );
}
