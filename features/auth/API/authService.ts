
import { supabase } from "@/lib/supabase/client";

export type  AuthResponse = { success: boolean; errors?: Record<string, string[]>};

export async function login(email: string, password: string): Promise<AuthResponse> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { success: false, errors: {general: [error.message]}};
  return { success: true };
}

export async function register(email: string, password: string): Promise<AuthResponse> {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) return { success: false, errors: {general: [error.message]}};
  return { success: true };
}







