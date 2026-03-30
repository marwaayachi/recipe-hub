import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../API/getCategories";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}