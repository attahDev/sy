/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

type CyberSecurityTrainingModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  organisationBusiness: string;
  roleJobTitle: string;
  levelOfKnowledge: string;
  areasOfInterest: string[];
  whatToLearn: string;
  preferredFormat: string;
  receiveUpdates: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const knowledgeOptions = [
  "Beginner",
  "Intermediate",
  "Advanced",
];

const interestOptions = [
  "Cyber Security",
  "GDPR",
  "Data Protection",
  "Risk & Compliance",
];

const formatOptions = [
  "Online",
  "In-person",
  "Hybrid",
];

const updateOptions = ["Yes", "No"];

const initialForm: FormData = {
  fullName: "",
  email: "",
  phoneNumber: "",
  organisationBusiness: "",
  roleJobTitle: "",
  levelOfKnowledge: "",
  areasOfInterest: [],
  whatToLearn: "",
  preferredFormat: "",
  receiveUpdates: "",
};

export default function CyberSecurityTrainingModal({
  isOpen,
  onClose,
}: CyberSecurityTrainingModalProps) {
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
      formData.levelOfKnowledge.trim() &&
      formData.whatToLearn.trim() &&
      formData.preferredFormat.trim()
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

    if (!formData.levelOfKnowledge.trim()) {
      nextErrors.levelOfKnowledge = "Please select your level of knowledge";
    }

    if (!formData.whatToLearn.trim()) {
      nextErrors.whatToLearn = "Please tell us what you want to learn";
    }

    if (!formData.preferredFormat.trim()) {
      nextErrors.preferredFormat = "Please select a preferred format";
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

  const toggleInterest = (value: string) => {
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
      const res = await axios.post("/api/cyber-training", formData);

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
        className="relative max-h-[95vh] w-full max-w-[684px] overflow-y-auto rounded-[20px] bg-[#F3F3F3] px-5 pb-6 pt-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)] sm:px-8 sm:pb-8 sm:pt-8"
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
          <h2 className="text-[24px] font-beb font-extrabold uppercase leading-none tracking-[0.01em] text-[#0D1B3E] sm:text-[26px]">
            Free Cyber Security Training
          </h2>

          <p className="mt-8  font-dm text-[13px] leading-[1.6] text-[#6B6F7B] sm:text-[14px]">
            GDPR, Data Protection, Risk &amp; Compliance — all levels welcome
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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

            <Field
              label="PHONE NUMBER"
              htmlFor="phoneNumber"
              error={errors.phoneNumber}
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
              label="ORGANISATION / BUSINESS"
              htmlFor="organisationBusiness"
              error={errors.organisationBusiness}
            >
              <input
                id="organisationBusiness"
                name="organisationBusiness"
                type="text"
                placeholder="Your company or org"
                value={formData.organisationBusiness}
                onChange={handleInputChange}
                className={inputClass(errors.organisationBusiness)}
              />
            </Field>

            <Field
              label="ROLE / JOB TITLE"
              htmlFor="roleJobTitle"
              error={errors.roleJobTitle}
            >
              <input
                id="roleJobTitle"
                name="roleJobTitle"
                type="text"
                placeholder="Your current role"
                value={formData.roleJobTitle}
                onChange={handleInputChange}
                className={inputClass(errors.roleJobTitle)}
              />
            </Field>

            <Field
              label="LEVEL OF KNOWLEDGE *"
              htmlFor="levelOfKnowledge"
              error={errors.levelOfKnowledge}
            >
              <select
                id="levelOfKnowledge"
                name="levelOfKnowledge"
                value={formData.levelOfKnowledge}
                onChange={handleInputChange}
                className={inputClass(errors.levelOfKnowledge)}
              >
                <option value="">Select level</option>
                {knowledgeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="AREAS OF INTEREST" htmlFor="areasOfInterest">
            <div className="grid grid-cols-1 gap-x-10 gap-y-3 pt-1 sm:grid-cols-2">
              {interestOptions.map((option) => {
                const selected = formData.areasOfInterest.includes(option);

                return (
                  <label
                    key={option}
                    className="flex cursor-pointer items-center gap-3 text-[14px] leading-[1.5] text-[#3F4656]"
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleInterest(option)}
                      className="h-4 w-4 rounded border-[#D5D5D5] text-[#0D1B3E] focus:ring-[#0D1B3E]"
                    />
                    <span>{option}</span>
                  </label>
                );
              })}
            </div>
          </Field>

          <Field
            label="WHAT DO YOU WANT TO LEARN? *"
            htmlFor="whatToLearn"
            error={errors.whatToLearn}
          >
            <textarea
              id="whatToLearn"
              name="whatToLearn"
              rows={4}
              placeholder="Tell us what you're hoping to learn or improve..."
              value={formData.whatToLearn}
              onChange={handleInputChange}
              className={`${inputClass(errors.whatToLearn)} min-h-[92px] resize-none py-4`}
            />
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-4">
            <Field
              label="PREFERRED FORMAT *"
              htmlFor="preferredFormat"
              error={errors.preferredFormat}
            >
              <select
                id="preferredFormat"
                name="preferredFormat"
                value={formData.preferredFormat}
                onChange={handleInputChange}
                className={inputClass(errors.preferredFormat)}
              >
                <option value="">Select format</option>
                {formatOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              label="RECEIVE FUTURE TRAINING UPDATES?"
              htmlFor="receiveUpdates"
              error={errors.receiveUpdates}
            >
              <select
                id="receiveUpdates"
                name="receiveUpdates"
                value={formData.receiveUpdates}
                onChange={handleInputChange}
                className={inputClass(errors.receiveUpdates)}
              >
                <option value="">Select option</option>
                {updateOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <button
            type="submit"
            disabled={loading || !isFormValid}
            className="mt-2 inline-flex h-[52px] w-full items-center justify-center rounded-[16px] bg-[#0D1B3E] px-6 text-[15px] font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Submitting..." : "Sign Me Up →"}
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