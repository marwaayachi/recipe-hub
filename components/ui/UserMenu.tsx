"use client";

import Link from "next/link";
import { useState } from "react";
import { User } from "lucide-react";


export default function UserMenu({ email }: {email:string}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
    
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300"
      >
        <User className="w-5 h-5 text-gray-700" /> 
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-white border rounded-lg shadow-lg p-3">
          <p className="text-sm text-gray-600 mb-2">{email}</p>

          <Link href="/my-recipes" className="block py-1 hover:text-red-500">
            My Recipes
          </Link>

          <button
          
            className="block w-full text-left py-1 hover:text-red-500"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}