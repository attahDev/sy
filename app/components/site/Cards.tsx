import { Check, Quote } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import Reveal from "./Reveal";

/** Icon + title + copy card on a light background. */
export function FeatureCard({
  icon: Icon,
  title,
  description,
  delay = 0,
  accent = "red",
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
  accent?: "red" | "gold" | "navy" | "orange";
}) {
  const accents = {
    red: "bg-[#D7263D14] text-[#D7263D]",
    gold: "bg-[#F5A62321] text-[#B27A0C]",
    navy: "bg-[#0D1B3E12] text-[#0D1B3E]",
    orange: "bg-[#E8440A14] text-[#E8440A]",
  } as const;

  return (
    <Reveal
      as="article"
      delay={delay}
      className="group flex h-full flex-col rounded-[22px] border border-[#DADDE2] bg-white p-7 transition duration-300 hover:-translate-y-1.5 hover:border-[#0D1B3E26] hover:shadow-[0_28px_60px_-38px_rgba(13,27,62,0.42)] sm:p-8"
    >
      <span
        className={`inline-flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[16px] transition-transform duration-300 group-hover:scale-105 ${accents[accent]}`}
      >
        <Icon className="h-[23px] w-[23px]" aria-hidden />
      </span>

      <h3 className="mt-7 text-[19px] font-semibold leading-[1.3] tracking-[-0.015em] text-[#001F3F] sm:text-[20px]">
        {title}
      </h3>

      <p className="mt-4 font-open text-[15px] leading-[1.7] text-[#555555] sm:text-[16px]">
        {description}
      </p>
    </Reveal>
  );
}

/** Icon + title + copy card on a dark background. */
export function DarkFeatureCard({
  icon: Icon,
  title,
  description,
  delay = 0,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}) {
  return (
    <Reveal
      as="article"
      delay={delay}
      className="group flex h-full flex-col rounded-[22px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-[2px] transition duration-300 hover:-translate-y-1.5 hover:border-[#FFD70059] hover:bg-white/[0.075] sm:p-8"
    >
      <span className="inline-flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[16px] bg-[#FFD7001F] text-[#FFD700] transition-transform duration-300 group-hover:scale-105">
        <Icon className="h-[23px] w-[23px]" aria-hidden />
      </span>

      <h3 className="mt-7 text-[19px] font-semibold leading-[1.3] tracking-[-0.015em] text-white sm:text-[20px]">
        {title}
      </h3>

      <p className="mt-4 font-open text-[15px] leading-[1.7] text-[#FFFFFFA6] sm:text-[16px]">
        {description}
      </p>
    </Reveal>
  );
}

/** Checklist grid used for focus areas and measurement lists. */
export function CheckList({
  items,
  tone = "light",
  columns = 2,
  className,
}: {
  items: string[];
  tone?: "light" | "dark";
  columns?: 1 | 2 | 3;
  className?: string;
}) {
  const dark = tone === "dark";
  const cols = {
    1: "sm:grid-cols-1",
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
  } as const;

  return (
    <ul
      className={["grid grid-cols-1 gap-x-8 gap-y-4", cols[columns], className]
        .filter(Boolean)
        .join(" ")}
    >
      {items.map((item, index) => (
        <Reveal
          as="li"
          key={item}
          delay={Math.min(index * 45, 360)}
          className={[
            "flex items-start gap-3.5 border-b pb-4 font-open text-[15px] leading-[1.65] sm:text-[16px]",
            dark
              ? "border-white/10 text-[#FFFFFFB8]"
              : "border-[#E6E3DC] text-[#444444]",
          ].join(" ")}
        >
          <span
            className={[
              "mt-[3px] inline-flex h-[21px] w-[21px] shrink-0 items-center justify-center rounded-full",
              dark ? "bg-[#FFD7001F] text-[#FFD700]" : "bg-[#D7263D14] text-[#D7263D]",
            ].join(" ")}
          >
            <Check className="h-[12px] w-[12px]" strokeWidth={3} aria-hidden />
          </span>
          {item}
        </Reveal>
      ))}
    </ul>
  );
}

