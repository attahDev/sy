"use client";

// Not a port of GMBTE's AIDashboardPage.tsx — that's a whole separate
// nested sidebar+nav shell duplicating what DashboardShell already
// provides here (its "AI STUDIO" nav section already links to Idea
// Generator, Opportunity Insights, and Business Plan). This is a plain
// landing page for /dashboard/ai-studio: real counts pulled from the
// same APIs those three pages use, plus quick-launch cards into each.
import { useEffect, useState } from "react";
import Link from "next/link";
import { Lightbulb, BarChart3, FileText, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { listIdeas, type IdeaListItem } from "@/lib/ideaEngineApi";
import { getBusinessPlanHistory, type BusinessPlanHistoryItem } from "@/lib/businessPlannerApi";

const tools = [
  {
    href: "/dashboard/idea-generator",
    icon: Lightbulb,
    title: "Idea Generator",
    description: "Turn a rough business idea into a scored breakdown — market demand, feasibility, revenue projection.",
  },
  {
    href: "/dashboard/opportunity-insights",
    icon: BarChart3,
    title: "Opportunity Insights",
    description: "The same idea, viewed as a full market-validation report — competitors, target audience, competitive edge.",
  },
  {
    href: "/dashboard/business-plan",
    icon: FileText,
    title: "Business Plan",
    description: "Turn a generated idea into a structured plan with a roadmap you can track step by step.",
  },
];

export default function AiStudioPage() {
  const { user } = useAuth();
  const [ideas, setIdeas] = useState<IdeaListItem[] | null>(null);
  const [plans, setPlans] = useState<BusinessPlanHistoryItem[] | null>(null);

  useEffect(() => {
    listIdeas().then(setIdeas).catch(() => setIdeas([]));
    getBusinessPlanHistory().then(setPlans).catch(() => setPlans([]));
  }, []);

  const latestIdea = ideas?.[0];

  return (
    <div className="min-h-screen bg-[#F2F2EE] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1100px] space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0D1B3E]">
            AI Business Studio{user?.firstname ? `, ${user.firstname}` : ""}
          </h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            Everything in one place — generate an idea, validate it, and turn it into a plan.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#E4E8ED] bg-white p-5">
            <p className="text-xs font-semibold tracking-wide text-[#8A94A0] uppercase">Ideas generated</p>
            <p className="mt-1 text-3xl font-extrabold text-[#0D1B3E]">{ideas === null ? "—" : ideas.length}</p>
          </div>
          <div className="rounded-2xl border border-[#E4E8ED] bg-white p-5">
            <p className="text-xs font-semibold tracking-wide text-[#8A94A0] uppercase">Business plans</p>
            <p className="mt-1 text-3xl font-extrabold text-[#0D1B3E]">{plans === null ? "—" : plans.length}</p>
          </div>
        </div>

        {latestIdea && (
          <div className="rounded-2xl border border-[#E4E8ED] bg-white p-5">
            <p className="text-xs font-semibold tracking-wide text-[#8A94A0] uppercase">Most recent idea</p>
            <p className="mt-1 text-sm font-bold text-[#0D1B3E]">{latestIdea.business_idea}</p>
            <p className="mt-0.5 text-xs text-[#6B7280]">{latestIdea.confidence_score}/100 confidence score</p>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex flex-col justify-between rounded-2xl border border-[#E4E8ED] bg-white p-5 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0D1B3E]/5">
                  <tool.icon className="h-4 w-4 text-[#0D1B3E]" />
                </div>
                <h3 className="mt-3 text-sm font-bold text-[#0D1B3E]">{tool.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#6B7280]">{tool.description}</p>
              </div>
              <p className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#0D1B3E]">
                Open <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </p>
            </Link>
          ))}
        </div>

        {ideas?.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#E4E8ED] bg-white p-6 text-center">
            <p className="text-sm text-[#6B7280]">You haven&apos;t generated an idea yet — start with the Idea Generator above.</p>
          </div>
        )}
      </div>
    </div>
  );
}
