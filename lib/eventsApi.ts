// Matches GMBTEBACKEND's real /events contract (src/engagement/events/
// events.controller.ts) — using only the admin-authored subset (public
// listings, RSVP) since "admin pushes, not user events" is the confirmed
// scope. Deliberately NOT porting: POST /events/community (member-hosted
// submission), /events/community/mine*, Eventbrite sync, PlanTierGuard —
// those are the member-submission features explicitly out of scope.
import { api } from "./api";

export type PlatformEvent = {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  imageUrl: string | null;
  mode: string | null;
  link: string | null;
  startsAt: string;
  endsAt: string | null;
  isFeatured: boolean;
  tags: string[];
};

/** GET /events — upcoming, admin-curated first */
export async function fetchUpcomingEvents(search?: string): Promise<PlatformEvent[]> {
  const { data } = await api.get("/events", { params: search ? { search } : undefined });
  return data?.data ?? data;
}

/** GET /events/past */
export async function fetchPastEvents(): Promise<PlatformEvent[]> {
  const { data } = await api.get("/events/past");
  return data?.data ?? data;
}

/** GET /events/:id */
export async function fetchEvent(id: string): Promise<PlatformEvent> {
  const { data } = await api.get(`/events/${id}`);
  return data?.data ?? data;
}

/** Requires auth — RSVP/cancel toggle for a signed-in member. */
export async function rsvpToEvent(id: string) {
  const { data } = await api.post(`/events/${id}/rsvp`);
  return data?.data ?? data;
}

export async function cancelRsvp(id: string) {
  const { data } = await api.delete(`/events/${id}/rsvp`);
  return data?.data ?? data;
}
