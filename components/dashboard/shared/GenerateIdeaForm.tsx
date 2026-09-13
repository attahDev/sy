"use client";

// New — not a port. GMBTE's real empty state (BPEmpty.tsx) points at
// "/dashboard/ai-studio" to generate an idea, and the actual generation UI
// lives in ChatSideBarPanel's mentor chat, both out of scope for this pass
// (see README). Without either, this screen would otherwise be a dead end
// for every member until Studio dashboard is ported — so this is a plain
// form calling the same generateIdea() the chat UI would have called,
// enough to make Business Plan usable standalone right now.
import { useState } from "react";
import { Sparkles } from "lucide-react";
import AIDashboardCard from "./AIDashboardCard";
import { generateIdea } from "@/lib/ideaEngineApi";
import { setCurrentIdeaId } from "@/lib/currentIdea";

const fields: { key: keyof FormState; label: string; placeholder: string }[] = [
  { key: "business_idea", label: "Business idea", placeholder: "e.g. AI-powered fitness coaching app" },
  { key: "industry", label: "Industry", placeholder: "e.g. Health & fitness" },
  { key: "target_audience", label: "Target audience", placeholder: "e.g. Busy professionals aged 25–40" },
  { key: "skills", label: "Your skills", placeholder: "e.g. React Native, product design" },
  { key: "budget", label: "Budget", placeholder: "e.g. £5,000" },
  { key: "location", label: "Location", placeholder: "e.g. South Yorkshire" },
  { key: "experience_level", label: "Experience level", placeholder: "e.g. First-time founder" },
  { key: "goal", label: "Goal", placeholder: "e.g. 200 paying subscribers in 90 days" },
];

type FormState = {
  business_idea: string; industry: string; target_audience: string; skills: string;
  budget: string; location: string; experience_level: string; goal: string;
};
const empty: FormState = { business_idea: "", industry: "", target_audience: "", skills: "", budget: "", location: "", experience_level: "", goal: "" };

export default function GenerateIdeaForm() {
  const [form, setForm] = useState<FormState>(empty);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async () => {
    if (!form.business_idea.trim() || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const idea = await generateIdea(form);
      setCurrentIdeaId(idea.id);
      window.location.reload(); // BPTabsClient reads currentIdea on mount
    } catch {
      setError("Couldn't generate your plan — check your details and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AIDashboardCard variant="default" padding="lg">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-[#F5A623]" />
        <h3 className="text-sm font-extrabold tracking-wide text-[#0D1B3E]">Generate your business plan</h3>
      </div>
      <p className="mb-5 text-sm text-[#5B6472]">
        Tell us about your idea and we'll build out a roadmap, financial projection, and business plan.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {fields.map((f) => (
          <label
            key={f.key}
            className={`flex flex-col gap-1.5 ${f.key === "business_idea" ? "sm:col-span-2" : ""}`}
          >
            <span className="text-xs font-semibold text-[#0D1B3E]">{f.label}</span>
            <input
              placeholder={f.placeholder}
              value={form[f.key]}
              onChange={set(f.key)}
              className="rounded-xl border border-[#E5E7EB] px-3.5 py-2.5 text-sm outline-none focus:border-[#0D1B3E]"
            />
          </label>
        ))}
      </div>
      {error && <p className="mt-3 text-sm text-[#8A1F1F]">{error}</p>}
      <button
        onClick={submit}
        disabled={!form.business_idea.trim() || submitting}
        className="mt-5 rounded-xl bg-[#D7263D] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#B91F33] disabled:opacity-50"
      >
        {submitting ? "Generating…" : "Build my plan"}
      </button>
    </AIDashboardCard>
  );
}
