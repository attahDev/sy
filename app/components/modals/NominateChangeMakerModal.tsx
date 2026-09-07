/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type FormData = {
  yourName: string;
  yourEmail: string;
  nomineeName: string;
  nomineeOrganisation: string;
  nomineeLocation: string;
  category: string;
  whyNominate: string;
  achievements: string;
  links: string;
  referee: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

const categories = [
  "Community Impact",
  "Innovation",
  "Leadership",
  "Youth Impact",
  "Technology",
];

const initialForm: FormData = {
  yourName: "",
  yourEmail: "",
  nomineeName: "",
  nomineeOrganisation: "",
  nomineeLocation: "",
  category: "",
  whyNominate: "",
  achievements: "",
  links: "",
  referee: "",
};

export default function NominateChangeMakerModal({
  isOpen,
  onClose,
}: Props) {
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, [isOpen]);

  const isValid = useMemo(() => {
    return Boolean(
      formData.yourName &&
        formData.yourEmail &&
        formData.nomineeName &&
        formData.category &&
        formData.whyNominate
    );
  }, [formData]);

  const validate = () => {
    const e: Errors = {};

    if (!formData.yourName.trim()) e.yourName = "Required";
    if (!formData.yourEmail.trim()) e.yourEmail = "Required";
    if (!formData.nomineeName.trim()) e.nomineeName = "Required";
    if (!formData.category.trim()) e.category = "Required";
    if (!formData.whyNominate.trim()) e.whyNominate = "Required";

    if (
      formData.yourEmail &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.yourEmail)
    ) {
      e.yourEmail = "Invalid email";
    }

    if (formData.links && !/^https?:\/\/.+/.test(formData.links)) {
      e.links = "Invalid URL";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (
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

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await axios.post("/api/norminate", formData);

      toast.success(res.data.message || "Nomination submitted successfully");

      setFormData(initialForm);
      setErrors({});

      setTimeout(() => {
        onClose();
      }, 800);
    } catch (error: any) {
      console.log("ERROR:", error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#0D1B3EBF]"
      onClick={onClose}
    >
      <div className="h-full w-full overflow-y-auto px-3 py-4 sm:px-4 sm:py-6">
        <div className="min-h-full flex items-start justify-center sm:items-center">
          <div
            className="relative w-full max-w-[680px] rounded-[20px] bg-[#F3F3F3] p-5 shadow-xl sm:p-8 max-h-[calc(100vh-2rem)] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE */}
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#E8E8E8] sm:right-5 sm:top-5"
            >
              <X size={18} />
            </button>

            {/* HEADER */}
            <h2 className="mt-8 pr-12 text-[22px] font-beb font-extrabold uppercase leading-tight text-[#0D1B3E] sm:mt-5 sm:text-[24px] md:text-[32px]">
              Nominate a Change Maker
            </h2>

            <p className="mt-4 font-dm text-[14px] leading-relaxed text-[#6B6F7B] sm:mt-6">
              Recognise someone driving real community impact in South Yorkshire
            </p>

            {/* FORM */}
            <form onSubmit={submit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="YOUR NAME (NOMINATOR) *" error={errors.yourName}>
                  <input
                    name="yourName"
                    placeholder="Your full name"
                    value={formData.yourName}
                    onChange={handleChange}
                    className={input(errors.yourName)}
                  />
                </Field>

                <Field label="YOUR EMAIL *" error={errors.yourEmail}>
                  <input
                    name="yourEmail"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.yourEmail}
                    onChange={handleChange}
                    className={input(errors.yourEmail)}
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="NOMINEE FULL NAME *" error={errors.nomineeName}>
                  <input
                    name="nomineeName"
                    placeholder="Who are you nominating?"
                    value={formData.nomineeName}
                    onChange={handleChange}
                    className={input(errors.nomineeName)}
                  />
                </Field>

                <Field label="NOMINEE ORGANISATION">
                  <input
                    name="nomineeOrganisation"
                    placeholder="Their company or org"
                    value={formData.nomineeOrganisation}
                    onChange={handleChange}
                    className={input()}
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="NOMINEE LOCATION">
                  <input
                    name="nomineeLocation"
                    placeholder="City / Region"
                    value={formData.nomineeLocation}
                    onChange={handleChange}
                    className={input()}
                  />
                </Field>

                <Field label="CATEGORY *" error={errors.category}>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={input(errors.category)}
                  >
                    <option value="">Select category</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field
                label="WHY ARE YOU NOMINATING THIS PERSON? *"
                error={errors.whyNominate}
              >
                <textarea
                  name="whyNominate"
                  placeholder="Tell us the story..."
                  value={formData.whyNominate}
                  onChange={handleChange}
                  className={textarea(errors.whyNominate)}
                />
              </Field>

              <Field label="KEY ACHIEVEMENTS">
                <textarea
                  name="achievements"
                  placeholder="List achievements..."
                  value={formData.achievements}
                  onChange={handleChange}
                  className={textarea()}
                />
              </Field>

              <Field label="SUPPORTING LINKS / EVIDENCE" error={errors.links}>
                <input
                  name="links"
                  placeholder="https://..."
                  value={formData.links}
                  onChange={handleChange}
                  className={input(errors.links)}
                />
              </Field>

              <Field label="REFEREE (OPTIONAL)">
                <input
                  name="referee"
                  placeholder="Name and contact"
                  value={formData.referee}
                  onChange={handleChange}
                  className={input()}
                />
              </Field>

              <button
                type="submit"
                disabled={!isValid || loading}
                className="mt-2 h-[52px] w-full rounded-[16px] bg-[#0D1B3E] font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Nomination →"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block font-dmm text-[12px] font-bold text-[#0D1B3E]">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-[11px] text-red-500">{error}</p>}
    </div>
  );
}

function input(error?: string) {
  return `w-full h-[50px] rounded-[12px] border px-4 text-[16px] outline-none ${
    error ? "border-red-400" : "border-[#D5D5D5]"
  } bg-[#F3F3F3] text-[#0D1B3E]`;
}

function textarea(error?: string) {
  return `w-full min-h-[110px] rounded-[12px] border px-4 py-3 text-[16px] outline-none resize-none ${
    error ? "border-red-400" : "border-[#D5D5D5]"
  } bg-[#F3F3F3] text-[#0D1B3E]`;
}