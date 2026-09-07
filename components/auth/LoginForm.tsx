"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

function extractErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;
    if (typeof message === "string") return message;
    if (Array.isArray(message)) return message.join(", ");
    return "Could not reach the server";
  }
  return error instanceof Error ? error.message : "Unknown authentication error";
}

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();
  const { login, isAuthenticated, isLoading, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, user, router]);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!email.trim()) next.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email";
    if (!password.trim()) next.password = "Password is required";
    else if (password.length < 6) next.password = "Password must be at least 6 characters";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await login(email, password);
      router.replace("/dashboard");
    } catch (err) {
      setErrors({ general: extractErrorMessage(err) });
    }
  };

  if (isAuthenticated && user) return null;

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
      <h2 className="text-center text-[20px] font-bold text-[#001F3F]">Welcome back</h2>
      <p className="mt-1 text-center text-base text-[#6B7280]">
        Sign in to access Academy, Community, and the rest of your workspace.
      </p>

      {errors.general && (
        <p className="mt-3 text-center text-sm text-red-500">{errors.general}</p>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="text-base text-[#001F3F]">Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            className={`mt-1 w-full rounded-lg border bg-gray-50 px-3 py-2 text-sm outline-none ${
              errors.email ? "border-red-500" : "border-gray-200"
            }`}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label className="text-base text-[#001F3F]">Password</label>
          <div
            className={`mt-1 flex items-center gap-2 rounded-lg border bg-gray-50 px-3 py-2 ${
              errors.password ? "border-[#D7263D]" : "border-gray-200"
            }`}
          >
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="flex-1 bg-transparent text-sm outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="text-gray-500"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-[#D7263D]">{errors.password}</p>
          )}
        </div>

        <div className="flex items-center justify-end text-sm">
          <Link href="/reset-password" className="text-[#D7263D] hover:underline">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 w-full rounded-xl bg-[#D7263D] py-2 text-white transition-colors hover:bg-red-700 disabled:opacity-50"
        >
          {isLoading ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-[#D7263D] hover:underline">
          Sign up here
        </Link>
      </p>
    </div>
  );
}
