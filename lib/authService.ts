import { createClient } from "./supabase/server";

export const authService = {
  login: async (email: string, password: string) => {
    const supabase = await createClient();
    return await supabase.auth.signInWithPassword({ email, password });
  },

  register: async (email: string, password: string) => {
    const supabase = await createClient();
    return await supabase.auth.signUp({ email, password });
  },
};