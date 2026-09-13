"use client";

// Adapted from GMBT-Updated-Frontend's ClimateDashboard/Component/
// CourseSidebar.tsx. The original derives "completed lessons"/progress %
// from a browser-local courseProgress.ts (localStorage) store that's
// disconnected from the real server-side ModuleProgress the section
// checkboxes actually write to — same bug flagged when this was first
// ported for a different Yorkshire frontend attempt. Fixed here to read
// `course.lessons[].completed` (server truth) instead of re-implementing
// a second, disconnected tracker. Worth raising with whoever owns the
// GMBT-Updated-Frontend repo.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, CheckCircle2, ChevronRight, LayoutDashboard } from "lucide-react";
import type { SustainabilityCourse } from "../../../types/course";

type CourseSidebarProps = { course: SustainabilityCourse; basePath?: string };

export function CourseSidebar({ course, basePath = "/dashboard/green-impact" }: CourseSidebarProps) {
  const pathname = usePathname();
  const completedLessons = course.lessons.filter((l) => l.completed).map((l) => l.slug);
  const progress = course.lessons.length > 0 ? Math.round((completedLessons.length / course.lessons.length) * 100) : 0;
  const courseBasePath = `${basePath}/${course.slug}`;

  return (
    <aside className="w-full rounded-[18px] border border-[#E2E5E9] bg-[#FFFDF7] p-4 lg:sticky lg:top-6 lg:w-[310px] lg:shrink-0 lg:self-start">
      <Link
        href={courseBasePath}
        className={`flex items-center gap-3 rounded-[12px] px-3 py-3 text-[14px] font-medium transition ${pathname === courseBasePath ? "bg-[#0D1B3E] text-white" : "text-[#516070] hover:bg-[#F2EFE7]"}`}
      >
        <LayoutDashboard size={18} /> Course Overview
      </Link>

      <div className="my-4 h-px bg-[#E5E7EB]" />
      <p className="px-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#8B93A1]">Course Content</p>

      <nav className="mt-3 space-y-1.5">
        {course.lessons.map((lesson, index) => {
          const href = `${courseBasePath}/${lesson.slug}`;
          const isActive = pathname === href;
          const isCompleted = lesson.completed;
          return (
            <Link
              key={lesson.slug}
              href={href}
              className={`group flex items-center gap-3 rounded-[12px] px-3 py-3 transition ${isActive ? "bg-[#FFF3C4] text-[#0D1B3E]" : "text-[#516070] hover:bg-[#F2EFE7]"}`}
            >
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold ${isCompleted ? "bg-[#16803B] text-white" : isActive ? "bg-[#FFD700] text-[#0D1B3E]" : "bg-[#EEF0F2] text-[#667085]"}`}>
                {isCompleted ? <CheckCircle2 size={16} /> : index + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12px] text-[#8B93A1]">{lesson.shortTitle}</span>
                <span className="mt-0.5 block truncate text-[14px] font-medium">{lesson.title}</span>
              </span>
              {isCompleted ? <CheckCircle2 size={17} className="text-[#16803B]" /> : <ChevronRight size={17} className="text-[#9AA3AF] transition group-hover:translate-x-0.5" />}
            </Link>
          );
        })}
      </nav>

      <div className="mt-5 rounded-[14px] bg-[#0D1B3E] p-4 text-white">
        <div className="flex items-center gap-2">
          <BookOpen size={18} className="text-[#FFD700]" />
          <p className="text-[14px] font-semibold">Course progress</p>
        </div>
        <div className="mt-4 flex items-center justify-between text-[13px] text-white/75">
          <span>{completedLessons.length} of {course.lessons.length} completed</span>
          <span>{progress}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/15">
          <div className="h-full rounded-full bg-[#FFD700] transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </aside>
  );
}
