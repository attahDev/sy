"use client";
// Same pattern as opportunity-insights/MRPreviousReport.tsx — same
// idea history, same API, presented under the Idea Generator instead.
import { useEffect, useState } from "react";
import { listIdeas, type IdeaListItem } from "@/lib/ideaEngineApi";

function scoreColor(score: number) {
  if (score >= 80) return { text: "text-[#5AA34A]", bar: "bg-[#5AA34A]" };
  if (score >= 50) return { text: "text-[#F5A623]", bar: "bg-[#F5A623]" };
  return { text: "text-[#D7263D]", bar: "bg-[#D7263D]" };
}

function timeAgo(iso: string) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24));
  if (days <= 0) return "Generated today";
  if (days === 1) return "Generated 1 day ago";
  if (days < 7) return `Generated ${days} days ago`;
  const weeks = Math.floor(days / 7);
  return `Generated ${weeks} week${weeks > 1 ? "s" : ""} ago`;
}

export default function IGPreviousIdeas({ onSelect }: { onSelect?: (ideaId: string) => void }) {
  const [ideas, setIdeas] = useState<IdeaListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    listIdeas()
      .then((data) => { if (!cancelled) setIdeas(data.slice(0, 3)); })
      .catch(() => { if (!cancelled) setIdeas([]); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  if (loading || ideas.length === 0) return null;

  return (
    <section>
      <div className="mb-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-[#D8D8D0]" />
        <span className="flex items-center gap-1.5 px-1 text-center text-[10px] font-medium text-[#8A94A0] sm:text-xs">
          🗂️ Previously Generated Ideas
        </span>
        <div className="h-px flex-1 bg-[#D8D8D0]" />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {ideas.map((idea) => {
          const colors = scoreColor(idea.confidence_score);
          return (
            <button
              key={idea.id}
              type="button"
              onClick={() => onSelect?.(idea.id)}
              className="flex flex-col justify-between rounded-2xl border border-[#E4E8ED] bg-white p-5 text-left shadow-[0_4px_12px_rgba(15,23,42,0.05)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <div>
                <p className="text-xs font-extrabold tracking-[0.08em] text-[#0D1B3E] uppercase">{idea.business_idea}</p>
                <p className="mt-1 text-xs text-[#8A94A0]">{timeAgo(idea.created_at)}</p>
              </div>
              <div className="mt-4">
                <div className="flex items-baseline gap-1">
                  <span className={`text-2xl font-extrabold ${colors.text}`}>{idea.confidence_score}</span>
                  <span className="text-xs text-[#8A94A0]">/100 Confidence Score</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#ECEEE8]">
                  <div className={`h-full rounded-full ${colors.bar}`} style={{ width: `${idea.confidence_score}%` }} />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
