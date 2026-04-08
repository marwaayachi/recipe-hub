import RecipeInfoPage from "@/app/user-recipes/[id]/RecipeInfo ";

type Props = {
  params: Promise<{ id: string }>;
};
export default async function Page({ params }: Props) {
  const { id } = await params;

  return <RecipeInfoPage id={id}/>;
}