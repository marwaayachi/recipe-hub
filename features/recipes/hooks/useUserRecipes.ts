
import { useQuery } from "@tanstack/react-query";
import { getUserRecipes } from "../API/getUserRecipes";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";

export function useUserRecipes() {
    const { data: user} = useCurrentUser();
    return useQuery({
        queryKey:["userRecipes", user?.id],
        queryFn: () => getUserRecipes(user!.id),
        enabled:!!user,
    });
}