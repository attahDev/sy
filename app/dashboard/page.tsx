import Link from "next/link";
import { Briefcase, GraduationCap, Leaf, Users } from "lucide-react";

const tools = [
  {
    title: "Academy",
    href: "/dashboard/academy",
    icon: GraduationCap,
    description: "Courses, lessons, quizzes, and certification.",
    ready: true,
  },
  {
    title: "Climate Change",
    href: "/dashboard/green-impact",
    icon: Leaf,
    description: "Course browsing and lessons are live; actions log, leaderboard, and green exchange are next.",
    ready: false,
  },
  {
    title: "Community",
    href: "/dashboard/community",
    icon: Users,
    description: "Share wins, photos, and updates with the community.",
    ready: true,
  },
  {
    title: "Business Studio",
    href: "/dashboard/business-plan",
    icon: Briefcase,
    description: "Business Plan and Opportunity Insights are live. Studio dashboard and Idea Generator are next.",
    ready: false,
  },
];

export default function DashboardHomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-[#001F3F]">Workspace</h1>
      <p className="mt-2 max-w-2xl text-sm text-[#6B7280]">
        South Yorkshire member tools, using the same GMBTE backend. Community,
        Academy, Business Plan, and Opportunity Insights are live; Climate
        Change has course browsing/lessons but not yet its full toolset, and
        the rest of Business Studio is next to port.
      </p>

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
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    tool.ready
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-800"
                  }`}
                >
                  {tool.ready ? "Live" : "Coming next"}
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
