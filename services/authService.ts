import { supabase } from "@/lib/supabase/client"; 
import { createClient } from "@/lib/supabase/server";

export const registerUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  console.log("register:",data)
  if (error) throw error;
  return data;
};

export const loginUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    console.log("login:", data)

  if (error) throw error;
  return data;
};

export const getCurrentUser = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};
export const logOut = async () => {
    await supabase.auth.signOut();
    
};