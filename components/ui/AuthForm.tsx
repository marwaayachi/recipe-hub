"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser, registerUser } from "@/services/authService";
import Link from "next/link";

type AuthFormProps = {
  mode: "login" | "register";
};

export default function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === "register") await registerUser(email, password);
      else await loginUser(email, password);
      router.refresh();

      alert(
        mode === "register"
          ? "Check your email for confirmation!"
          : "Logged in successfully!",
      );
      router.push(mode === "register" ? "/auth/login" : "/recipes");
    
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-lg mx-auto mt-10"
    >
      <h2 className="text-2xl font-bold text-center">
        {mode === "register" ? "Register" : "Login"}
      </h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <button
        type="submit"
        className={`p-2 rounded text-white ${mode === "register" ? "bg-red-500" : "bg-green-700"}`}
      >
        {mode === "register" ? "Register" : "Login"}
      </button>

      {/* 🔹 Toggle Mode */}
      <p className="text-center mt-2 text-sm">
        {mode === "register"
          ? "Already have an account?"
          : "Don't have an account?"}{" "}
        <Link
          href={mode === "register" ? "/auth/login" : "/auth/register"}
          className="text-red-500 underline"
        >
          {mode === "register" ? "Login" : "Register"}
        </Link>
      </p>
    </form>
  );
}
