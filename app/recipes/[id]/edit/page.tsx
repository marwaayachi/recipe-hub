"use server";

import { getRecipeById, updateRecipe } from "@/lib/API/recipes/recipes";
import RecipeForm from "@/components/RecipeForm";

type Props = { params: Promise<{ id: string }> };

export default async function EditRecipePage({ params }: Props) {
  const { id } = await params;
  const numericId = Number(id);
  
  const recipe = await getRecipeById(numericId);
  

  async function updateAction(formData: FormData) {
    "use server";
    await updateRecipe(numericId, formData);
  }

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gray-100">
      <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-pink-400 to-purple-500 opacity-20" />

      <div className="relative z-10 w-full max-w-2xl px-8 py-10 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
          Edit Recipe
        </h1>

        <RecipeForm
          initialValues={recipe}
          onSubmit={updateAction}
          submitLabel="Update Recipe"
        />

        {/* Existing Image Preview */}
        {recipe.image_url && !recipe.image && (
          <div className="mt-6 flex flex-col items-center">
            <span className="text-gray-600 mb-2 font-medium">
              Current Image:
            </span>
            <img
              src={recipe.image_url}
              alt={recipe.title}
              className="w-48 h-48 object-cover rounded-xl border border-gray-300 shadow-md"
            />
          </div>
        )}
      </div>
    </div>
  );
}
