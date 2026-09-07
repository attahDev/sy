import { AlertCircle, Inbox, RefreshCw } from "lucide-react";
import type { ReactNode } from "react";
import InlineLoader from "./InlineLoader";

export default function SectionFeedback({
  variant,
  title,
  description,
  actionLabel,
  onAction,
  icon,
  className = "",
}: {
  variant: "empty" | "error" | "loading";
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: ReactNode;
  className?: string;
}) {
  if (variant === "loading") {
    return (
      <div
        className={`rounded-xl border border-[#E2E8F0] bg-white px-5 py-8 ${className}`}
        role="status"
        aria-live="polite"
      >
        <InlineLoader label={title} className="justify-center" />
      </div>
    );
  }

  const Icon =
    icon ??
    (variant === "error" ? (
      <AlertCircle className="h-5 w-5 text-[#D7263D]" strokeWidth={1.75} />
    ) : (
      <Inbox className="h-5 w-5 text-[#94A3B8]" strokeWidth={1.75} />
    ));

  return (
    <div
      className={`rounded-xl border border-[#E2E8F0] bg-white px-5 py-8 text-center sm:px-6 ${className}`}
      role={variant === "error" ? "alert" : "status"}
    >
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#F8FAFC]">
        {Icon}
      </div>
      <p className="text-sm font-semibold text-[#001F3F]">{title}</p>
      {description && (
        <p className="mx-auto mt-1 max-w-sm text-sm leading-relaxed text-[#6B7280]">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#001F3F] hover:text-[#D7263D] transition-colors"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          {actionLabel}
        </button>
      )}
    </div>
  );
}
