/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

type SpeakerApplicationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  organisation: string;
  areaOfExpertise: string;
  speakingTopics: string;
  previousSpeakingExperience: string;
  availability: string;
  link: string;
  whySpeaker: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialForm: FormData = {
  fullName: "",
  email: "",
  phoneNumber: "",
  organisation: "",
  areaOfExpertise: "",
  speakingTopics: "",
  previousSpeakingExperience: "",
  availability: "",
  link: "",
  whySpeaker: "",
};

export default function SpeakerApplicationModal({
  isOpen,
  onClose,
}: SpeakerApplicationModalProps) {
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
      formData.organisation.trim() &&
      formData.areaOfExpertise.trim() &&
      formData.speakingTopics.trim() &&
      formData.whySpeaker.trim()
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

    if (!formData.organisation.trim()) {
      nextErrors.organisation = "Organisation is required";
    }

    if (!formData.areaOfExpertise.trim()) {
      nextErrors.areaOfExpertise = "Area of expertise is required";
    }

    if (!formData.speakingTopics.trim()) {
      nextErrors.speakingTopics = "Please list 2 or 3 topics";
    }

    if (!formData.whySpeaker.trim()) {
      nextErrors.whySpeaker = "Please tell us why you should be a speaker";
    }

    if (
      formData.link.trim() &&
      !/^https?:\/\/.+/i.test(formData.link.trim())
    ) {
      nextErrors.link = "Enter a valid URL starting with http:// or https://";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await axios.post("/api/speaker", formData);

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
        className="relative max-h-[95vh] w-full max-w-[676px] overflow-y-auto rounded-[20px] bg-[#F3F3F3] px-5 pb-6 pt-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)] sm:px-8 sm:pb-8 sm:pt-8"
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
          <h2 className="text-[24px] font-beb mt-5 font-extrabold uppercase leading-none tracking-[0.01em] text-[#0D1B3E] sm:text-[32px]">
            Speaker Application
          </h2>

          <p className="mt-8  font-dm text-[13px] leading-[1.6] text-[#6B6F7B] sm:text-[14px]">
            Apply to speak at a future South Yorkshire Black Tech Expo event
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
              label="ORGANISATION *"
              htmlFor="organisation"
              error={errors.organisation}
            >
              <input
                id="organisation"
                name="organisation"
                type="text"
                placeholder="Your company or organisation"
                value={formData.organisation}
                onChange={handleInputChange}
                className={inputClass(errors.organisation)}
              />
            </Field>
          </div>

          <Field
            label="AREA OF EXPERTISE *"
            htmlFor="areaOfExpertise"
            error={errors.areaOfExpertise}
          >
            <input
              id="areaOfExpertise"
              name="areaOfExpertise"
              type="text"
              placeholder="e.g. AI, Fintech, Health Tech, Education..."
              value={formData.areaOfExpertise}
              onChange={handleInputChange}
              className={inputClass(errors.areaOfExpertise)}
            />
          </Field>

          <Field
            label="SPEAKING TOPICS (LIST 2–3) *"
            htmlFor="speakingTopics"
            error={errors.speakingTopics}
          >
            <textarea
              id="speakingTopics"
              name="speakingTopics"
              rows={4}
              placeholder="List 2 or 3 topics you can speak on..."
              value={formData.speakingTopics}
              onChange={handleInputChange}
              className={`${inputClass(errors.speakingTopics)} min-h-[92px] resize-none py-4`}
            />
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-4">
            <Field
              label="PREVIOUS SPEAKING EXPERIENCE?"
              htmlFor="previousSpeakingExperience"
              error={errors.previousSpeakingExperience}
            >
              <input
                id="previousSpeakingExperience"
                name="previousSpeakingExperience"
                type="text"
                placeholder=""
                value={formData.previousSpeakingExperience}
                onChange={handleInputChange}
                className={inputClass(errors.previousSpeakingExperience)}
              />
            </Field>

            <Field
              label="AVAILABILITY"
              htmlFor="availability"
              error={errors.availability}
            >
              <input
                id="availability"
                name="availability"
                type="text"
                placeholder="Specific dates or flexible"
                value={formData.availability}
                onChange={handleInputChange}
                className={inputClass(errors.availability)}
              />
            </Field>
          </div>

          <Field
            label="LINK TO VIDEO / LINKEDIN (OPTIONAL)"
            htmlFor="link"
            error={errors.link}
          >
            <input
              id="link"
              name="link"
              type="text"
              placeholder="https://..."
              value={formData.link}
              onChange={handleInputChange}
              className={inputClass(errors.link)}
            />
          </Field>

          <Field
            label="WHY SHOULD YOU BE A SPEAKER? *"
            htmlFor="whySpeaker"
            error={errors.whySpeaker}
          >
            <textarea
              id="whySpeaker"
              name="whySpeaker"
              rows={4}
              placeholder="Tell us what makes you the right voice for our audience..."
              value={formData.whySpeaker}
              onChange={handleInputChange}
              className={`${inputClass(errors.whySpeaker)} min-h-[92px] resize-none py-4`}
            />
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