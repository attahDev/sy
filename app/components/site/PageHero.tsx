import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import Reveal from "./Reveal";

export type HeroStat = { value: string; label: string };

/**
 * Editorial hero used at the top of every content page: dark navy band with an
 * optional background photograph, breadcrumb, headline and stat strip.
 */
export default function PageHero({
  eyebrow,
  title,
  accent,
  lead,
  breadcrumb,
  image,
  imageAlt,
  stats,
  footnote,
  children,
}: {
  eyebrow: string;
  title: string;
  /** Trailing words rendered in gold beneath the main title. */
  accent?: string;
  lead?: string;
  breadcrumb: string;
  image?: string;
  imageAlt?: string;
  stats?: HeroStat[];
  footnote?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative w-full overflow-hidden bg-[#0D1B3E]">
      {image && (
        <Image
          src={image}
          alt={imageAlt ?? ""}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-[0.28]"
        />
      )}

      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: image
            ? "linear-gradient(125deg, rgba(10,19,40,0.96) 0%, rgba(13,27,62,0.9) 48%, rgba(13,27,62,0.72) 100%)"
            : "linear-gradient(125deg, #0A1328 0%, #0D1B3E 52%, #16295A 100%)",
        }}
      />

      <div aria-hidden className="grid-overlay absolute inset-0 opacity-70" />

      <div
        aria-hidden
        className="absolute -right-[12%] -top-[38%] h-[560px] w-[560px] rounded-full bg-[#F5A623] opacity-[0.13] blur-[130px]"
      />
      <div
        aria-hidden
        className="absolute -bottom-[46%] left-[-8%] h-[520px] w-[520px] rounded-full bg-[#D7263D] opacity-[0.16] blur-[130px]"
      />

      <div className="relative mx-auto max-w-[1600px] px-5 pb-16 pt-[68px] sm:px-8 sm:pb-20 sm:pt-[84px] md:px-10 md:pb-24 md:pt-[96px] lg:px-12 xl:px-[78px] xl:pb-[112px] xl:pt-[112px]">
        <Reveal className="flex items-center gap-2 font-open text-[12px] font-semibold uppercase tracking-[0.2em] text-[#FFFFFF73] sm:text-[13px]">
          <Link
            href="/"
            className="transition-colors duration-200 hover:text-[#FFD700]"
          >
            Home
          </Link>
          <ChevronRight className="h-[13px] w-[13px] text-[#FFFFFF4D]" aria-hidden />
          <span className="text-[#FFD700]">{breadcrumb}</span>
        </Reveal>

        <Reveal delay={80} className="mt-9 max-w-[1120px] sm:mt-11">
          <p className="mb-6 inline-flex items-center rounded-full border-[0.67px] border-[#F5A62366] bg-[#F5A62326] px-4 py-2 font-open text-[11px] font-semibold uppercase tracking-[0.22em] text-[#FFD700] backdrop-blur-sm sm:px-5 sm:py-2.5 sm:text-[12px]">
            {eyebrow}
          </p>

          <h1 className="text-[38px] font-semibold uppercase leading-[0.95] tracking-[-0.02em] text-white sm:text-[52px] md:text-[64px] lg:text-[76px] xl:text-[82px]">
            <span className="block">{title}</span>
            {accent && <span className="mt-1 block text-[#FFD700]">{accent}</span>}
          </h1>
        </Reveal>

        {lead && (
          <Reveal delay={160}>
            <p className="mt-8 max-w-[860px] font-open text-[16px] leading-[1.8] text-[#FFFFFFB8] sm:text-[18px] md:text-[20px]">
              {lead}
            </p>
          </Reveal>
        )}

        {children && (
          <Reveal delay={220} className="mt-10 flex flex-wrap items-center gap-4">
            {children}
          </Reveal>
        )}

        {stats && stats.length > 0 && (
          <Reveal delay={280} className="mt-14 sm:mt-16">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-9 border-t border-white/12 pt-10 sm:gap-x-10 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block text-[34px] font-semibold leading-none tracking-[-0.02em] text-[#FFD700] sm:text-[42px] md:text-[48px]">
                      {stat.value}
                    </span>
                    <span className="mt-3 block font-open text-[13px] leading-[1.5] text-[#FFFFFF8C] sm:text-[14px]">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            {footnote && (
              <p className="mt-8 font-open text-[12px] leading-[1.6] text-[#FFFFFF66] sm:text-[13px]">
                {footnote}
              </p>
            )}
          </Reveal>
        )}
      </div>

      <div
        aria-hidden
        className="h-[6px] w-full bg-gradient-to-r from-[#D7263D] via-[#F5A623] to-[#FFD700]"
      />
    </section>
  );
}
