"use client";
import { useState } from "react";
import { loginAction, registerAction } from "@/lib/authAction";
import {
  validateEmail,
  validatePassword,
} from "@/lib/validation/authFormSchema";
import Link from "next/link";


type AuthFormProps = {
  mode: "login" | "register";
};

export default function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Empty checks
    if (!email) {
      setError("Email cannot be empty");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }
    if (!password) {
      setError("Password cannot be empty");
      return;
    }
    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters, include a letter, a number, and a special character",
      );
      return;
    }

    try {
      if (mode === "login") {
        await loginAction(email, password);
      } else {
        await registerAction(email, password);
      }
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-xl p-8 rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h2>

        {error && (
          <p className="text-red-600 text-center mb-4 font-medium">{error}</p>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
          noValidate
        >
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition"
          />
          <button
            type="submit"
            className="bg-red-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-red-600 transition"
          >
            {mode === "login" ? "Login" : "Register"}
          </button>

          <p className="text-center mt-2 text-sm">
            {mode === "register"
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <Link
              href={mode === "register" ? "/auth/login" : "/auth/register"}
              className="text-red-500 underline ml-1"
            >
              {mode === "register" ? "Login" : "Register"}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}