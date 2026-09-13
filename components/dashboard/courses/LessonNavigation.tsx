"use client";

// Adapted from GMBT-Updated-Frontend's ClimateDashboard/Component/
// LessonNavigation.tsx. The original's "Mark as Complete" button toggled a
// lesson-level flag in the same disconnected localStorage store flagged in
// CourseSidebar.tsx — no matching "mark whole lesson complete" backend
// endpoint exists (only per-section toggle). Rather than port a second,
// competing completion tracker, this shows `lesson.completed` (server-
// computed, true once every section is checked) as a read-only badge.
// Previous/Next navigation is unchanged.
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import type { SustainabilityCourse } from "../../../types/course";

type LessonNavigationProps = { course: SustainabilityCourse; lessonSlug: string; basePath?: string };

export function LessonNavigation({ course, lessonSlug, basePath = "/dashboard/green-impact" }: LessonNavigationProps) {
  const currentIndex = course.lessons.findIndex((l) => l.slug === lessonSlug);
  const previousLesson = currentIndex > 0 ? course.lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex >= 0 && currentIndex < course.lessons.length - 1 ? course.lessons[currentIndex + 1] : null;
  const completed = course.lessons[currentIndex]?.completed;
  const courseBasePath = `${basePath}/${course.slug}`;

  return (
    <div className="mt-6 rounded-[18px] border border-[#E2E5E9] bg-[#FFFDF7] p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {previousLesson ? (
          <Link href={`${courseBasePath}/${previousLesson.slug}`} className="flex min-h-[48px] items-center justify-center gap-2 rounded-[12px] border border-[#D7DCE2] px-5 text-[14px] font-medium text-[#0D1B3E]">
            <ArrowLeft size={17} /> Previous
          </Link>
        ) : (
          <Link href={courseBasePath} className="flex min-h-[48px] items-center justify-center gap-2 rounded-[12px] border border-[#D7DCE2] px-5 text-[14px] font-medium text-[#0D1B3E]">
            <ArrowLeft size={17} /> Course Overview
          </Link>
        )}

        <span className={`flex min-h-[48px] items-center justify-center gap-2 rounded-[12px] px-5 text-[14px] font-semibold ${completed ? "bg-[#0D1B3E] text-white" : "bg-black/5 text-[#516070]"}`}>
          <CheckCircle2 size={18} /> {completed ? "All sections done" : "Mark sections above as done"}
        </span>

        {nextLesson ? (
          <Link href={`${courseBasePath}/${nextLesson.slug}`} className="flex min-h-[48px] items-center justify-center gap-2 rounded-[12px] bg-[#D7263D] px-5 text-[14px] font-semibold text-white transition hover:bg-[#BE1F34]">
            Next Lesson <ArrowRight size={17} />
          </Link>
        ) : (
          <Link href={courseBasePath} className="flex min-h-[48px] items-center justify-center gap-2 rounded-[12px] bg-[#0D1B3E] px-5 text-[14px] font-semibold text-white transition hover:bg-[#0D1B3E]/90">
            Finish Module <ArrowRight size={17} />
          </Link>
        )}
      </div>
    </div>
  );
}
