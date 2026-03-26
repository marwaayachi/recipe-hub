import { getRecipeById } from "@/lib/API/recipes/recipes";
import Image from "next/image";
import Link from "next/link";
import DeleteButton from "@/components/ui/deleteBtn"; 

type Props = {
  params: Promise<{ id: string }>;
};
export default async function RecipeInfoPage({ params }: Props) {
  const { id } = await params; 

  const numericId = Number(id);
  if (!numericId) return;
  const recipe = await getRecipeById(numericId);

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
        Category: <span className="text-blue-500">{recipe.categories?.name}</span>
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
