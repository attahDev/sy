"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import type { RegisterForm } from "@/lib/types/user";

const roles: RegisterForm["role"][] = [
  "STUDENT",
  "PROFESSIONAL",
  "ENGINEER",
  "OTHER",
];

export default function SignupForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    organization: "",
    role: "",
    password: "",
    confirmPassword: "",
    terms: false,
    newsletter: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { isAuthenticated, user, register } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, user, router]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value, type } = e.target;
    const checked = "checked" in e.target ? e.target.checked : false;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setGeneralError(null);
  }

  function validate() {
    const next: Record<string, string> = {};
    if (!form.firstName.trim()) next.firstName = "First name is required";
    if (!form.lastName.trim()) next.lastName = "Last name is required";
    if (!form.email.trim()) next.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email";
    if (!form.role) next.role = "Please select your role";
    if (!form.password) next.password = "Password is required";
    else if (form.password.length < 6) next.password = "Password must be at least 6 characters";
    if (!form.confirmPassword) next.confirmPassword = "Please confirm your password";
    else if (form.password !== form.confirmPassword) next.confirmPassword = "Passwords do not match";
    if (!form.terms) next.terms = "You must accept the Terms";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setGeneralError(null);

    try {
      const result = await register({
        firstname: form.firstName,
        lastname: form.lastName,
        email: form.email,
        organization: form.organization,
        role: form.role as RegisterForm["role"],
        password: form.password,
        agreedToTerms: form.terms,
        subscribedToNews: form.newsletter,
      });

      localStorage.setItem("pendingVerificationEmail", form.email);
      if (result.verification_token) {
        localStorage.setItem("pendingVerificationToken", result.verification_token);
      }

      router.push("/verify-otp");
    } catch (err: unknown) {
      const axiosErr = err as { code?: string; response?: { status?: number; data?: { message?: string } } };
      if (axiosErr?.code === "ECONNABORTED" || !axiosErr?.response) {
        setGeneralError(
          "The server is waking up — this can take up to a minute. Please wait, then check if your account went through before retrying.",
        );
      } else if (axiosErr.response?.status === 409) {
        setGeneralError("An account with this email already exists — try signing in instead.");
      } else {
        setGeneralError(axiosErr.response?.data?.message || "Signup failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  if (isAuthenticated && user) return null;

  return (
    <div className="mx-auto w-full max-w-[488px] rounded-2xl bg-white p-6 shadow-xl sm:p-8">
      <h2 className="text-center text-xl font-semibold text-[#001F3F] md:text-2xl">
        Join South Yorkshire Black Tech
      </h2>
      <p className="mt-2 text-center text-sm text-[#6B7280]">
        Create your account to access Academy, Community, and Business Studio.
      </p>

      {generalError && (
        <p className="mt-4 text-center text-sm text-[#D7263D]">{generalError}</p>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-[#001F3F]">First name</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className={`mt-1 w-full rounded-lg border bg-gray-50 px-4 py-2.5 text-sm outline-none ${
                errors.firstName ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.firstName && <p className="mt-1 text-xs text-[#D7263D]">{errors.firstName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-[#001F3F]">Last name</label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className={`mt-1 w-full rounded-lg border bg-gray-50 px-4 py-2.5 text-sm outline-none ${
                errors.lastName ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.lastName && <p className="mt-1 text-xs text-[#D7263D]">{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[#001F3F]">Email address</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            className={`w-full rounded-lg border bg-gray-50 px-4 py-2.5 text-sm outline-none ${
              errors.email ? "border-red-500" : "border-gray-200"
            }`}
          />
          {errors.email && <p className="mt-1 text-xs text-[#D7263D]">{errors.email}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[#001F3F]">Organization</label>
          <input
            name="organization"
            value={form.organization}
            onChange={handleChange}
            placeholder="Your organization or school"
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[#001F3F]">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className={`w-full rounded-lg border bg-gray-50 px-4 py-2.5 text-sm outline-none ${
              errors.role ? "border-red-500" : "border-gray-200"
            }`}
          >
            <option value="">Select your role</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          {errors.role && <p className="mt-1 text-xs text-[#D7263D]">{errors.role}</p>}
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-[#001F3F]">Password</label>
            <div
              className={`mt-1 flex items-center rounded-lg border bg-gray-50 px-4 py-2.5 ${
                errors.password ? "border-red-500" : "border-gray-200"
              }`}
            >
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create password"
                className="w-full bg-transparent text-sm outline-none"
              />
              <button type="button" onClick={() => setShowPassword((s) => !s)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-[#001F3F]">Confirm password</label>
            <div
              className={`mt-1 flex items-center rounded-lg border bg-gray-50 px-4 py-2.5 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-200"
              }`}
            >
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="w-full bg-transparent text-sm outline-none"
              />
              <button type="button" onClick={() => setShowConfirmPassword((s) => !s)}>
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        <label className="flex items-start gap-2 text-sm text-[#001F3F]">
          <input
            type="checkbox"
            name="terms"
            checked={form.terms}
            onChange={handleChange}
            className="mt-1 h-4 w-4 accent-[#D7263D]"
          />
          <span>I agree to the Terms of Service and Privacy Policy</span>
        </label>
        {errors.terms && <p className="text-xs text-[#D7263D]">{errors.terms}</p>}

        <label className="flex items-start gap-2 text-sm text-[#001F3F]">
          <input
            type="checkbox"
            name="newsletter"
            checked={form.newsletter}
            onChange={handleChange}
            className="mt-1 h-4 w-4 accent-red-500"
          />
          <span>Subscribe to our newsletter</span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-[#D7263D] py-3 text-sm font-medium text-white disabled:opacity-60"
        >
          {loading ? "Creating account…" : "Create account"}
        </button>

        <p className="text-center text-sm text-gray-700">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-[#D7263D]">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
