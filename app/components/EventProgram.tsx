"use client";

import { useEffect, useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://south-yorkshire-backend.onrender.com";

type BackendEvent = {
  id: string;
  title: string;
  description: string | null;
  startsAt: string;
  endsAt: string | null;
};

type ProgrammeItem = {
  id: string;
  time: string;
  title: string;
  description: string;
};

// Cosmetic only — cycles through the same collage sizing the old hardcoded
// version used, regardless of how many events the admin has entered.
const SIZE_CYCLE = ["xl:col-span-3", "xl:col-span-4", "xl:col-span-3", "xl:col-span-4"];

function formatTimeRange(startsAt: string, endsAt: string | null) {
  const fmt = (iso: string) =>
    new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  return endsAt ? `${fmt(startsAt)} – ${fmt(endsAt)}` : fmt(startsAt);
}

function formatDayLabel(events: BackendEvent[]) {
  if (events.length === 0) return null;
  return new Date(events[0].startsAt)
    .toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    .toUpperCase();
}

function ProgrammeCard({ item, sizeClass }: { item: ProgrammeItem; sizeClass: string }) {
  return (
    <article
      className={[
        "rounded-[24px] px-6 py-7 sm:px-7 sm:py-8 lg:min-h-[215px]",
        "border-[0.67px] border-[#0000001A] bg-[#FFFFFF0D]",
        sizeClass,
      ].join(" ")}
    >
      <p className="mb-4 font-open text-[10px] font-semibold tracking-[0.1em] text-[#FFD700] sm:text-[12px]">
        {item.time}
      </p>

      <h3 className="max-w-[95%] text-[16px] font-semibold leading-[1.28] tracking-[0.01em] text-white">
        {item.title}
      </h3>

      {item.description && (
        <p className="mt-5 font-open max-w-[92%] text-[14px] leading-[1.55] text-[#FFFFFF80]">
          {item.description}
        </p>
      )}
    </article>
  );
}

export default function EventProgrammeSection() {
  const [events, setEvents] = useState<BackendEvent[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(`${API_URL}/events/upcoming`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data) => {
        if (!cancelled) setEvents(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Nothing admin-entered yet, or the request failed — no fabricated
  // fallback schedule. Just don't render the section rather than show
  // stale hardcoded panels that no longer match reality.
  if (failed || (events && events.length === 0)) return null;

  const items: ProgrammeItem[] =
    events?.map((event) => ({
      id: event.id,
      time: formatTimeRange(event.startsAt, event.endsAt),
      title: event.title,
      description: event.description ?? "",
    })) ?? [];

  const dayLabel = events ? formatDayLabel(events) : null;

  return (
    <section className="w-full bg-[#0D1B3E]">
      <div className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:px-12 lg:py-24 xl:px-[68px] xl:py-[78px]">
        <div className="mb-10 sm:mb-12 md:mb-14">
          {dayLabel && (
            <p className="mb-4 font-open text-[13px] font-semibold uppercase tracking-[0.28em] text-[#FFD700] sm:text-[14px]">
              {dayLabel}
            </p>
          )}

          <h2 className="text-[35px] font-medium uppercase leading-[0.95] tracking-[-0.03em] text-white md:text-[40px] lg:text-[45px]">
            Event Programme
          </h2>
        </div>

        {!events ? (
          <p className="font-open text-[14px] text-[#FFFFFF80]">Loading programme…</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-14 xl:gap-6">
            {items.map((item, i) => (
              <ProgrammeCard key={item.id} item={item} sizeClass={SIZE_CYCLE[i % SIZE_CYCLE.length]} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
