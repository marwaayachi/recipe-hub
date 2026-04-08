'use client';

import { getRecipeById } from "@/features/recipes/API/getRecipeByID";

import Image from "next/image";
import Link from "next/link";
import DeleteButton from "@/components/ui/deleteBtn";
import { useQuery } from "@tanstack/react-query";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";

type Props = {
  id: string;
};
export default  function RecipeInfoPage({ id }: Props) {
  const numericId = Number(id);
  const { data: currentUser } = useCurrentUser();

  const {
    data: recipe,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userRecipe", numericId],
    queryFn: () => getRecipeById(numericId),
    enabled: !isNaN(numericId),
  });

  

  if (isNaN(numericId)) {
    return <p className="text-center mt-10">Invalid recipe ID</p>;
  }

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (isError) {
    return <p className="text-center mt-10">{(error as Error).message}</p>;
  }

  if (!recipe) {
    return <p className="text-center mt-10">Recipe not found</p>;
  }

  const isOwner = currentUser?.id === recipe.user_id;

  return (
    <div className="max-w-3xl mx-auto p-4 mt-20">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
        {recipe.title}
      </h1>

      {/* Image */}
      <div className="w-full h-72 md:h-96 relative mb-6 rounded-2xl overflow-hidden shadow-lg">
        <Image
          src={recipe.image_url}
          alt={recipe.title}
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

     {/* <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
          {currentUser?.email?.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-sm text-gray-500">Created by</p>
          <p className="font-semibold text-gray-800">{recipe.user?.email}</p>
        </div>
      </div>*/}

      {/* Category + Description */}
      <div className="bg-white rounded-2xl shadow p-5 mb-6">
        <p className="text-sm text-gray-500 mb-2">
          Category:{" "}
          <span className="text-red-500 font-semibold">
            {recipe.categories?.name}
          </span>
        </p>

        <p className="text-gray-700 leading-relaxed">{recipe.description}</p>
      </div>

      {/* Ingredients */}
      <div className="bg-white rounded-2xl shadow p-5 mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">
          Ingredients
        </h2>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {recipe.ingredients.map((item: string, index: number) => (
            <li
              key={index}
              className="bg-red-50 text-red-600 px-3 py-2 rounded-lg text-sm font-medium"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Instructions */}
      <div className="bg-white rounded-2xl shadow p-5 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Instructions
        </h2>

        <div className="flex flex-col gap-3">
          {recipe.instructions.map((step: string, index: number) => (
            <div
              key={index}
              className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg"
            >
              <div className="w-7 h-7 flex items-center justify-center bg-red-500 text-white rounded-full text-sm font-bold">
                {index + 1}
              </div>
              <p className="text-gray-700">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      {isOwner && (
        <div className="flex gap-4 justify-end">
          <Link
            href={`/user-recipes/${recipe.id}/edit`}
            className="px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold shadow"
          >
            Edit
          </Link>

          <DeleteButton id={numericId} />
        </div>
      )}
    </div>
  );
}