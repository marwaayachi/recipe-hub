'use client';

import { getRecipeById } from "@/features/recipes/API/getRecipeByID";

import Image from "next/image";
import Link from "next/link";
import DeleteButton from "@/components/ui/deleteBtn";
import { useQuery } from "@tanstack/react-query";

type Props = {
  id: string;
};
export default  function RecipeInfoPage({ id }: Props) {
  const numericId = Number(id);

  const { data:recipe, isLoading, isError, error } = useQuery({
    queryKey: ["recipe", numericId],
    queryFn: () => getRecipeById(numericId),
    enabled: !isNaN(numericId),
  })

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

  return (
    <div className="max-w-3xl mx-auto p-4 mt-20">
      <h1 className="text-3xl font-bold mb-2">{recipe.title}</h1>

      <div className="w-full h-96 relative mb-4">
        <Image
          src={recipe.image_url}
          alt={recipe.title}
          fill
          className="object-cover object-center rounded"
          unoptimized
        />
      </div>

      <p className="mb-2 font-medium text-gray-700">
        Category:{" "}
        <span className="text-blue-500">{recipe.categories?.name}</span>
      </p>

      <p className="mb-4">{recipe.description}</p>

      <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
      <p className="mb-4">{recipe.ingredients}</p>

      <h2 className="text-xl font-semibold mb-2">Instructions</h2>
      <p className="mb-4">{recipe.instructions}</p>

      <div className="flex gap-4">
        <Link
          href={`/recipes/${recipe.id}/edit`}
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded font-semibold"
        >
          Edit
        </Link>
        <DeleteButton id={numericId} />
      </div>
    </div>
  );
}
