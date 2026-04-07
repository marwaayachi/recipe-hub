"use client"

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Hero () {
    return (
      <section className="relative w-full h-screen flex items-center overflow-hidden justify-center text-center text-white">
        <Image
          src="/bg2.jpg"
          alt="cooking hero"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 max-w-2xl px-4">
          <h1 className="text-6xl md:6xl font-boldb mb-4">
            Welcome to RecipeHub
          </h1>
          <p className="text-lg md:text-3xl mb-6">
            Discover, create, and share your favorite recipes easily.
          </p>
          {/* Navigate to Recipes page */}
          <Link href="/public-recipes">
            <Button
              size="lg"
              className="mt-8 text-lg bg-red-500 hover:bg-red-700"
            >
              Explore Recipes
            </Button>
          </Link>
        </div>
      </section>
    );
}