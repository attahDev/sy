/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

type JoinUsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  cityRegion: string;
  organizationCompany: string;
  jobTitleRole: string;
  attendingAs: string;
  areasOfInterest: string[];
  hopingToGain: string;
  joinAfterEvent: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const interestOptions = ["Tech", "Business", "Startups", "AI", "Community"];

const attendingOptions = [
  "Founder",
  "Student",
  "Professional",
  "Investor",
  "Partner",
  "Other",
];

const joinAfterEventOptions = ["Yes", "No", "Maybe"];

const initialForm: FormData = {
  fullName: "",
  email: "",
  phoneNumber: "",
  cityRegion: "",
  organizationCompany: "",
  jobTitleRole: "",
  attendingAs: "",
  areasOfInterest: [],
  hopingToGain: "",
  joinAfterEvent: "",
};

export default function JoinUsModal({
  isOpen,
  onClose,
}: JoinUsModalProps) {
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
   const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const isFormValid = useMemo(() => {
    return (
      formData.fullName.trim() &&
      formData.email.trim() &&
      formData.cityRegion.trim() &&
      formData.attendingAs.trim()
    );
  }, [formData]);

  if (!isOpen) return null;

  const validateForm = () => {
    const nextErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      nextErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Enter a valid email address";
    }

    if (!formData.cityRegion.trim()) {
      nextErrors.cityRegion = "City / Region is required";
    }

    if (!formData.attendingAs.trim()) {
      nextErrors.attendingAs = "Please select how you are attending";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleInterestToggle = (value: string) => {
    setFormData((prev) => {
      const exists = prev.areasOfInterest.includes(value);

      return {
        ...prev,
        areasOfInterest: exists
          ? prev.areasOfInterest.filter((item) => item !== value)
          : [...prev.areasOfInterest, value],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await axios.post("/api/join-us", formData);

      toast.success(res.data.message || "Application submitted successfully");

      // reset form
      setFormData(initialForm);
      setErrors({});

      // close modal
      onClose();

    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Something went wrong";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0D1B3EBF] px-3 py-4 sm:px-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[95vh] w-full max-w-[496px] overflow-y-auto rounded-[20px] bg-[#F3F3F3] px-5 pb-6 pt-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)] sm:px-7 sm:pb-7 sm:pt-7"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close modal"
          onClick={onClose}
          className="absolute right-5 top-5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#E8E8E8] text-[#7C7C7C] transition hover:bg-[#DDDDDD]"
        >
          <X size={16} strokeWidth={2} />
        </button>

        <div className="pr-10">
          <h2 className="font-beb text-[22px] font-extrabold uppercase leading-none tracking-[0.02em] text-[#0D1B3E] sm:text-[32px] mt-5">
            Join Us
          </h2>

          <p className="mt-7 font-dm text-[13px] leading-[1.6] text-[#6B6B6B]">
            Join the South Yorkshire Black Tech Expo platform and community.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-3 sm:gap-y-4">
            <Field
              label="FULL NAME *"
              error={errors.fullName}
              htmlFor="fullName"
            >
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Your full name"
                value={formData.fullName}
                onChange={handleInputChange}
                className={inputClass(errors.fullName)}
              />
            </Field>

            <Field
              label="EMAIL ADDRESS *"
              error={errors.email}
              htmlFor="email"
            >
              <input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleInputChange}
                className={inputClass(errors.email)}
              />
            </Field>

            <Field
              label="PHONE NUMBER"
              error={errors.phoneNumber}
              htmlFor="phoneNumber"
            >
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                placeholder="+44 ..."
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={inputClass(errors.phoneNumber)}
              />
            </Field>

            <Field
              label="CITY / REGION *"
              error={errors.cityRegion}
              htmlFor="cityRegion"
            >
              <input
                id="cityRegion"
                name="cityRegion"
                type="text"
                placeholder="e.g. Sheffield"
                value={formData.cityRegion}
                onChange={handleInputChange}
                className={inputClass(errors.cityRegion)}
              />
            </Field>

            <Field
              label="ORGANISATION / COMPANY"
              error={errors.organizationCompany}
              htmlFor="organizationCompany"
            >
              <input
                id="organizationCompany"
                name="organizationCompany"
                type="text"
                placeholder="Optional"
                value={formData.organizationCompany}
                onChange={handleInputChange}
                className={inputClass(errors.organizationCompany)}
              />
            </Field>

            <Field
              label="JOB TITLE / ROLE"
              error={errors.jobTitleRole}
              htmlFor="jobTitleRole"
            >
              <input
                id="jobTitleRole"
                name="jobTitleRole"
                type="text"
                placeholder="Your role"
                value={formData.jobTitleRole}
                onChange={handleInputChange}
                className={inputClass(errors.jobTitleRole)}
              />
            </Field>
          </div>

          <Field
            label="ATTENDING AS *"
            error={errors.attendingAs}
            htmlFor="attendingAs"
          >
            <select
              id="attendingAs"
              name="attendingAs"
              value={formData.attendingAs}
              onChange={handleInputChange}
              className={inputClass(errors.attendingAs)}
            >
              <option value="">Select an option</option>
              {attendingOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>

          <Field label="AREAS OF INTEREST" htmlFor="areasOfInterest">
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 pt-1 sm:max-w-[340px]">
              {interestOptions.map((option) => {
                const selected = formData.areasOfInterest.includes(option);

                return (
                  <label
                    key={option}
                    className="flex cursor-pointer items-center gap-2 text-[13px] text-[#4A4F5E]"
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => handleInterestToggle(option)}
                      className="h-4 w-4 rounded border-[#CFCFCF] text-[#0D1B3E] focus:ring-[#0D1B3E]"
                    />
                    <span>{option}</span>
                  </label>
                );
              })}
            </div>
          </Field>

          <Field
            label="WHAT ARE YOU HOPING TO GAIN?"
            error={errors.hopingToGain}
            htmlFor="hopingToGain"
          >
            <textarea
              id="hopingToGain"
              name="hopingToGain"
              rows={4}
              placeholder="Tell us what you're hoping to get from the event..."
              value={formData.hopingToGain}
              onChange={handleInputChange}
              className={`${inputClass(errors.hopingToGain)} min-h-[96px] resize-none py-4`}
            />
          </Field>

          <Field
            label="JOIN THE PLATFORM AFTER THE EVENT?"
            error={errors.joinAfterEvent}
            htmlFor="joinAfterEvent"
          >
            <select
              id="joinAfterEvent"
              name="joinAfterEvent"
              value={formData.joinAfterEvent}
              onChange={handleInputChange}
              className={inputClass(errors.joinAfterEvent)}
            >
              <option value="">Select an option</option>
              {joinAfterEventOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>

          <button
            type="submit"
            disabled={loading || !isFormValid}
            className="mt-2 inline-flex h-[52px] w-full items-center justify-center rounded-[16px] bg-[#0D1B3E] px-6 text-[15px] font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Submitting..." : "Register Now →"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  htmlFor,
  children,
}: {
  label: string;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-[12px] font-dm font-extrabold uppercase tracking-[0.04em] text-[#0D1B3E]"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1 text-[11px] text-red-600">{error}</p>
      ) : null}
    </div>
  );
}

function inputClass(error?: string) {
  return [
    "h-[42px] w-full rounded-[10px] border bg-[#F3F3F3] px-4 text-[14px] text-[#0D1B3E] outline-none transition",
    "placeholder:text-[#9CA3AF]",
    error
      ? "border-red-400 focus:border-red-500"
      : "border-[#D5D5D5] focus:border-[#0D1B3E]/50",
  ].join(" ");
}