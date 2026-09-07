type SpinnerSize = "xs" | "sm" | "md" | "lg";
type SpinnerTone = "brand" | "light" | "navy" | "gold";

const SIZE_MAP: Record<SpinnerSize, string> = {
  xs: "h-3.5 w-3.5",
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-10 w-10",
};

const TONE_MAP: Record<SpinnerTone, string> = {
  brand: "border-[#001F3F]/15 border-t-[#FFD700]",
  light: "border-white/25 border-t-white",
  navy: "border-[#001F3F]/15 border-t-[#001F3F]",
  gold: "border-[#FFD700]/25 border-t-[#FFD700]",
};

export default function Spinner({
  size = "md",
  tone = "brand",
  className = "",
  label = "Loading",
}: {
  size?: SpinnerSize;
  tone?: SpinnerTone;
  className?: string;
  label?: string;
}) {
  return (
    <span
      role="status"
      aria-label={label}
      className={`inline-block animate-spin rounded-full border-2 ${SIZE_MAP[size]} ${TONE_MAP[tone]} ${className}`}
    />
  );
}
