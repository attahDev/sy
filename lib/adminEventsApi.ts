// Admin CRUD for SOUTH-YORKSHIRE-BACKEND's /events/admin routes.
// Events themselves are public-site-only (Hero/Awards/Events pages read
// from GET /events/upcoming and /events/past) — there is no member-facing
// "Events" tab on the dashboard. This panel is purely for whoever runs the
// main site to create/edit/cancel events and see who registered.
import { api } from "./api";

export type AdminEvent = {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  imageUrl: string | null;
  mode: string | null;
  link: string | null;
  startsAt: string;
  endsAt: string | null;
  isActive: boolean;
  isFeatured: boolean;
  isCompleted: boolean;
  tags: string[];
};

export type EventAttendee = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  registeredAt: string;
};

export type EventInput = {
  title: string;
  description?: string;
  location?: string;
  imageUrl?: string;
  mode?: string;
  link?: string;
  startsAt: string;
  endsAt?: string;
  isFeatured?: boolean;
  tags?: string[];
};

export async function fetchAdminEvents(): Promise<AdminEvent[]> {
  const { data } = await api.get("/events/admin");
  return data?.data ?? data ?? [];
}

export async function createEvent(input: EventInput): Promise<AdminEvent> {
  const { data } = await api.post("/events/admin", input);
  return data?.data ?? data;
}

export async function updateEvent(
  id: string,
  input: Partial<EventInput> & { isActive?: boolean; isCompleted?: boolean },
): Promise<AdminEvent> {
  const { data } = await api.patch(`/events/admin/${id}`, input);
  return data?.data ?? data;
}

export async function deleteEvent(id: string): Promise<void> {
  await api.delete(`/events/admin/${id}`);
}

export async function fetchEventAttendees(id: string): Promise<EventAttendee[]> {
  const { data } = await api.get(`/events/admin/${id}/attendees`);
  return data?.data ?? data ?? [];
}
