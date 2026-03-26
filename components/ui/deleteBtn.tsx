"use client"; 

import { deleteRecipeAction } from "@/features/recipes/API/deleteRecipe";
import { Button } from "./button";

export default function DeleteButton({ id }: { id: number }) {
  return (
    <form
      action={deleteRecipeAction}
      onSubmit={(e) => {
        if (!confirm("Are you sure you want to delete this recipe?")) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />

      <Button
        type="submit"
        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded font-semibold"
      >
        Delete
      </Button>
    </form>
  );
}
