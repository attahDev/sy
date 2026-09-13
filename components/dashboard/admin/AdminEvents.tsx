"use client";

// Events themselves live on the public main site, not the member
// dashboard — this panel is where admin manages what shows up there.
// Kept deliberately lean against the backend's actual event.dto.ts
// (no ticketing/pricing/video-hosting fields — those are GMBTE-only
// and out of scope here).
import { useEffect, useState } from "react";
import { CalendarPlus, ChevronDown, ChevronUp, Loader2, Pencil, Trash2, Users2, X } from "lucide-react";
import {
  createEvent,
  deleteEvent,
  fetchAdminEvents,
  fetchEventAttendees,
  updateEvent,
  type AdminEvent,
  type EventAttendee,
  type EventInput,
} from "@/lib/adminEventsApi";

const emptyForm: EventInput = {
  title: "",
  description: "",
  location: "",
  imageUrl: "",
  mode: "in-person",
  link: "",
  startsAt: "",
  endsAt: "",
  isFeatured: false,
  tags: [],
};

export default function AdminEvents() {
  const [events, setEvents] = useState<AdminEvent[] | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<EventInput>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [attendees, setAttendees] = useState<Record<string, EventAttendee[]>>({});

  const load = () => { fetchAdminEvents().then(setEvents); };
  useEffect(load, []);

  const startCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const startEdit = (ev: AdminEvent) => {
    setEditingId(ev.id);
    setForm({
      title: ev.title,
      description: ev.description ?? "",
      location: ev.location ?? "",
      imageUrl: ev.imageUrl ?? "",
      mode: ev.mode ?? "in-person",
      link: ev.link ?? "",
      startsAt: ev.startsAt ? ev.startsAt.slice(0, 16) : "",
      endsAt: ev.endsAt ? ev.endsAt.slice(0, 16) : "",
      isFeatured: ev.isFeatured,
      tags: ev.tags,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await updateEvent(editingId, form);
      } else {
        await createEvent(form);
      }
      setShowForm(false);
      load();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this event? This can't be undone.")) return;
    await deleteEvent(id);
    load();
  };

  const toggleActive = async (ev: AdminEvent) => {
    await updateEvent(ev.id, { isActive: !ev.isActive });
    load();
  };

  const toggleAttendees = async (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
      return;
    }
    setExpandedId(id);
    if (!attendees[id]) {
      const list = await fetchEventAttendees(id);
      setAttendees((a) => ({ ...a, [id]: list }));
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0D1B3E]">Events</h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            Manages what appears on the main site&apos;s events listing — not a dashboard feature for members.
          </p>
        </div>
        <button
          onClick={startCreate}
          className="flex items-center gap-1.5 rounded-full bg-[#0D1B3E] px-4 py-2 text-sm font-semibold text-white"
        >
          <CalendarPlus size={16} /> New event
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-5 space-y-3 rounded-2xl border border-[#0D1B3E1F] bg-white p-5"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-[#0D1B3E]">{editingId ? "Edit event" : "New event"}</h2>
            <button type="button" onClick={() => setShowForm(false)} className="text-[#6B7280]">
              <X size={18} />
            </button>
          </div>

          <input
            required
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            className="w-full rounded-lg border border-[#0D1B3E1F] px-3 py-2 text-sm outline-none focus:border-[#0D1B3E]"
          />
          <textarea
            placeholder="Description"
            rows={3}
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            className="w-full rounded-lg border border-[#0D1B3E1F] px-3 py-2 text-sm outline-none focus:border-[#0D1B3E]"
          />

          <div className="grid gap-3 sm:grid-cols-2">
            <input
              placeholder="Location"
              value={form.location}
              onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
              className="rounded-lg border border-[#0D1B3E1F] px-3 py-2 text-sm outline-none focus:border-[#0D1B3E]"
            />
            <select
              value={form.mode}
              onChange={(e) => setForm((f) => ({ ...f, mode: e.target.value }))}
              className="rounded-lg border border-[#0D1B3E1F] px-3 py-2 text-sm outline-none focus:border-[#0D1B3E]"
            >
              <option value="in-person">In person</option>
              <option value="online">Online</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-xs text-[#6B7280]">
              Starts
              <input
                required
                type="datetime-local"
                value={form.startsAt}
                onChange={(e) => setForm((f) => ({ ...f, startsAt: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-[#0D1B3E1F] px-3 py-2 text-sm outline-none focus:border-[#0D1B3E]"
              />
            </label>
            <label className="text-xs text-[#6B7280]">
              Ends (optional)
              <input
                type="datetime-local"
                value={form.endsAt}
                onChange={(e) => setForm((f) => ({ ...f, endsAt: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-[#0D1B3E1F] px-3 py-2 text-sm outline-none focus:border-[#0D1B3E]"
              />
            </label>
          </div>

          <input
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
            className="w-full rounded-lg border border-[#0D1B3E1F] px-3 py-2 text-sm outline-none focus:border-[#0D1B3E]"
          />
          <input
            placeholder="Link (registration / video call / external page)"
            value={form.link}
            onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))}
            className="w-full rounded-lg border border-[#0D1B3E1F] px-3 py-2 text-sm outline-none focus:border-[#0D1B3E]"
          />
          <input
            placeholder="Tags, comma separated"
            value={form.tags?.join(", ") ?? ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) }))
            }
            className="w-full rounded-lg border border-[#0D1B3E1F] px-3 py-2 text-sm outline-none focus:border-[#0D1B3E]"
          />

          <label className="flex items-center gap-2 text-sm text-[#0D1B3E]">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(e) => setForm((f) => ({ ...f, isFeatured: e.target.checked }))}
            />
            Featured
          </label>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-1.5 rounded-full bg-[#0D1B3E] px-5 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            {saving && <Loader2 size={14} className="animate-spin" />}
            {editingId ? "Save changes" : "Create event"}
          </button>
        </form>
      )}

      <div className="mt-6 space-y-3">
        {events === null && <p className="text-sm text-[#6B7280]">Loading…</p>}
        {events?.length === 0 && <p className="text-sm text-[#6B7280]">No events yet.</p>}
        {events?.map((ev) => (
          <div key={ev.id} className="rounded-2xl border border-[#0D1B3E1F] bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-[#0D1B3E]">{ev.title}</p>
                  {ev.isFeatured && (
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                      Featured
                    </span>
                  )}
                  {!ev.isActive && (
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-600">
                      Hidden
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#6B7280]">
                  {new Date(ev.startsAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
                  {ev.location ? ` · ${ev.location}` : ""}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleAttendees(ev.id)}
                  className="flex items-center gap-1 rounded-full border border-[#0D1B3E1F] px-3 py-1 text-xs font-medium text-[#0D1B3E]"
                >
                  <Users2 size={13} /> Attendees
                  {expandedId === ev.id ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                </button>
                <button
                  onClick={() => toggleActive(ev)}
                  className="rounded-full border border-[#0D1B3E1F] px-3 py-1 text-xs font-medium text-[#0D1B3E]"
                >
                  {ev.isActive ? "Hide" : "Show"}
                </button>
                <button onClick={() => startEdit(ev)} className="text-[#6B7280] hover:text-[#0D1B3E]">
                  <Pencil size={15} />
                </button>
                <button onClick={() => handleDelete(ev.id)} className="text-[#6B7280] hover:text-red-600">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>

            {expandedId === ev.id && (
              <div className="mt-3 rounded-xl bg-[#F7F8FA] p-3">
                {!attendees[ev.id] && <p className="text-xs text-[#6B7280]">Loading attendees…</p>}
                {attendees[ev.id]?.length === 0 && (
                  <p className="text-xs text-[#6B7280]">No registrations yet.</p>
                )}
                {attendees[ev.id]?.map((a) => (
                  <p key={a.id} className="text-xs text-[#0D1B3E]">
                    {a.firstname} {a.lastname} · {a.email}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
