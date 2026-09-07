/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

type BusinessSupportModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormData = {
  fullName: string;
  email: string;
  businessName: string;
  stageOfBusiness: string;
  industry: string;
  supportNeeded: string[];
  monthlyRevenue: string;
  biggestChallenge: string;
  interestedIn: string[];
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const supportOptions = [
  "Funding",
  "Mentorship",
  "Marketing",
  "Product Development",
  "Partnerships",
];

const interestedOptions = [
  "Coaching",
  "Investment readiness",
  "Accelerator programmes",
];

const stageOptions = [
  "Idea Stage",
  "Early Stage",
  "Growth Stage",
  "Established",
];

const initialForm: FormData = {
  fullName: "",
  email: "",
  businessName: "",
  stageOfBusiness: "",
  industry: "",
  supportNeeded: [],
  monthlyRevenue: "",
  biggestChallenge: "",
  interestedIn: [],
};

export default function BusinessSupportModal({
  isOpen,
  onClose,
}: BusinessSupportModalProps) {
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
      formData.businessName.trim() &&
      formData.stageOfBusiness.trim() &&
      formData.industry.trim() &&
      formData.biggestChallenge.trim()
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

    if (!formData.businessName.trim()) {
      nextErrors.businessName = "Business name is required";
    }

    if (!formData.stageOfBusiness.trim()) {
      nextErrors.stageOfBusiness = "Stage of business is required";
    }

    if (!formData.industry.trim()) {
      nextErrors.industry = "Industry is required";
    }

    if (!formData.biggestChallenge.trim()) {
      nextErrors.biggestChallenge = "Please describe your main challenge";
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

  const toggleArrayValue = (
    key: "supportNeeded" | "interestedIn",
    value: string
  ) => {
    setFormData((prev) => {
      const exists = prev[key].includes(value);

      return {
        ...prev,
        [key]: exists
          ? prev[key].filter((item) => item !== value)
          : [...prev[key], value],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await axios.post("/api/business-support", formData);

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
        className="relative max-h-[95vh] w-full max-w-[662px] overflow-y-auto rounded-[20px] bg-[#F3F3F3] px-5 pb-6 pt-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)] sm:px-7 sm:pb-8 sm:pt-7"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close modal"
          onClick={onClose}
          className="absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#E8E8E8] text-[#7C7C7C] transition hover:bg-[#DDDDDD]"
        >
          <X size={18} strokeWidth={2} />
        </button>

        <div className="pr-12">
          <h2 className="mt-5 font-beb text-[24px] font-extrabold uppercase leading-none tracking-[0.01em] text-[#0D1B3E] sm:text-[32px]">
            Business Support
          </h2>

          <p className="mt-8  font-dm text-[13px] leading-[1.6] text-[#6B6F7B] sm:text-[14px]">
            Business Support &amp; Growth Programme — Tell us about your business
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`mt-6 space-y-4 ${loading ? "opacity-70 pointer-events-none" : ""}`}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-4">
            <Field label="FULL NAME *" htmlFor="fullName" error={errors.fullName}>
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

            <Field label="EMAIL ADDRESS *" htmlFor="email" error={errors.email}>
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
          </div>

          <Field
            label="BUSINESS NAME *"
            htmlFor="businessName"
            error={errors.businessName}
          >
            <input
              id="businessName"
              name="businessName"
              type="text"
              placeholder="Your business name"
              value={formData.businessName}
              onChange={handleInputChange}
              className={inputClass(errors.businessName)}
            />
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-4">
            <Field
              label="STAGE OF BUSINESS *"
              htmlFor="stageOfBusiness"
              error={errors.stageOfBusiness}
            >
              <select
                id="stageOfBusiness"
                name="stageOfBusiness"
                value={formData.stageOfBusiness}
                onChange={handleInputChange}
                className={inputClass(errors.stageOfBusiness)}
              >
                <option value="">Select stage</option>
                {stageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="INDUSTRY *" htmlFor="industry" error={errors.industry}>
              <input
                id="industry"
                name="industry"
                type="text"
                placeholder="Your industry"
                value={formData.industry}
                onChange={handleInputChange}
                className={inputClass(errors.industry)}
              />
            </Field>
          </div>

          <Field label="WHAT SUPPORT DO YOU NEED?" htmlFor="supportNeeded">
            <div className="grid grid-cols-1 gap-x-10 gap-y-3 pt-1 sm:grid-cols-2">
              {supportOptions.map((option) => {
                const selected = formData.supportNeeded.includes(option);

                return (
                  <label
                    key={option}
                    className="flex cursor-pointer items-center gap-3 text-[14px] leading-[1.5] text-[#3F4656]"
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleArrayValue("supportNeeded", option)}
                      className="h-4 w-4 rounded border-[#D5D5D5] text-[#0D1B3E] focus:ring-[#0D1B3E]"
                    />
                    <span>{option}</span>
                  </label>
                );
              })}
            </div>
          </Field>

          <Field
            label="MONTHLY REVENUE (OPTIONAL)"
            htmlFor="monthlyRevenue"
            error={errors.monthlyRevenue}
          >
            <input
              id="monthlyRevenue"
              name="monthlyRevenue"
              type="text"
              placeholder="e.g. £0 – £5k"
              value={formData.monthlyRevenue}
              onChange={handleInputChange}
              className={inputClass(errors.monthlyRevenue)}
            />
          </Field>

          <Field
            label="BIGGEST CHALLENGE RIGHT NOW *"
            htmlFor="biggestChallenge"
            error={errors.biggestChallenge}
          >
            <textarea
              id="biggestChallenge"
              name="biggestChallenge"
              rows={4}
              placeholder="Describe your main challenge..."
              value={formData.biggestChallenge}
              onChange={handleInputChange}
              className={`${inputClass(errors.biggestChallenge)} min-h-[92px] resize-none py-4`}
            />
          </Field>

          <Field label="INTERESTED IN" htmlFor="interestedIn">
            <div className="grid grid-cols-1 gap-x-10 gap-y-3 pt-1 sm:grid-cols-2">
              {interestedOptions.map((option) => {
                const selected = formData.interestedIn.includes(option);

                return (
                  <label
                    key={option}
                    className="flex cursor-pointer items-center gap-3 text-[14px] leading-[1.5] text-[#3F4656]"
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleArrayValue("interestedIn", option)}
                      className="h-4 w-4 rounded border-[#D5D5D5] text-[#0D1B3E] focus:ring-[#0D1B3E]"
                    />
                    <span>{option}</span>
                  </label>
                );
              })}
            </div>
          </Field>

          <button
            type="submit"
            disabled={loading || !isFormValid}
            className="mt-2 inline-flex h-[52px] w-full items-center justify-center rounded-[16px] bg-[#0D1B3E] px-6 text-[15px] font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Submitting..." : "Submit Application →"}
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
        className="mb-1.5 font-dm block text-[12px] font-extrabold uppercase tracking-[0.04em] text-[#0D1B3E]"
      >
        {label}
      </label>
      {children}
      {error ? <p className="mt-1 text-[11px] text-red-600">{error}</p> : null}
    </div>
  );
}

function inputClass(error?: string) {
  return [
    "h-[50px] w-full rounded-[12px] border bg-[#F3F3F3] px-4 text-[14px] text-[#0D1B3E] outline-none transition",
    "placeholder:text-[#8C94A6]",
    error
      ? "border-red-400 focus:border-red-500"
      : "border-[#D5D5D5] focus:border-[#0D1B3E]/50",
  ].join(" ");
}