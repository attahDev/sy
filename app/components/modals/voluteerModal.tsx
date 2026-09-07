/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

type VolunteerModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  location: string;
  occupation: string;
  areaOfInterest: string;
  availability: string;
  previousExperience: string;
  whyVolunteer: string;
  link: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialForm: FormData = {
  fullName: "",
  email: "",
  phoneNumber: "",
  location: "",
  occupation: "",
  areaOfInterest: "",
  availability: "",
  previousExperience: "",
  whyVolunteer: "",
  link: "",
};

export default function VolunteerModal({ isOpen, onClose }: VolunteerModalProps) {
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
      formData.phoneNumber.trim() &&
      formData.location.trim() &&
      formData.areaOfInterest.trim() &&
      formData.availability.trim() &&
      formData.whyVolunteer.trim()
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

    if (!formData.phoneNumber.trim()) {
      nextErrors.phoneNumber = "Phone number is required";
    }

    if (!formData.location.trim()) {
      nextErrors.location = "Location is required";
    }

    if (!formData.areaOfInterest.trim()) {
      nextErrors.areaOfInterest = "Area of interest is required";
    }

    if (!formData.availability.trim()) {
      nextErrors.availability = "Availability is required";
    }

    if (!formData.whyVolunteer.trim()) {
      nextErrors.whyVolunteer = "Please tell us why you want to volunteer";
    }

    if (formData.link.trim() && !/^https?:\/\/.+/i.test(formData.link.trim())) {
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
      const res = await axios.post("/api/volunteer", formData);

      toast.success(res.data.message || "Volunteer application submitted successfully");

      setFormData(initialForm);
      setErrors({});
      onClose();
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Something went wrong";

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
          <h2 className="mt-5 font-beb text-[24px] font-extrabold uppercase leading-none tracking-[0.01em] text-[#0D1B3E] sm:text-[32px]">
            Volunteer Application
          </h2>

          <p className="mt-8 font-dm text-[13px] leading-[1.6] text-[#6B6F7B] sm:text-[14px]">
            Join the South Yorkshire Black Tech Expo volunteer team and help us
            create impactful experiences for the community.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

            <Field label="PHONE NUMBER *" htmlFor="phoneNumber" error={errors.phoneNumber}>
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

            <Field label="LOCATION / CITY *" htmlFor="location" error={errors.location}>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="e.g. Sheffield"
                value={formData.location}
                onChange={handleInputChange}
                className={inputClass(errors.location)}
              />
            </Field>
          </div>

          <Field label="OCCUPATION / SCHOOL" htmlFor="occupation" error={errors.occupation}>
            <input
              id="occupation"
              name="occupation"
              type="text"
              placeholder="Your job title, school, or organisation"
              value={formData.occupation}
              onChange={handleInputChange}
              className={inputClass(errors.occupation)}
            />
          </Field>

          <Field
            label="AREA OF INTEREST *"
            htmlFor="areaOfInterest"
            error={errors.areaOfInterest}
          >
            <input
              id="areaOfInterest"
              name="areaOfInterest"
              type="text"
              placeholder="Event support, media, logistics, registration, tech support..."
              value={formData.areaOfInterest}
              onChange={handleInputChange}
              className={inputClass(errors.areaOfInterest)}
            />
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="AVAILABILITY *" htmlFor="availability" error={errors.availability}>
              <input
                id="availability"
                name="availability"
                type="text"
                placeholder="Weekdays, weekends, event days, flexible..."
                value={formData.availability}
                onChange={handleInputChange}
                className={inputClass(errors.availability)}
              />
            </Field>

            <Field
              label="PREVIOUS VOLUNTEER EXPERIENCE"
              htmlFor="previousExperience"
              error={errors.previousExperience}
            >
              <input
                id="previousExperience"
                name="previousExperience"
                type="text"
                placeholder="Briefly mention any experience"
                value={formData.previousExperience}
                onChange={handleInputChange}
                className={inputClass(errors.previousExperience)}
              />
            </Field>
          </div>

          <Field label="LINKEDIN / PORTFOLIO (OPTIONAL)" htmlFor="link" error={errors.link}>
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
            label="WHY DO YOU WANT TO VOLUNTEER? *"
            htmlFor="whyVolunteer"
            error={errors.whyVolunteer}
          >
            <textarea
              id="whyVolunteer"
              name="whyVolunteer"
              rows={4}
              placeholder="Tell us why you would like to support the event..."
              value={formData.whyVolunteer}
              onChange={handleInputChange}
              className={`${inputClass(errors.whyVolunteer)} min-h-[92px] resize-none py-4`}
            />
          </Field>

          <button
            type="submit"
            disabled={loading || !isFormValid}
            className="mt-2 inline-flex h-[52px] w-full items-center justify-center rounded-[16px] bg-[#0D1B3E] px-6 text-[15px] font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Submitting..." : "Apply to Volunteer →"}
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
        className="mb-1.5 block font-dm text-[12px] font-extrabold uppercase tracking-[0.04em] text-[#0D1B3E]"
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