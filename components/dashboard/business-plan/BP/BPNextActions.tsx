"use client";

// Ported as-is.
import { useEffect, useState } from "react";
import AIDashboardCard from "../AIDashboardCard";
import type { IdeaContent } from "@/lib/ideaEngineApi";
import { updatePlanProgress } from "@/lib/businessPlannerApi";

const defaultActions = [
  "Register business entity and open business bank account",
  "Hire freelance React Native developer for MVP",
  "Build email list to 500 subscribers before launch",
  "Integrate OpenAI API for personalized coaching engine",
];

export default function BPNextActions({ content, planId, initialCompletedIndexes = [] }: {
  content?: IdeaContent; planId?: string; initialCompletedIndexes?: number[];
}) {
  const actions = content?.next_actions?.length ? content.next_actions : defaultActions;
  const [completed, setCompleted] = useState<Set<number>>(new Set(initialCompletedIndexes));
  const [saving, setSaving] = useState(false);

  useEffect(() => { setCompleted(new Set(initialCompletedIndexes)); }, [planId]);

  const toggleAction = async (index: number) => {
    const next = new Set(completed);
    next.has(index) ? next.delete(index) : next.add(index);
    setCompleted(next);
    if (!planId) return;
    setSaving(true);
    try {
      await updatePlanProgress(planId, Array.from(next));
    } catch {
      setCompleted(completed);
    } finally {
      setSaving(false);
    }
  };

  const progressPct = actions.length ? Math.round((completed.size / actions.length) * 100) : 0;

  return (
    <AIDashboardCard variant="default" padding="md">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-extrabold tracking-wide text-[#0D1B3E]">Next Actions</h3>
        <span className="text-xs font-semibold text-[#5B6472]">{completed.size}/{actions.length} complete</span>
      </div>
      <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-[#E5E7EB]">
        <div className="h-full rounded-full bg-[#5AA34A] transition-all duration-300" style={{ width: `${progressPct}%` }} />
      </div>
      <div className="space-y-2">
        {actions.map((action, i) => {
          const isDone = completed.has(i);
          return (
            <label key={i} className="flex cursor-pointer items-start gap-3 rounded-lg bg-[#F7F8FA] px-3 py-2.5">
              <input type="checkbox" checked={isDone} onChange={() => toggleAction(i)} disabled={saving} className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-[#5AA34A] focus:ring-[#5AA34A]" />
              <p className={`text-sm ${isDone ? "text-[#9AA1AC] line-through" : "text-[#5B6472]"}`}>{action}</p>
            </label>
          );
        })}
      </div>
    </AIDashboardCard>
  );
}
