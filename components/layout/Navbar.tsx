import Link from "next/link";

import NavLink from "../ui/NavLink";
import { getCurrentUser } from "@/services/authService";
import UserMenu from "../ui/UserMenu";

type NavbarProps = {
  pathname: string; 
};
export default async function Navbar({ pathname}: NavbarProps) {
  const isHome = pathname === "/";
  const user = await getCurrentUser();

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
       
         <NavLink href={user ? "/recipes/new" : "/auth/login"} label="Add Recipe" />

          {/* Login / User Menu */}
          {!user ? (
            <NavLink href="/auth/login" label="Login" />
          ) : (
            <UserMenu email={user.email ?? ""} />
          )}
        </div>
      </div>
    </nav>
  );
}
