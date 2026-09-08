"use client";

// Adapted from GMBT-Updated-Frontend's ClimateDashboard/Component/
// CourseLessonPage.tsx — useQuery swapped for plain state; slugs come in
// as props from the server page.tsx.
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CourseSidebar } from "./CourseSidebar";
import { LessonContent } from "./LessonContent";
import { LessonNavigation } from "./LessonNavigation";
import { fetchLessonBySlug, submitQuiz, toggleSectionComplete } from "../../../lib/coursesApi";
import type { SustainabilityCourse, CourseLesson } from "../../../types/course";

export default function CourseLessonPageClient({ courseSlug, lessonSlug, basePath }: { courseSlug: string; lessonSlug: string; basePath: string }) {
  const router = useRouter();
  const [data, setData] = useState<{ course: SustainabilityCourse; lesson: CourseLesson } | null | undefined>(undefined);

  const load = () => { fetchLessonBySlug(courseSlug, lessonSlug).then(setData); };
  useEffect(load, [courseSlug, lessonSlug]);

  useEffect(() => {
    if (data === null) router.replace(basePath);
  }, [data, basePath, router]);

  if (data === undefined) {
    return (
      <main className="min-h-screen bg-[#F6F4EE] px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-sm text-[#6B7280]">Loading lesson…</p>
      </main>
    );
  }
  if (!data) return null;

  const { course, lesson } = data;

  const handleToggleSection = async (sectionId: string) => {
    setData((prev) => {
      if (!prev) return prev;
      return { ...prev, lesson: { ...prev.lesson, sections: prev.lesson.sections.map((s) => (s.id === sectionId ? { ...s, completed: !s.completed } : s)) } };
    });
    try {
      await toggleSectionComplete(courseSlug, lessonSlug, sectionId);
    } finally {
      load();
    }
  };

  const handleSubmitQuiz = async (sectionId: string, answers: Record<string, number>) => {
    const result = await submitQuiz(courseSlug, lessonSlug, sectionId, answers);
    setData((prev) => {
      if (!prev) return prev;
      return { ...prev, lesson: { ...prev.lesson, sections: prev.lesson.sections.map((s) => (s.id === sectionId ? { ...s, quizResult: result, completed: s.completed || result.passed } : s)) } };
    });
    load();
    return result;
  };

  return (
    <main className="min-h-screen bg-[#F6F4EE] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 lg:flex-row">
        <CourseSidebar course={course} basePath={basePath} />
        <div className="min-w-0 flex-1">
          <LessonContent course={course} lesson={lesson} onToggleSection={handleToggleSection} onSubmitQuiz={handleSubmitQuiz} />
          <LessonNavigation course={course} lessonSlug={lesson.slug} basePath={basePath} />
        </div>
      </div>
    </main>
  );
}
