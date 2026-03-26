'use client';

import { supabase } from "@/lib/supabase/client";

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout error:", error.message);
    throw new Error(error.message);
  }

  return { success: true };
}