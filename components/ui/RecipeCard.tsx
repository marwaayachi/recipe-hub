import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { RecipeCardData } from "@/types/recipe";
import Link from "next/link";

type RecipeCardProps = {
  recipe: RecipeCardData;
};

export function RecipeCard({recipe}: RecipeCardProps) {
  return (
    <Card className="relative mx-auto w-full max-w-xl pt-0 overflow-hidden">
      <div className=" relative w-full h-64">
        <Image
          src={recipe.image_url}
          alt={recipe.title}
          fill
          className="w-full h-full object-cover object-center"
          unoptimized
        />
      </div>
      <CardHeader>
        <CardAction>
          <Badge variant="secondary" className="text-sm font-medium">
            {recipe.categories?.name}
          </Badge>
        </CardAction>
        <CardTitle className="text-xl">{recipe.title}</CardTitle>
        <CardDescription className="text-md">
          {recipe.description}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Link href={`/recipes/${recipe.id}`}>
          <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold text-md">
            View Recipe
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
