"use client";

// New — dynamic, admin-managed events pulled from GMBTE's real /events API.
// Sits alongside (not replacing) the page's existing static training-
// programme content below, which describes recurring programmes rather
// than discrete calendar events.
import { useEffect, useState } from "react";
import { CalendarDays, Clock, MapPin, Video } from "lucide-react";
import { fetchUpcomingEvents, type PlatformEvent } from "../../../lib/eventsApi";
import { Section, SectionHeader } from "./Section";
import { Chip } from "./Cards";

export default function UpcomingEventsSection() {
  const [events, setEvents] = useState<PlatformEvent[] | null>(null);

  useEffect(() => {
    fetchUpcomingEvents().then(setEvents).catch(() => setEvents([]));
  }, []);

  if (events?.length === 0) return null; // nothing to show — don't render an empty section

  return (
    <Section tone="white">
      <SectionHeader
        eyebrow="On the calendar"
        title="Upcoming events"
        intro="Dates confirmed by the SYBTE team — register below to hold your spot."
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {!events && (
          <p className="font-open text-[14px] text-[#6B7280]">Loading…</p>
        )}
        {events?.map((event) => (
          <div
            key={event.id}
            className={`rounded-[18px] border p-5 ${
              event.isFeatured ? "border-[#FFD700] bg-[#FFF9DD]" : "border-[#0D1B3E14] bg-white"
            }`}
          >
            {event.isFeatured && <Chip variant="gold">Featured</Chip>}
            <h3 className="mt-3 font-medium text-[18px] leading-snug text-[#0D1B3E]">
              {event.title}
            </h3>
            {event.description && (
              <p className="mt-2 font-open text-[14px] leading-relaxed text-[#6B7280]">
                {event.description}
              </p>
            )}
            <div className="mt-4 space-y-1.5 font-open text-[13px] text-[#6B7280]">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                {new Date(event.startsAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {new Date(event.startsAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
              </div>
              {event.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> {event.location}
                </div>
              )}
              {event.mode && (
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4" /> {event.mode}
                </div>
              )}
            </div>
            {event.link && (
              <a
                href={event.link}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block rounded-full bg-[#D7263D] px-4 py-2 font-open text-[13px] font-semibold text-white"
              >
                Register
              </a>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
