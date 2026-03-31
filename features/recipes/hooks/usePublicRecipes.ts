import { useQuery } from "@tanstack/react-query";
import getPublicRecipes from "../API/getPublicRecipes";

export default function usePublicRecipes() {
    return useQuery({
        queryKey:["public-recipes"],
        queryFn: getPublicRecipes,
    })
}