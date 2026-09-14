"use client";

// Award Recognition — ported from GMBTE's regional-honoree directory,
// re-themed to SY's own palette/typography instead of Hall of Fame's
// gold/ink theme (no shared assets or font license here). Plain hero,
// no illustration, matching the rest of the admin/dashboard-adjacent
// pages built this way.
import { useEffect, useMemo, useState } from "react";
import PageHero from "@/app/components/site/PageHero";
import { Section } from "@/app/components/site/Section";
import {
  BOROUGHS,
  REGIONS,
  fetchHonoreeCounts,
  fetchHonorees,
  type Honoree,
  type HonoreeCounts,
} from "@/lib/honoreesApi";

const regionLabels: Record<string, string> = {
  uk: "UK",
  africa: "Africa",
  "america-caribbean": "America & Caribbean",
  global: "Global",
};

export default function RecognitionPage() {
  const [honorees, setHonorees] = useState<Honoree[] | null>(null);
  const [counts, setCounts] = useState<HonoreeCounts | null>(null);
  const [region, setRegion] = useState<string>("all");
  const [borough, setBorough] = useState<string>("all");

  useEffect(() => {
    fetchHonoreeCounts().then(setCounts).catch(() => setCounts(null));
  }, []);

  useEffect(() => {
    fetchHonorees({
      region: region === "all" ? undefined : region,
      borough: borough === "all" ? undefined : borough,
    }).then(setHonorees);
  }, [region, borough]);

  const totalCount = useMemo(() => {
    if (!counts) return null;
    return Object.values(counts.region).reduce((a, b) => a + b, 0);
  }, [counts]);

  return (
    <>
      <PageHero
        eyebrow="Community Impact"
        title="Award"
        accent="Recognition"
        lead="Recognising excellence, innovation and outstanding achievement across South Yorkshire and beyond."
        breadcrumb="Home / Recognition"
        stats={totalCount !== null ? [{ value: String(totalCount), label: "Honourees recognised" }] : undefined}
      />

      <Section tone="cream">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">Region:</span>
          <FilterChip active={region === "all"} onClick={() => setRegion("all")}>
            All
          </FilterChip>
          {REGIONS.map((r) => (
            <FilterChip key={r} active={region === r} onClick={() => setRegion(r)}>
              {regionLabels[r]} {counts ? `(${counts.region[r] ?? 0})` : ""}
            </FilterChip>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">South Yorkshire:</span>
          <FilterChip active={borough === "all"} onClick={() => setBorough("all")}>
            All
          </FilterChip>
          {BOROUGHS.map((b) => (
            <FilterChip key={b} active={borough === b} onClick={() => setBorough(b)}>
              {b} {counts ? `(${counts.borough[b] ?? 0})` : ""}
            </FilterChip>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {honorees === null &&
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-2xl bg-[#0D1B3E]/5" />
            ))}
          {honorees?.length === 0 && (
            <p className="col-span-full text-center text-sm text-[#6B7280]">
              No honourees match this filter yet.
            </p>
          )}
          {honorees?.map((h) => (
            <div key={h.id} className="overflow-hidden rounded-2xl border border-[#0D1B3E]/10 bg-white shadow-sm">
              <div className="aspect-[4/3] w-full bg-[#0D1B3E]/5">
                {h.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={h.imageUrl} alt={h.name} className="h-full w-full object-cover" />
                )}
              </div>
              <div className="p-4">
                <p className="font-bold text-[#0D1B3E]">{h.name}</p>
                <p className="text-sm text-[#6B7280]">{h.role}</p>
                <p className="mt-1 text-xs text-[#6B7280]">{h.location}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {h.borough && (
                    <span className="rounded-full bg-[#F5A623]/10 px-2 py-0.5 text-[11px] font-semibold text-[#8a6d00]">
                      {h.borough}
                    </span>
                  )}
                  <span className="rounded-full bg-[#0D1B3E]/5 px-2 py-0.5 text-[11px] font-semibold text-[#0D1B3E]">
                    {h.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
        active ? "bg-[#0D1B3E] text-white" : "bg-white text-[#0D1B3E] hover:bg-[#0D1B3E]/5"
      }`}
    >
      {children}
    </button>
  );
}
