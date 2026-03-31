"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BookOpen, User } from "lucide-react";
import { LogOut } from "lucide-react";
import { logout } from "@/features/auth/API/logout";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  email?: string; 
}

export default function UserMenu({ email }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleSignout = async () => {
    try {
      await logout();
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      router.push("/auth/login");
    } catch (err) {
      console.error(err);
    }
  };

   useEffect(() => {
     const handleClickOutside = (event: MouseEvent) => {
       if (
         dropdownRef.current &&
         !dropdownRef.current.contains(event.target as Node)
       ) {
         setOpen(false);
       }
     };
     document.addEventListener("mousedown", handleClickOutside);
     return () => {
       document.removeEventListener("mousedown", handleClickOutside);
     };
   }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500 hover:bg-red-600"
      >
        <User className="w-5 h-5 text-white" />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-white border rounded-lg shadow-lg p-3">
          <p className="text-sm text-gray-600 mb-2">{email}</p>

          <Link
            href="/recipes"
            className="flex items-center gap-2 w-full text-left py-2 px-3 rounded hover:bg-red-50 transition-colors"
          >
            <BookOpen className="w-5 h-5 text-red-500" />
            <span className="text-red-500 font-medium">My Recipes</span>
          </Link>

          <button
            onClick={handleSignout}
            className="flex items-center gap-2 w-full text-left py-2 px-3 rounded hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5 text-red-500" />
            <span className="text-red-500 font-medium">Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}