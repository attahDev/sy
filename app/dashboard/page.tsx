"use client";

// Replaces the previous static Workspace page — that version hardcoded
// "Business Studio ... Coming next" even though it (and Idea Generator)
// shipped and went live. This pulls real counts from the same APIs the
// tool pages already use, so the copy can't go stale like that again,
// and gives admins a way into /dashboard/admin from the home page.
import { useEffect, useState } from "react";
import Link from "next/link";
import { Briefcase, GraduationCap, Leaf, Users, ShieldCheck, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { fetchUpcomingEvents } from "@/lib/eventsApi";
import { fetchCommunityFeed } from "@/lib/communityApi";
import { listIdeas } from "@/lib/ideaEngineApi";

const tools = [
  {
    title: "Academy",
    href: "/dashboard/academy",
    icon: GraduationCap,
    description: "Courses, lessons, quizzes, and certification.",
  },
  {
    title: "Climate Change",
    href: "/dashboard/green-impact",
    icon: Leaf,
    description: "Impact tracking, green exchange, leaderboard, and courses.",
  },
  {
    title: "Community",
    href: "/dashboard/community",
    icon: Users,
    description: "Share wins, photos, and updates with the community.",
  },
  {
    title: "Business Studio",
    href: "/dashboard/ai-studio",
    icon: Briefcase,
    description: "Generate an idea, validate it, and turn it into a plan.",
  },
];

export default function DashboardHomePage() {
  const { user } = useAuth();
  const [eventsCount, setEventsCount] = useState<number | null>(null);
  const [postsCount, setPostsCount] = useState<number | null>(null);
  const [ideasCount, setIdeasCount] = useState<number | null>(null);

  useEffect(() => {
    fetchUpcomingEvents().then((e) => setEventsCount(e.length)).catch(() => setEventsCount(0));
    fetchCommunityFeed().then((p) => setPostsCount(p.length)).catch(() => setPostsCount(0));
    listIdeas().then((i) => setIdeasCount(i.length)).catch(() => setIdeasCount(0));
  }, []);

  const isAdmin = user?.role === "ADMIN";

  const stats = [
    { label: "Upcoming events", value: eventsCount },
    { label: "Community posts", value: postsCount },
    { label: "Ideas generated", value: ideasCount },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-[#001F3F]">
        Welcome{user?.firstname ? `, ${user.firstname}` : ""}
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-[#6B7280]">
        South Yorkshire member tools, using the same SYBTE backend. Academy,
        Climate Change, Community, and Business Studio are all live.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-[#001F3F]/10 bg-white p-4">
            <p className="text-2xl font-extrabold text-[#001F3F]">{s.value ?? "—"}</p>
            <p className="mt-0.5 text-xs text-[#6B7280]">{s.label}</p>
          </div>
        ))}
      </div>

      {isAdmin && (
        <Link
          href="/dashboard/admin"
          className="mt-6 flex items-center justify-between rounded-2xl border border-[#001F3F]/10 bg-[#001F3F] px-5 py-4 text-white shadow-sm transition hover:bg-[#001F3F]/90"
        >
          <span className="flex items-center gap-2 text-sm font-semibold">
            <ShieldCheck className="h-4 w-4" />
            Go to Admin overview
          </span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className="rounded-2xl border border-[#001F3F]/10 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#001F3F] text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                  Live
                </span>
              </div>
              <h2 className="mt-4 text-lg font-bold text-[#001F3F]">{tool.title}</h2>
              <p className="mt-1 text-sm text-[#6B7280]">{tool.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
