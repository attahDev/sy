// Ported as-is (react-router Link → next/link) from GMBT-Updated-Frontend's
// ClimateDashboard/Component/CourseCard.tsx.
import Link from "next/link";
import { Award, Clock3, Lock, Play } from "lucide-react";

const CREDIT_VALUE_GBP = 0.2;

type CourseCardProps = {
  title: string;
  image: string;
  duration: string;
  progress: number;
  slug: string;
  certificateAvailable?: boolean;
  basePath?: string;
  isPremium?: boolean;
  priceCredits?: number;
};

export function CourseCard({
  title, image, duration, progress, slug,
  certificateAvailable = true, basePath = "/dashboard/green-impact",
  isPremium = false, priceCredits = 0,
}: CourseCardProps) {
  const safeProgress = Math.min(Math.max(progress, 0), 100);
  const hasStarted = safeProgress > 0;
  const priceGBP = (priceCredits * CREDIT_VALUE_GBP).toFixed(2);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[14px] border border-[#E5E7EB] bg-[#FFFDF7] transition duration-300 hover:-translate-y-1 hover:shadow-[0px_12px_30px_rgba(0,31,63,0.10)]">
      <div className="relative h-[188px] w-full overflow-hidden">
        <img src={image} alt={title} loading="lazy" className="h-full w-full object-cover transition duration-500 hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-[7px] bg-white/90 px-3 py-2 text-[13px] font-medium text-[#0A0A0A] shadow-sm backdrop-blur">
          <Clock3 size={14} /> {duration}
        </div>
        {isPremium && (
          <div className="absolute left-4 top-4 flex items-center gap-1 rounded-[7px] bg-[#0D1B3E] px-2.5 py-1.5 text-[12px] font-semibold text-[#FFD700] shadow-sm">
            <Lock size={12} /> Premium
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col px-[18px] pb-[18px] pt-[18px]">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[20px] font-semibold leading-[1.3] tracking-[-0.02em] text-[#0D1B3E]">{title}</h3>
          {isPremium && priceCredits > 0 && (
            <span className="shrink-0 whitespace-nowrap rounded-full border border-[#FFD700] bg-[#FFFDF7] px-2.5 py-1 text-[12px] font-semibold text-[#0D1B3E]">
              {priceCredits} credits (£{priceGBP})
            </span>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-[14px] text-[#4A5565]">Progress</span>
          <span className="text-[14px] font-medium text-[#4A5565]">{safeProgress}%</span>
        </div>
        <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-[#E5E7EB]">
          <div className="h-full rounded-full bg-[#FFD700] transition-all duration-500" style={{ width: `${safeProgress}%` }} />
        </div>

        <div className="mt-5 flex items-start gap-2 text-[14px] leading-5 text-[#8B93A1]">
          <Award size={16} className="mt-0.5 shrink-0" />
          <span>
            {!certificateAvailable ? "No certificate available" : safeProgress === 100 ? "Certificate available" : "Complete the course to earn a certificate"}
          </span>
        </div>

        <Link
          href={`${basePath}/${slug}`}
          className="mt-5 flex h-[46px] w-full items-center justify-center gap-2.5 rounded-[12px] bg-[#D7263D] text-[16px] font-medium text-white transition hover:bg-[#BE1F34] focus:outline-none focus:ring-2 focus:ring-[#D7263D]/30"
        >
          <Play size={17} fill="currentColor" />
          {hasStarted ? "Continue" : "Start Course"}
        </Link>
      </div>
    </article>
  );
}
