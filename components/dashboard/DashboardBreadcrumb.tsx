import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function DashboardBreadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-[13px] text-[#0D1B3E]/70">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-1.5">
          {item.href ? (
            <Link href={item.href} className="hover:underline">{item.label}</Link>
          ) : (
            <span className="font-medium text-[#0D1B3E]">{item.label}</span>
          )}
          {i < items.length - 1 && <ChevronRight size={13} />}
        </span>
      ))}
    </nav>
  );
}
