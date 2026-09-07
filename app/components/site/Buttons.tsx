"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { useSiteModal, type ModalKey } from "./modal-context";

export type ButtonVariant =
  | "gold"
  | "red"
  | "navy"
  | "outlineLight"
  | "outlineDark"
  | "ghostLight";

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-[14px] font-semibold tracking-[0.01em] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2";

const variants: Record<ButtonVariant, string> = {
  gold: "bg-[#FFD700] text-[#0D1B3E] shadow-[0_10px_30px_-14px_rgba(245,166,35,0.75)] hover:bg-[#FFE23F] hover:shadow-[0_16px_38px_-14px_rgba(245,166,35,0.85)]",
  red: "bg-[#D7263D] text-white shadow-[0_10px_30px_-14px_rgba(215,38,61,0.8)] hover:bg-[#B81F32]",
  navy: "bg-[#0D1B3E] text-white hover:bg-[#16295A]",
  outlineLight:
    "border-[1.33px] border-[#FFFFFF59] text-white backdrop-blur-[2px] hover:border-white hover:bg-white/10",
  outlineDark:
    "border-[1.33px] border-[#0D1B3E33] text-[#0D1B3E] hover:border-[#0D1B3E] hover:bg-[#0D1B3E] hover:text-white",
  ghostLight: "text-white/80 hover:text-white",
};

const sizes = {
  sm: "h-[44px] px-5 text-[14px]",
  md: "h-[52px] px-7 text-[15px]",
  lg: "h-[58px] px-8 text-[16px]",
} as const;

type Size = keyof typeof sizes;

function classes(variant: ButtonVariant, size: Size, className?: string) {
  return [base, variants[variant], sizes[size], className].filter(Boolean).join(" ");
}

const arrow =
  "h-[17px] w-[17px] shrink-0 transition-transform duration-200 group-hover:translate-x-1";

/** Button that opens one of the site-wide application forms. */
export function ModalButton({
  modal,
  children,
  variant = "gold",
  size = "md",
  className,
  withArrow = false,
}: {
  modal: ModalKey;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: Size;
  className?: string;
  withArrow?: boolean;
}) {
  const { openModal } = useSiteModal();

  return (
    <button
      type="button"
      onClick={() => openModal(modal)}
      className={classes(variant, size, className)}
    >
      {children}
      {withArrow && <ArrowRight className={arrow} aria-hidden />}
    </button>
  );
}

/**
 * Unstyled modal trigger. Use when the surrounding layout supplies all of the
 * styling (e.g. a full-width card or list row) and the button presets would
 * conflict with it.
 */
export function ModalTrigger({
  modal,
  children,
  className,
  ariaLabel,
}: {
  modal: ModalKey;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const { openModal } = useSiteModal();

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={() => openModal(modal)}
      className={className}
    >
      {children}
    </button>
  );
}

/** Same visual language as ModalButton, but navigates to a route. */
export function ActionLink({
  href,
  children,
  variant = "outlineDark",
  size = "md",
  className,
  withArrow = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: Size;
  className?: string;
  withArrow?: boolean;
}) {
  return (
    <Link href={href} className={classes(variant, size, className)}>
      {children}
      {withArrow && <ArrowRight className={arrow} aria-hidden />}
    </Link>
  );
}

/** Understated inline text link with a sliding arrow. */
export function TextLink({
  href,
  children,
  tone = "dark",
  className,
}: {
  href: string;
  children: React.ReactNode;
  tone?: "dark" | "light" | "gold";
  className?: string;
}) {
  const tones = {
    dark: "text-[#D7263D] hover:text-[#0D1B3E]",
    light: "text-white/85 hover:text-white",
    gold: "text-[#F5A623] hover:text-[#FFD700]",
  } as const;

  return (
    <Link
      href={href}
      className={[
        "group inline-flex items-center gap-2 font-open text-[15px] font-semibold transition-colors duration-200",
        tones[tone],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
      <ArrowRight className={arrow} aria-hidden />
    </Link>
  );
}
