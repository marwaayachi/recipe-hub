'use client'

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

import NavLink from "../ui/NavLink";
import { useEffect } from "react";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import UserMenu from "../ui/UserMenu";






export default function Navbar() {
    const { data: user } = useCurrentUser();
    const queryClient = useQueryClient(); 

    const pathname = usePathname();
    const isHome = pathname === "/";
    const router = useRouter();


    useEffect(() => {
      const { data: listener } = supabase.auth.onAuthStateChange(() => {
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        router.refresh();
      });

      return () => {
        listener.subscription.unsubscribe();
      };
    }, [router, queryClient]);

    

  return (
    <nav
      className={`fixed w-full z-20 top-0 transition-all duration-300 ${
        isHome
          ? "bg-transparent text-white"
          : "bg-gray-100 shadow-md sticky top-0 z-50 text-gray-800"
      }`}
    >
      <div className="max-w-7xl flex items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className={`text-2xl font-bold ${
            isHome ? "hover:text-red-600" : "text-red-500 hover:text-red-600"
          }`}
        >
          RecipeHub
        </Link>

        <div className="flex items-center gap-10">
          <NavLink href="/" label="Home" />
          <NavLink href="/public-recipes" label="Recipes" />
          <NavLink href="/user-recipes/new" label="Add Recipe" />

          <div className="flex items-center gap-4">
            {!user ? (
              <Link
                href="/auth/login"
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Login
              </Link>
            ) : (
              <UserMenu email={user.email} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
