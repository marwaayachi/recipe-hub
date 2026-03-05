"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
    href: string;
    label:string;
};

export default function NavLink( { href, label }: NavLinkProps) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={`text-lg font-bold transition ${
               isActive
                ? "text-red-600"
                : "text-gray-800 hover:text-red-600"
            }`}
        >
            {label}
        </Link>
    )
}

