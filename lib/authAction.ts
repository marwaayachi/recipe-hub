"use server"; 

import { authService } from "./authService";
import { redirect } from "next/navigation";

export async function loginAction(email: string, password: string) {
  const { error } = await authService.login(email, password);
  if (error) throw new Error(error.message);
  redirect("/recipes");
}

export async function registerAction(email: string, password: string) {
  const { error } = await authService.register(email, password);
  if (error) throw new Error(error.message);
  redirect("/recipes");
}