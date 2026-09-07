"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { api, setStoredToken } from "@/lib/api";

type Step = "email" | "otp" | "reset";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState<Step>("email");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [message, setMessage] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!email.trim()) next.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    setMessage("");
    try {
      await api.post("/auth/forgot-password", { email });
      setMessage("OTP sent to your email.");
      setStep("otp");
      setTimer(60);
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to send OTP. Please try again.";
      setErrors({ general: msg });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.join("").length !== 6) {
      setErrors({ otp: "Please enter all 6 digits" });
      return;
    }
    setErrors({});
    setMessage("Now set your new password.");
    setStep("reset");
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (newPassword.length < 6) next.newPassword = "Password must be at least 6 characters";
    if (newPassword !== confirmPassword) next.confirmPassword = "Passwords do not match";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    try {
      await api.post("/auth/reset-password", {
        email,
        otpCode: otp.join(""),
        newPassword,
      });
      setStoredToken(null);
      setMessage("Password reset successfully. Redirecting to login…");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to reset password. Please try again.";
      setErrors({ general: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
      <h2 className="text-center text-xl font-bold text-[#001F3F]">Reset password</h2>
      <p className="mt-1 text-center text-sm text-[#6B7280]">
        {step === "email" && "Enter the email on your account."}
        {step === "otp" && "Enter the 6-digit code we sent you."}
        {step === "reset" && "Choose a new password."}
      </p>

      {errors.general && (
        <p className="mt-3 text-center text-sm text-red-500">{errors.general}</p>
      )}
      {message && <p className="mt-3 text-center text-sm text-emerald-600">{message}</p>}

      {step === "email" && (
        <form onSubmit={handleSendOtp} className="mt-6 space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none"
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#D7263D] py-2 text-white disabled:opacity-50"
          >
            {loading ? "Sending…" : "Send code"}
          </button>
        </form>
      )}

      {step === "otp" && (
        <form onSubmit={handleOtpSubmit} className="mt-6 space-y-4">
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  otpRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                className="h-12 w-10 rounded-lg border text-center font-semibold outline-none focus:border-[#D7263D]"
              />
            ))}
          </div>
          {errors.otp && <p className="text-xs text-red-500">{errors.otp}</p>}
          <button
            type="submit"
            className="w-full rounded-xl bg-[#D7263D] py-2 text-white"
          >
            Continue
          </button>
          {timer > 0 && (
            <p className="text-center text-xs text-gray-500">Resend in {timer}s</p>
          )}
        </form>
      )}

      {step === "reset" && (
        <form onSubmit={handleResetPassword} className="mt-6 space-y-4">
          <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5">
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password"
              className="w-full bg-transparent text-sm outline-none"
            />
            <button type="button" onClick={() => setShowNewPassword((v) => !v)}>
              {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.newPassword && <p className="text-xs text-red-500">{errors.newPassword}</p>}
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none"
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-500">{errors.confirmPassword}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#D7263D] py-2 text-white disabled:opacity-50"
          >
            {loading ? "Saving…" : "Reset password"}
          </button>
        </form>
      )}

      <p className="mt-4 text-center text-sm">
        <Link href="/login" className="text-[#D7263D] hover:underline">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
