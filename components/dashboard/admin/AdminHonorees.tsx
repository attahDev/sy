"use client";

// Award Recognition admin — ported from GMBTE's RegionalDirectory admin,
// re-scoped: region (GMBTE's uk/africa/america-caribbean/global) kept
// alongside a new South Yorkshire borough field, independent of each
// other. Full CRUD, unlike Courses' add-only modules — the backend
// supports PATCH/DELETE here.
import { useEffect, useState } from "react";
import { Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import {
  createHonoree,
  deleteHonoree,
  fetchAdminHonorees,
  updateHonoree,
  uploadHonoreeImage,
} from "@/lib/adminHonoreesApi";
import type { Borough, Honoree, Region } from "@/lib/honoreesApi";
import { BOROUGHS, REGIONS } from "@/lib/honoreesApi";

const emptyForm = {
  name: "",
  role: "",
  location: "",
  category: "",
  sector: "",
  tagsText: "",
  region: "",
  borough: "",
  imageUrl: "",
};

export default function AdminHonorees() {
  const [honorees, setHonorees] = useState<Honoree[] | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const load = () => { fetchAdminHonorees().then(setHonorees); };
  useEffect(load, []);

  const startCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const startEdit = (h: Honoree) => {
    setEditingId(h.id);
    setForm({
      name: h.name,
      role: h.role,
      location: h.location,
      category: h.category,
      sector: h.sector,
      tagsText: h.tags.join(", "),
      region: h.region ?? "",
      borough: h.borough ?? "",
      imageUrl: h.imageUrl ?? "",
    });
    setShowForm(true);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadHonoreeImage(file);
      setForm((f) => ({ ...f, imageUrl: url }));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const tags = form.tagsText.split(",").map((t) => t.trim()).filter(Boolean);
    const input = {
      name: form.name,
      role: form.role,
      location: form.location,
      category: form.category,
      sector: form.sector,
      tags,
      imageUrl: form.imageUrl || undefined,
      region: (form.region || undefined) as Region | undefined,
      borough: (form.borough || undefined) as Borough | undefined,
    };
    try {
      if (editingId) {
        await updateHonoree(editingId, input);
      } else {
        await createHonoree(input);
      }
      setShowForm(false);
      load();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this honouree?")) return;
    await deleteHonoree(id);
    load();
  };

  const toggleActive = async (h: Honoree) => {
    await updateHonoree(h.id, { isActive: !h.isActive });
    load();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0D1B3E]">Award Recognition</h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            Honourees shown on the public Recognition page. Region and South Yorkshire
            borough are independent — set either, both, or neither.
          </p>
        </div>
        <button
          onClick={startCreate}
          className="flex items-center gap-1.5 rounded-full bg-[#0D1B3E] px-4 py-2 text-sm font-semibold text-white"
        >
          <Plus size={16} /> New honouree
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-5 space-y-3 rounded-2xl border border-[#0D1B3E1F] bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-[#0D1B3E]">{editingId ? "Edit honouree" : "New honouree"}</h2>
            <button type="button" onClick={() => setShowForm(false)} className="text-[#6B7280]">
              <X size={18} />
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-lg border border-[#001F3F]/15 px-3 py-2 text-sm" />
            <input required placeholder="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="rounded-lg border border-[#001F3F]/15 px-3 py-2 text-sm" />
            <input required placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="rounded-lg border border-[#001F3F]/15 px-3 py-2 text-sm" />
            <input required placeholder="Category (e.g. Innovation)" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="rounded-lg border border-[#001F3F]/15 px-3 py-2 text-sm" />
            <input required placeholder="Sector (e.g. Technology)" value={form.sector} onChange={(e) => setForm({ ...form, sector: e.target.value })} className="rounded-lg border border-[#001F3F]/15 px-3 py-2 text-sm" />
            <input placeholder="Tags (comma separated)" value={form.tagsText} onChange={(e) => setForm({ ...form, tagsText: e.target.value })} className="rounded-lg border border-[#001F3F]/15 px-3 py-2 text-sm" />

            <select value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} className="rounded-lg border border-[#001F3F]/15 px-3 py-2 text-sm">
              <option value="">No region</option>
              {REGIONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <select value={form.borough} onChange={(e) => setForm({ ...form, borough: e.target.value })} className="rounded-lg border border-[#001F3F]/15 px-3 py-2 text-sm">
              <option value="">No South Yorkshire borough</option>
              {BOROUGHS.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#6B7280]">Photo</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="mt-1 block text-sm" />
            {uploading && <p className="mt-1 text-xs text-[#6B7280]">Uploading…</p>}
            {form.imageUrl && !uploading && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.imageUrl} alt="" className="mt-2 h-20 w-20 rounded-lg object-cover" />
            )}
          </div>

          <button
            type="submit"
            disabled={saving || uploading}
            className="flex items-center gap-1.5 rounded-full bg-[#0D1B3E] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            {editingId ? "Save changes" : "Add honouree"}
          </button>
        </form>
      )}

      <div className="mt-5 space-y-2">
        {honorees === null && <p className="text-sm text-[#6B7280]">Loading…</p>}
        {honorees?.map((h) => (
          <div key={h.id} className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[#001F3F]/10 bg-white p-4">
            <div>
              <p className="font-semibold text-[#0D1B3E]">{h.name}</p>
              <p className="text-sm text-[#6B7280]">{h.role} — {h.location}</p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                <button
                  onClick={() => toggleActive(h)}
                  className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                    h.isActive ? "bg-emerald-50 text-emerald-700" : "bg-[#001F3F]/5 text-[#6B7280]"
                  }`}
                >
                  {h.isActive ? "Active" : "Inactive"}
                </button>
                {h.region && <span className="rounded-full bg-[#0D1B3E]/5 px-2 py-0.5 text-[11px] text-[#0D1B3E]">{h.region}</span>}
                {h.borough && <span className="rounded-full bg-[#F5A623]/10 px-2 py-0.5 text-[11px] text-[#8a6d00]">{h.borough}</span>}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => startEdit(h)} className="rounded-full p-1.5 text-[#0D1B3E] hover:bg-[#001F3F]/5">
                <Pencil size={15} />
              </button>
              <button onClick={() => handleDelete(h.id)} className="rounded-full p-1.5 text-red-600 hover:bg-red-50">
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
