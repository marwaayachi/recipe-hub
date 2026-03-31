import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/features/auth/API/getCurrentUser";

export function useCurrentUser() {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: getCurrentUser,
        staleTime: 1000 * 60 * 5, // cache for 5 minutes
    });
}