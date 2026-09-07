import Spinner from "./Spinner";

export default function PageLoader({
  message = "Loading…",
  submessage,
  fullScreen = true,
  className = "",
}: {
  message?: string;
  submessage?: string;
  fullScreen?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 px-6 text-center ${
        fullScreen ? "min-h-[50vh] w-full" : "py-12"
      } ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="relative flex items-center justify-center">
        <div className="absolute h-16 w-16 rounded-full bg-[#FFD700]/10 animate-pulse" />
        <Spinner size="lg" tone="brand" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-[#001F3F]">{message}</p>
        {submessage && <p className="text-xs text-[#6B7280]">{submessage}</p>}
      </div>
    </div>
  );
}
