"use client";

import { useEffect, useState } from "react";
import { fetchNewsArticle, fetchNewsComments, postNewsComment } from "../../../lib/newsApi";
import type { NewsArticle, NewsComment } from "../../../lib/newsApi";

export default function NewsArticleDetail({ id }: { id: string }) {
  const [article, setArticle] = useState<NewsArticle | null | undefined>(undefined);
  const [comments, setComments] = useState<NewsComment[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchNewsArticle(id).then(setArticle).catch(() => setArticle(null));
    fetchNewsComments(id).then(setComments).catch(() => setComments([]));
  }, [id]);

  const submitComment = async () => {
    if (!text.trim() || submitting) return;
    setSubmitting(true);
    try {
      const comment = await postNewsComment(id, text.trim(), name || undefined);
      setComments((prev) => [...prev, comment]);
      setText("");
    } finally {
      setSubmitting(false);
    }
  };

  if (article === undefined) return <p className="font-open text-[14px] text-[#6B7280]">Loading…</p>;
  if (!article) return <p className="font-open text-[14px] text-[#6B7280]">Article not found.</p>;

  return (
    <div className="mx-auto max-w-[760px]">
      <p className="font-open text-[12px] text-[#8B93A1]">
        {new Date(article.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
      </p>
      <h1 className="mt-2 text-[32px] font-medium leading-tight text-[#0D1B3E] sm:text-[40px]">{article.title}</h1>
      {article.body && (
        <div className="prose mt-8 max-w-none font-open text-[16px] leading-[1.8] text-[#3B4C74] whitespace-pre-wrap">
          {article.body}
        </div>
      )}

      <div className="mt-14 border-t border-[#0D1B3E14] pt-8">
        <h2 className="font-medium text-[18px] text-[#0D1B3E]">Comments</h2>
        <div className="mt-5 space-y-4">
          {comments.map((c) => (
            <div key={c.id} className="rounded-xl bg-[#FAF8F3] p-4">
              <p className="font-open text-[13px] font-semibold text-[#0D1B3E]">
                {c.author ? `${c.author.firstname} ${c.author.lastname}` : c.authorName || "Anonymous"}
              </p>
              <p className="mt-1 font-open text-[14px] text-[#3B4C74]">{c.content}</p>
            </div>
          ))}
          {comments.length === 0 && <p className="font-open text-[14px] text-[#8B93A1]">No comments yet.</p>}
        </div>

        <div className="mt-6 space-y-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (optional if signed in)"
            className="w-full rounded-lg border border-[#0D1B3E1F] px-3 py-2 font-open text-[14px] outline-none focus:border-[#0D1B3E]"
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a comment…"
            rows={3}
            className="w-full rounded-lg border border-[#0D1B3E1F] px-3 py-2 font-open text-[14px] outline-none focus:border-[#0D1B3E]"
          />
          <button
            onClick={submitComment}
            disabled={!text.trim() || submitting}
            className="rounded-full bg-[#D7263D] px-5 py-2 font-open text-[13px] font-semibold text-white disabled:opacity-50"
          >
            {submitting ? "Posting…" : "Post comment"}
          </button>
        </div>
      </div>
    </div>
  );
}
