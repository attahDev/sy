"use client";

// Adapted from GMBT-Updated-Frontend's ClimateDashboard/Component/
// CourseOverviewPage.tsx — useQuery swapped for plain state; courseSlug
// comes in as a prop from the server page.tsx instead of useParams (Next
// App Router dynamic routes resolve params server-side).
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CourseOverview } from "./CourseOverview";
import { CourseSidebar } from "./CourseSidebar";
import { fetchCourseBySlug } from "../../../lib/coursesApi";
import type { SustainabilityCourse } from "../../../types/course";

export default function CourseOverviewPageClient({ courseSlug, basePath }: { courseSlug: string; basePath: string }) {
  const router = useRouter();
  const [course, setCourse] = useState<SustainabilityCourse | null | undefined>(undefined);

  useEffect(() => {
    fetchCourseBySlug(courseSlug).then(setCourse);
  }, [courseSlug]);

  useEffect(() => {
    if (course === null) router.replace(basePath);
  }, [course, basePath, router]);

  if (course === undefined) {
    return (
      <main className="min-h-screen bg-[#F6F4EE] px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-sm text-[#6B7280]">Loading course…</p>
      </main>
    );
  }
  if (!course) return null;

  return (
    <main className="min-h-screen bg-[#F6F4EE] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 lg:flex-row">
        <CourseSidebar course={course} basePath={basePath} />
        <CourseOverview course={course} basePath={basePath} />
      </div>
    </main>
  );
}
