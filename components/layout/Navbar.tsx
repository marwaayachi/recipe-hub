'use client'

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

import NavLink from "../ui/NavLink";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { logout } from "@/features/auth/API/logout";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";






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

    const handleSignout = async () => {
     try {
       await logout();
       queryClient.invalidateQueries({ queryKey: ["currentUser"] });
       router.push("/auth/login");
     } catch (err) {
       console.error(err);
     }
    }

  return (
    <nav
      className={`fixed w-full z-20 top-0 transition-all duration-300 ${
        isHome
          ? "bg-transparent text-white"
          : "bg-white shadow-md text-gray-800"
      }`}
    >
      <div className="max-w-7xl flex items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className={`text-2xl font-bold ${
            isHome ? "hover:text-red-600" : "hover:text-red-400"
          }`}
        >
          RecipeHub
        </Link>

        <div className="flex items-center gap-10">
          <NavLink href="/" label="Home" />
          <NavLink href="/recipes" label="Recipes" />
          <NavLink href="/recipes/new" label="Add Recipe" />

          {!user ? (
            <Link
              href="/auth/login"
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Login
            </Link>
          ) : (
            <Button
              onClick={handleSignout}
              className="bg-red-500 text-white font-bold px-4 py-2 rounded"
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
