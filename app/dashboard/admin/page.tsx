"use client";

// Admin landing page — before this, admins went straight from the sidebar
// into a sub-page with no single view of what needs attention. Pulls the
// same counts each admin sub-page already fetches individually.
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  GraduationCap,
  Inbox,
  ShieldCheck,
  Sprout,
} from "lucide-react";
import AdminGuard from "@/components/dashboard/admin/AdminGuard";
import { fetchAdminCourses } from "@/lib/adminAcademyApi";
import { fetchAdminEvents } from "@/lib/adminEventsApi";
import { fetchFormSubmissions } from "@/lib/adminFormSubmissionsApi";

function AdminOverview() {
  const [coursesCount, setCoursesCount] = useState<number | null>(null);
  const [eventsCount, setEventsCount] = useState<number | null>(null);
  const [pendingSubmissions, setPendingSubmissions] = useState<number | null>(null);

  useEffect(() => {
    fetchAdminCourses().then((c) => setCoursesCount(c.length)).catch(() => setCoursesCount(0));
    fetchAdminEvents().then((e) => setEventsCount(e.length)).catch(() => setEventsCount(0));
    fetchFormSubmissions({ status: "new" })
      .then((s) => setPendingSubmissions(s.length))
      .catch(() => setPendingSubmissions(0));
  }, []);

  const cards = [
    {
      label: "Courses",
      value: coursesCount,
      icon: GraduationCap,
      href: "/dashboard/admin/courses",
      cta: "Manage courses",
    },
    {
      label: "Upcoming events",
      value: eventsCount,
      icon: CalendarDays,
      href: "/dashboard/admin/events",
      cta: "Manage events",
    },
    {
      label: "New form submissions",
      value: pendingSubmissions,
      icon: Inbox,
      href: "/dashboard/admin/form-submissions",
      cta: "Review submissions",
      highlight: (pendingSubmissions ?? 0) > 0,
    },
  ];

  const shortcuts = [
    { label: "Course reviews", href: "/dashboard/admin/course-reviews", icon: ShieldCheck },
    { label: "Green projects", href: "/dashboard/admin/green-projects", icon: Sprout },
  ];

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-[#0D1B3E]">Admin overview</h1>
      <p className="mt-1 text-sm text-[#6B7280]">What needs attention right now.</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.href}
              href={c.href}
              className={`rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md ${
                c.highlight ? "border-amber-300" : "border-[#001F3F]/10"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0D1B3E] text-white">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <span className="text-2xl font-extrabold text-[#0D1B3E]">{c.value ?? "—"}</span>
              </div>
              <p className="mt-3 text-sm font-semibold text-[#0D1B3E]">{c.label}</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-[#6B7280]">
                {c.cta} <ArrowRight className="h-3 w-3" />
              </p>
            </Link>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {shortcuts.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.href}
              href={s.href}
              className="flex items-center gap-1.5 rounded-full border border-[#001F3F]/10 bg-white px-3.5 py-2 text-xs font-semibold text-[#0D1B3E] hover:bg-[#001F3F]/5"
            >
              <Icon className="h-3.5 w-3.5" /> {s.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function AdminOverviewPage() {
  return (
    <AdminGuard>
      <AdminOverview />
    </AdminGuard>
  );
}
