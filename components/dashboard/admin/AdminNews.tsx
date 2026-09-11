"use client";

import { useEffect, useState } from "react";
import { Loader2, Newspaper, Pencil, Trash2, X } from "lucide-react";
import {
  createNewsArticle,
  deleteNewsArticle,
  fetchAdminNews,
  updateNewsArticle,
  type AdminNewsArticle,
  type NewsInput,
} from "@/lib/adminNewsApi";

const emptyForm: NewsInput = {
  title: "",
  excerpt: "",
  coverImageUrl: "",
  body: "",
  externalLink: "",
  tags: [],
  isFeatured: false,
  publishedAt: "",
};

export default function AdminNews() {
  const [articles, setArticles] = useState<AdminNewsArticle[] | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<NewsInput>(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = () => { fetchAdminNews().then(setArticles); };
  useEffect(load, []);

  const startCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const startEdit = (a: AdminNewsArticle) => {
    setEditingId(a.id);
    setForm({
      title: a.title,
      excerpt: a.excerpt ?? "",
      coverImageUrl: a.coverImageUrl ?? "",
      body: a.body ?? "",
      externalLink: a.externalLink ?? "",
      tags: a.tags,
      isFeatured: a.isFeatured,
      publishedAt: a.publishedAt ? a.publishedAt.slice(0, 16) : "",
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await updateNewsArticle(editingId, form);
      } else {
        await createNewsArticle(form);
      }
      setShowForm(false);
      load();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this article? This can't be undone.")) return;
    await deleteNewsArticle(id);
    load();
  };

  const toggleActive = async (a: AdminNewsArticle) => {
    await updateNewsArticle(a.id, { isActive: !a.isActive });
    load();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0D1B3E]">News</h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            The platform&apos;s own announcements — no reader submissions or comments.
          </p>
        </div>
        <button
          onClick={startCreate}
          className="flex items-center gap-1.5 rounded-full bg-[#0D1B3E] px-4 py-2 text-sm font-semibold text-white"
        >
          <Newspaper size={16} /> New article
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-5 space-y-3 rounded-2xl border border-[#0D1B3E1F] bg-white p-5"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-[#0D1B3E]">{editingId ? "Edit article" : "New article"}</h2>
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
          <input
            placeholder="Excerpt"
            value={form.excerpt}
            onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
            className="w-full rounded-lg border border-[#0D1B3E1F] px-3 py-2 text-sm outline-none focus:border-[#0D1B3E]"
          />
          <textarea
            placeholder="Body"
            rows={5}
            value={form.body}
            onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
            className="w-full rounded-lg border border-[#0D1B3E1F] px-3 py-2 text-sm outline-none focus:border-[#0D1B3E]"
          />
          <input
            placeholder="Cover image URL"
            value={form.coverImageUrl}
            onChange={(e) => setForm((f) => ({ ...f, coverImageUrl: e.target.value }))}
            className="w-full rounded-lg border border-[#0D1B3E1F] px-3 py-2 text-sm outline-none focus:border-[#0D1B3E]"
          />
          <input
            placeholder="External link (optional — if this is a link-out story)"
            value={form.externalLink}
            onChange={(e) => setForm((f) => ({ ...f, externalLink: e.target.value }))}
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

          <div className="flex items-center gap-4">
            <label className="text-xs text-[#6B7280]">
              Publish date
              <input
                type="datetime-local"
                value={form.publishedAt}
                onChange={(e) => setForm((f) => ({ ...f, publishedAt: e.target.value }))}
                className="mt-1 block rounded-lg border border-[#0D1B3E1F] px-3 py-2 text-sm outline-none focus:border-[#0D1B3E]"
              />
            </label>
            <label className="flex items-center gap-2 text-sm text-[#0D1B3E]">
              <input
                type="checkbox"
                checked={form.isFeatured}
                onChange={(e) => setForm((f) => ({ ...f, isFeatured: e.target.checked }))}
              />
              Featured
            </label>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-1.5 rounded-full bg-[#0D1B3E] px-5 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            {saving && <Loader2 size={14} className="animate-spin" />}
            {editingId ? "Save changes" : "Publish article"}
          </button>
        </form>
      )}

      <div className="mt-6 space-y-3">
        {articles === null && <p className="text-sm text-[#6B7280]">Loading…</p>}
        {articles?.length === 0 && <p className="text-sm text-[#6B7280]">No articles yet.</p>}
        {articles?.map((a) => (
          <div key={a.id} className="rounded-2xl border border-[#0D1B3E1F] bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-[#0D1B3E]">{a.title}</p>
                  {a.isFeatured && (
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                      Featured
                    </span>
                  )}
                  {!a.isActive && (
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-600">
                      Hidden
                    </span>
                  )}
                </div>
                {a.excerpt && <p className="text-sm text-[#6B7280]">{a.excerpt}</p>}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleActive(a)}
                  className="rounded-full border border-[#0D1B3E1F] px-3 py-1 text-xs font-medium text-[#0D1B3E]"
                >
                  {a.isActive ? "Hide" : "Show"}
                </button>
                <button onClick={() => startEdit(a)} className="text-[#6B7280] hover:text-[#0D1B3E]">
                  <Pencil size={15} />
                </button>
                <button onClick={() => handleDelete(a.id)} className="text-[#6B7280] hover:text-red-600">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
