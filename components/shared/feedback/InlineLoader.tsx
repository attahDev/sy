import Spinner from "./Spinner";

export default function InlineLoader({
  label,
  size = "sm",
  className = "",
}: {
  label?: string;
  size?: "xs" | "sm" | "md";
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 text-sm text-[#6B7280] ${className}`}>
      <Spinner size={size} tone="navy" />
      {label && <span>{label}</span>}
    </span>
  );
}
