"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { Menu, X } from "lucide-react";

import NavLink from "../ui/NavLink";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import UserMenu from "../ui/UserMenu";

export default function Navbar() {
  const { data: user } = useCurrentUser();
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

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
    <>
      <nav
        className={`fixed w-full z-20 top-0 transition-all duration-300 ${
          isHome
            ? "bg-transparent text-white"
            : "bg-gray-100 shadow-md text-gray-800"
        }`}
      >
        <div className="max-w-7xl flex items-center justify-between mx-auto p-4">
          {/* Logo */}
          <Link
            href="/"
            className={`text-2xl font-bold ${
              isHome
                ? " text-red-500 hover:text-red-600"
                : "text-red-500 hover:text-red-600"
            }`}
          >
            RecipeHub
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-10">
            <NavLink href="/" label="Home" />
            <NavLink href="/public-recipes" label="Recipes" />
            <NavLink href="/user-recipes/new" label="Add Recipe" />

            {!user ? (
              <Link
                href="/auth/login"
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Login
              </Link>
            ) : (
              <UserMenu email={user.email} variant="dropdown" />
            )}
          </div>

          {/* Mobile Button */}
          <button className="md:hidden" onClick={() => setIsOpen(true)}>
            <Menu className="w-7 h-7 text-red-500" />
          </button>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-30 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Slide Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-gray-100 z-40 shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <Link href="/" className="text-2xl font-semibold text-red-500">
            RecipeHub
          </Link>

          <button onClick={() => setIsOpen(false)}>
            <X className="w-6 h-6 text-red-500" />
          </button>
        </div>
        {/* Links */}
        <div className="flex flex-col gap-4 p-4">
          <NavLink href="/" label="Home" />
          <NavLink href="/public-recipes" label="Recipes" />
          <NavLink href="/user-recipes/new" label="Add Recipe" />

          {!user ? (
            <Link
              href="/auth/login"
              className="bg-red-500 text-white px-4 py-2 rounded text-center"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          ) : (
            <UserMenu email={user.email} variant="mobile" />
          )}
        </div>
      </div>
    </>
  );
}
