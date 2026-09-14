"use client";

// Tributes — ported from GMBTE, stripped of the "Pelumi" HOF AI-mentor
// widget it was bundled with there (unrelated feature, not part of this
// port). A tribute is a low-stakes shoutout: no approval gate, live
// immediately, delete-your-own or admin-delete for moderation.
import { useEffect, useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import {
  deleteOwnTribute,
  deleteTributeAsAdmin,
  fetchTributes,
  postTribute,
  type Tribute,
} from "@/lib/tributesApi";

export default function TributesSection() {
  const { user } = useAuth();
  const [tributes, setTributes] = useState<Tribute[] | null>(null);
  const [message, setMessage] = useState("");
  const [posting, setPosting] = useState(false);

  const load = () => { fetchTributes().then(setTributes); };
  useEffect(load, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setPosting(true);
    try {
      await postTribute(message.trim());
      setMessage("");
      load();
    } finally {
      setPosting(false);
    }
  };

  const handleDelete = async (t: Tribute) => {
    if (!confirm("Delete this tribute?")) return;
    if (user?.id === t.user.id) {
      await deleteOwnTribute(t.id);
    } else {
      await deleteTributeAsAdmin(t.id);
    }
    load();
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-extrabold text-[#001F3F]">Tributes</h1>
      <p className="mt-1 text-sm text-[#6B7280]">
        Leave a short shoutout for someone in the community — a mentor, a fellow
        member, anyone whose contribution stood out to you.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 rounded-2xl border border-[#001F3F]/10 bg-white p-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={1000}
          rows={3}
          placeholder="Write your tribute…"
          className="w-full resize-none rounded-lg border border-[#001F3F]/15 px-3 py-2 text-sm outline-none focus:border-[#001F3F]"
        />
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-[#6B7280]">{message.length}/1000</span>
          <button
            type="submit"
            disabled={posting || !message.trim()}
            className="flex items-center gap-1.5 rounded-full bg-[#001F3F] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            {posting && <Loader2 className="h-4 w-4 animate-spin" />}
            Post tribute
          </button>
        </div>
      </form>

      <div className="mt-6 space-y-3">
        {tributes === null && <p className="text-sm text-[#6B7280]">Loading…</p>}
        {tributes?.length === 0 && (
          <p className="text-sm text-[#6B7280]">No tributes yet — be the first to leave one.</p>
        )}
        {tributes?.map((t) => {
          const canDelete = user?.id === t.user.id || user?.role === "ADMIN";
          return (
            <div key={t.id} className="rounded-2xl border border-[#001F3F]/10 bg-white p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-[#001F3F]">
                    {t.user.firstname} {t.user.lastname}
                  </p>
                  <p className="mt-1 text-sm text-[#001F3F]/80">{t.message}</p>
                  <p className="mt-1 text-xs text-[#6B7280]">
                    {new Date(t.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {canDelete && (
                  <button onClick={() => handleDelete(t)} className="shrink-0 rounded-full p-1.5 text-red-500 hover:bg-red-50">
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
