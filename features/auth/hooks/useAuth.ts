import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthResponse, login, register } from "../API/authService";

export const QUERY_KEYS = {
  currentUser: ["currentUser"] as const,
};

export function useLogin() {
    const queryClient = useQueryClient()

    return useMutation<AuthResponse, Error, { email: string, password: string}>({
        mutationFn: ({ email, password }) => login(email, password),
        onSuccess: (data) => {
            if (data.success) {
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.currentUser,
                });
            }
        },
    });
}

export function useRegister() {
    const queryClient = useQueryClient()

    return useMutation<AuthResponse, Error, { email: string, password: string}>({
        mutationFn: ({ email, password }) => register(email, password),
        onSuccess: (data) => {
            if (data.success) {
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.currentUser,
                });
            }
        },
    });
}