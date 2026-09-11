"use client";

// NOTE: the backend only exposes GET /climate/projects (active projects,
// public) — there's no GET /climate/admin/projects that also returns
// inactive ones. So this panel can create/edit projects and can turn an
// active project inactive, but once a project is hidden it drops out of
// this list too (no way to bring it back without a DB edit) until a
// GET /climate/admin/projects admin-list route is added on the backend.
import { useEffect, useState } from "react";
import { Loader2, Pencil, Sprout, X } from "lucide-react";
import {
  createGreenProject,
  fetchAdminGreenProjects,
  updateGreenProject,
  type AdminGreenProject,
  type GreenProjectInput,
} from "@/lib/adminClimateApi";

const emptyForm: GreenProjectInput = {
  title: "",
  description: "",
  imageUrl: "",
  goalAmountMinor: 0,
};

function poundsToMinor(pounds: string) {
  const n = parseFloat(pounds || "0");
  return Math.round(n * 100);
}
function minorToPounds(minor: number) {
  return (minor / 100).toFixed(2);
}

export default function AdminGreenProjects() {
  const [projects, setProjects] = useState<AdminGreenProject[] | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<GreenProjectInput>(emptyForm);
  const [goalPounds, setGoalPounds] = useState("0");
  const [saving, setSaving] = useState(false);

  const load = () => { fetchAdminGreenProjects().then(setProjects); };
  useEffect(load, []);

  const startCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setGoalPounds("0");
    setShowForm(true);
  };

  const startEdit = (p: AdminGreenProject) => {
    setEditingId(p.id);
    setForm({
      title: p.title,
      description: p.description,
      imageUrl: p.imageUrl ?? "",
      goalAmountMinor: p.goalAmountMinor,
    });
    setGoalPounds(minorToPounds(p.goalAmountMinor));
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, goalAmountMinor: poundsToMinor(goalPounds) };
    try {
      if (editingId) {
        await updateGreenProject(editingId, payload);
      } else {
        await createGreenProject(payload);
      }
      setShowForm(false);
      load();
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (p: AdminGreenProject) => {
    await updateGreenProject(p.id, { isActive: !p.isActive });
    load();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0D1B3E]">Green projects</h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            Projects members can support from the Climate tab.
          </p>
        </div>
        <button
          onClick={startCreate}
          className="flex items-center gap-1.5 rounded-full bg-[#0D1B3E] px-4 py-2 text-sm font-semibold text-white"
        >
          <Sprout size={16} /> New project
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-5 space-y-3 rounded-2xl border border-[#0D1B3E1F] bg-white p-5"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-[#0D1B3E]">{editingId ? "Edit project" : "New project"}</h2>
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
            required
            placeholder="Description"
            rows={3}
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            className="w-full rounded-lg border border-[#0D1B3E1F] px-3 py-2 text-sm outline-none focus:border-[#0D1B3E]"
          />
          <input
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
            className="w-full rounded-lg border border-[#0D1B3E1F] px-3 py-2 text-sm outline-none focus:border-[#0D1B3E]"
          />
          <label className="block text-xs text-[#6B7280]">
            Funding goal (£)
            <input
              required
              type="number"
              min="0"
              step="0.01"
              value={goalPounds}
              onChange={(e) => setGoalPounds(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[#0D1B3E1F] px-3 py-2 text-sm outline-none focus:border-[#0D1B3E]"
            />
          </label>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-1.5 rounded-full bg-[#0D1B3E] px-5 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            {saving && <Loader2 size={14} className="animate-spin" />}
            {editingId ? "Save changes" : "Create project"}
          </button>
        </form>
      )}

      <div className="mt-6 space-y-3">
        {projects === null && <p className="text-sm text-[#6B7280]">Loading…</p>}
        {projects?.length === 0 && <p className="text-sm text-[#6B7280]">No active projects.</p>}
        {projects?.map((p) => (
          <div key={p.id} className="rounded-2xl border border-[#0D1B3E1F] bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-[#0D1B3E]">{p.title}</p>
                <p className="text-sm text-[#6B7280]">
                  £{minorToPounds(p.raisedAmountMinor)} raised of £{minorToPounds(p.goalAmountMinor)} goal
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleActive(p)}
                  className="rounded-full border border-[#0D1B3E1F] px-3 py-1 text-xs font-medium text-[#0D1B3E]"
                >
                  Hide
                </button>
                <button onClick={() => startEdit(p)} className="text-[#6B7280] hover:text-[#0D1B3E]">
                  <Pencil size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
