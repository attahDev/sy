"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { api, setStoredToken } from "@/lib/api";

export default function OtpForm() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [verificationToken, setVerificationToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const pendingEmail = localStorage.getItem("pendingVerificationEmail");
    if (!pendingEmail) {
      router.replace("/signup");
      return;
    }

    setEmail(pendingEmail);
    setVerificationToken(localStorage.getItem("pendingVerificationToken"));
    setOtp(Array(6).fill(""));
    setTimer(30);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) clearInterval(interval);
        return Math.max(prev - 1, 0);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [router]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    setError("");
    if (index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const data = e.clipboardData.getData("text");
    if (data.length === 6 && /^\d+$/.test(data)) {
      setOtp(data.split(""));
      setError("");
      inputRefs.current[5]?.focus();
    }
  };

  const verifyCode = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setError("Please enter a 6-digit OTP code");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/verify-email", {
        email,
        otpCode,
        ...(verificationToken ? { verificationToken } : {}),
      });

      if (response.data.success) {
        localStorage.removeItem("pendingVerificationEmail");
        localStorage.removeItem("pendingVerificationToken");

        const accessToken = response.data.data?.access_token;
        if (accessToken) {
          setStoredToken(accessToken);
          toast.success("Email verified! Logging you in…");
          window.location.href = "/dashboard";
        } else {
          toast.success("Email verified successfully.");
          router.push("/login");
        }
      }
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "OTP verification failed. Please try again.";
      setError(message);
      setOtp(Array(6).fill(""));
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async () => {
    if (timer !== 0) return;
    setLoading(true);
    setError("");
    try {
      const response = await api.post("/auth/resend-verification", { email });
      if (response.data.success) {
        setTimer(30);
        toast.success("New OTP sent to your email.");
        setOtp(Array(6).fill(""));
        inputRefs.current[0]?.focus();
      }
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to resend OTP. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "Enter" && index === 5 && otp.join("").length === 6) {
      void verifyCode();
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-10 text-center shadow-xl">
      <h2 className="mb-2 text-xl font-semibold text-[#001F3F]">Verify your email</h2>
      <p className="mb-2 text-gray-600">Enter the 6-digit verification code sent to:</p>
      <p className="mb-6 font-medium text-gray-800">{email}</p>

      {error && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <div className="mb-6 flex justify-between gap-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              if (el) inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onPaste={handlePaste}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            disabled={loading}
            className="h-14 w-12 rounded-lg border text-center text-lg font-semibold outline-none focus:border-[#D7263D] disabled:bg-gray-100"
          />
        ))}
      </div>

      <button
        type="button"
        onClick={verifyCode}
        disabled={otp.join("").length !== 6 || loading}
        className="w-full rounded-lg bg-[#D7263D] py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        {loading ? "Verifying…" : "Verify code"}
      </button>

      <p className="mt-4 text-sm text-gray-500">
        Didn&apos;t receive the code?
        {timer > 0 ? (
          <span className="ms-2">{`00:${String(timer).padStart(2, "0")}`}</span>
        ) : (
          <button
            type="button"
            onClick={resendCode}
            disabled={loading}
            className="ms-2 text-[#D82236] hover:underline disabled:text-gray-400"
          >
            Resend OTP
          </button>
        )}
      </p>
    </div>
  );
}
