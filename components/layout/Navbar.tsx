"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import NavLink from "../ui/NavLink";


export default function Navbar() {
  const pathname = usePathname();
  const isHome =pathname === "/";

    return (
      <nav
        className={`fixed w-full z-20 top-0 transition-all duration-300 ${
          isHome
            ? "bg-transparent text-white"
            : "bg-white shadow-md text-gray-800"
        }`}
      >
        <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            href="/"
            className={`text-2xl font-bold ${
              isHome ? "hover:text-red-600" : "hover:text-red-400"
            }`}
          >
            RecipeHub
          </Link>

          <div className="flex items-center gap-20">
            <NavLink href="/" label="Home" />
            <NavLink href="/recipes" label="Recipes" />
            <NavLink href="/add-recipes" label="Add Recipes" />
            <NavLink href="/login" label="Login" />
          </div>
        </div>
      </nav>
    );
}