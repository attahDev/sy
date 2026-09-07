function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={`feedback-skeleton rounded-md ${className}`} aria-hidden="true" />;
}

function RowSkeletonItem() {
  return (
    <div
      className="flex items-center gap-3 rounded-xl border border-[#001F3F]/5 bg-[#FFFDF7] p-4"
      aria-hidden="true"
    >
      <SkeletonBlock className="h-10 w-10 shrink-0 rounded-full" />
      <div className="min-w-0 flex-1 space-y-2">
        <SkeletonBlock className="h-3.5 w-1/3" />
        <SkeletonBlock className="h-3 w-2/3" />
      </div>
      <SkeletonBlock className="h-8 w-20 rounded-lg" />
    </div>
  );
}

export default function ContentSkeleton({
  className = "",
  count = 1,
}: {
  variant?: "row" | "card";
  className?: string;
  count?: number;
}) {
  const items = Array.from({ length: count });

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((_, i) => (
        <RowSkeletonItem key={i} />
      ))}
    </div>
  );
}