/** Single headline metric. */
export function StatCard({
  value,
  label,
  note,
  delay = 0,
  tone = "light",
}: {
  value: string;
  label: string;
  note?: string;
  delay?: number;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";

  return (
    <Reveal
      delay={delay}
      className={[
        "relative flex h-full flex-col overflow-hidden rounded-[22px] p-7 transition duration-300 hover:-translate-y-1.5 sm:p-8",
        dark
          ? "border border-white/10 bg-white/[0.045] hover:border-[#FFD70059]"
          : "border border-[#DADDE2] bg-white hover:shadow-[0_28px_60px_-38px_rgba(13,27,62,0.4)]",
      ].join(" ")}
    >
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-[4px] bg-gradient-to-b from-[#D7263D] to-[#F5A623]"
      />

      <span
        className={[
          "text-[40px] font-semibold leading-none tracking-[-0.03em] sm:text-[48px]",
          dark ? "text-[#FFD700]" : "text-[#0D1B3E]",
        ].join(" ")}
      >
        {value}
      </span>

      <span
        className={[
          "mt-4 text-[15px] font-semibold leading-[1.4] tracking-[-0.01em] sm:text-[16px]",
          dark ? "text-white" : "text-[#001F3F]",
        ].join(" ")}
      >
        {label}
      </span>

      {note && (
        <span
          className={[
            "mt-3 font-open text-[13px] leading-[1.6] sm:text-[14px]",
            dark ? "text-[#FFFFFF8C]" : "text-[#6B6B6B]",
          ].join(" ")}
        >
          {note}
        </span>
      )}
    </Reveal>
  );
}

/** Initials tile used in place of headshots until photography is supplied. */
export function Monogram({
  name,
  className,
  size = "md",
}: {
  name: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const initials = name
    .replace(/^(Dr|Mr|Mrs|Ms|Prof)\.?\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const sizes = {
    sm: "h-[56px] w-[56px] text-[19px]",
    md: "h-[80px] w-[80px] text-[27px]",
    lg: "h-full w-full text-[54px] sm:text-[68px]",
  } as const;

  return (
    <span
      aria-hidden
      className={[
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-[18px] font-semibold tracking-[0.02em] text-white",
        sizes[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        background:
          "linear-gradient(140deg, #16295A 0%, #0D1B3E 45%, #D7263D 190%)",
      }}
    >
      <span className="grid-overlay absolute inset-0 opacity-60" />
      <span className="relative">{initials}</span>
    </span>
  );
}

/** Pull quote card. */
export function QuoteCard({
  quote,
  attribution,
  role,
  tone = "light",
  delay = 0,
}: {
  quote: string;
  attribution: string;
  role?: string;
  tone?: "light" | "dark";
  delay?: number;
}) {
  const dark = tone === "dark";

  return (
    <Reveal
      as="article"
      delay={delay}
      className={[
        "flex h-full flex-col rounded-[22px] p-8 sm:p-9",
        dark
          ? "border border-white/10 bg-white/[0.045]"
          : "border border-[#DADDE2] bg-[#FAF8F3]",
      ].join(" ")}
    >
      <Quote
        className={dark ? "h-[26px] w-[26px] text-[#FFD700]" : "h-[26px] w-[26px] text-[#D7263D]"}
        aria-hidden
      />

      <blockquote
        className={[
          "mt-6 flex-1 font-open text-[17px] leading-[1.7] sm:text-[19px]",
          dark ? "text-[#FFFFFFD9]" : "text-[#333333]",
        ].join(" ")}
      >
        &ldquo;{quote}&rdquo;
      </blockquote>

      <footer className="mt-7 flex items-center gap-4">
        <Monogram name={attribution} size="sm" />
        <div>
          <p
            className={[
              "text-[15px] font-semibold leading-tight",
              dark ? "text-white" : "text-[#001F3F]",
            ].join(" ")}
          >
            {attribution}
          </p>
          {role && (
            <p
              className={[
                "mt-1.5 font-open text-[13px] leading-tight",
                dark ? "text-[#FFFFFF8C]" : "text-[#6B6B6B]",
              ].join(" ")}
            >
              {role}
            </p>
          )}
        </div>
      </footer>
    </Reveal>
  );
}

/** Small status chip, e.g. "Delivery partner" or "To be confirmed". */
export function Chip({
  children,
  variant = "neutral",
}: {
  children: React.ReactNode;
  variant?: "confirmed" | "pending" | "neutral" | "gold";
}) {
  const variants = {
    confirmed: "border-[#1F7A4D33] bg-[#1F7A4D14] text-[#1B6B44]",
    pending: "border-[#B27A0C33] bg-[#F5A6231F] text-[#8A5D06]",
    neutral: "border-[#0D1B3E1F] bg-[#0D1B3E0A] text-[#3B4C74]",
    gold: "border-[#FFD70047] bg-[#FFD7001A] text-[#FFD700]",
  } as const;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-open text-[11px] font-semibold uppercase tracking-[0.12em] ${variants[variant]}`}
    >
      {children}
    </span>
  );
}

/** Notice panel for the PDF's governance / data-accuracy callouts. */
export function NoteCallout({
  title,
  children,
  icon: Icon,
  tone = "light",
}: {
  title: string;
  children: React.ReactNode;
  icon: LucideIcon;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";

  return (
    <Reveal
      className={[
        "flex flex-col gap-5 rounded-[22px] border-l-[4px] p-7 sm:flex-row sm:gap-6 sm:p-8",
        dark
          ? "border-l-[#FFD700] bg-white/[0.05] "
          : "border-l-[#F5A623] bg-[#FFFBF0] ",
      ].join(" ")}
    >
      <span
        className={[
          "inline-flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[14px]",
          dark ? "bg-[#FFD7001F] text-[#FFD700]" : "bg-[#F5A62321] text-[#B27A0C]",
        ].join(" ")}
      >
        <Icon className="h-[21px] w-[21px]" aria-hidden />
      </span>

      <div>
        <h3
          className={[
            "text-[17px] font-semibold leading-tight tracking-[-0.01em]",
            dark ? "text-white" : "text-[#001F3F]",
          ].join(" ")}
        >
          {title}
        </h3>
        <div
          className={[
            "mt-3 space-y-3 font-open text-[14px] leading-[1.7] sm:text-[15px]",
            dark ? "text-[#FFFFFFA6]" : "text-[#5A5A5A]",
          ].join(" ")}
        >
          {children}
        </div>
      </div>
    </Reveal>
  );
}
