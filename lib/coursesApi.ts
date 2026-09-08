// Ported from GMBT-Updated-Frontend's src/lib/coursesApi.ts — same GMBTE
// /courses contract, same {success,data,message,timestamp} envelope
// unwrapping as newsApi.ts/eventsApi.ts. category: 'climate' for Green
// Impact, 'education' for Academy — same courses engine serves both.
import { api } from "./api";
import type { CourseLesson, SustainabilityCourse } from "../types/course";

type BackendCourse = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  category: string | null;
  school: string | null;
  tags: string[];
  isFeatured: boolean;
  metadata: Record<string, any> | null;
  totalModules: number;
  completedModules?: number;
  progressPercent?: number;
  creditCost?: number;
};

type BackendModule = {
  id: string;
  slug: string;
  title: string;
  content: Record<string, any>;
  order: number;
};

function toLesson(mod: BackendModule): CourseLesson {
  const c = mod.content ?? {};
  return {
    slug: mod.slug,
    shortTitle: c.shortTitle ?? `Session ${mod.order + 1}`,
    title: mod.title,
    description: c.description ?? "",
    duration: c.duration ?? "",
    learningOutcomes: c.learningOutcomes ?? [],
    sections: c.sections ?? [],
  };
}

function toCourse(course: BackendCourse, modules: BackendModule[] = []): SustainabilityCourse {
  const m = course.metadata ?? {};
  return {
    slug: course.slug,
    title: course.title,
    shortDescription: m.shortDescription ?? course.description ?? "",
    fullDescription: m.fullDescription ?? course.description ?? "",
    image: m.image ?? "",
    duration: m.duration ?? "",
    contactHours: m.contactHours ?? "",
    mode: m.mode ?? "",
    level: m.level ?? "",
    progress: course.progressPercent ?? 0,
    certificateAvailable: m.certificateAvailable ?? false,
    learningOutcomes: m.learningOutcomes ?? [],
    lessons: modules.sort((a, b) => a.order - b.order).map(toLesson),
    finalProject: m.finalProject,
    tags: course.tags ?? [],
    school: course.school ?? null,
    isFeatured: course.isFeatured ?? false,
    isPremium: (course.creditCost ?? 0) > 0,
    priceCredits: course.creditCost ?? 0,
  };
}

export async function fetchCourses(
  category: "climate" | "education",
  school?: string,
): Promise<SustainabilityCourse[]> {
  const { data } = await api.get(`/courses`, { params: { category, school: school || undefined } });
  const courses: BackendCourse[] = data?.data ?? data;
  if (courses.length === 0) return [];

  let modulesByCourse: Record<string, BackendModule[]> = {};
  try {
    const ids = courses.map((c) => c.id).join(",");
    const modsRes = await api.get(`/courses/modules`, { params: { ids } });
    modulesByCourse = modsRes.data?.data ?? modsRes.data ?? {};
  } catch {
    // fall through — courses still render, just without lesson counts
  }

  return courses.map((course) => toCourse(course, modulesByCourse[course.id] ?? []));
}

export async function fetchCourseBySlug(courseSlug: string): Promise<SustainabilityCourse | null> {
  try {
    const [courseRes, modulesRes] = await Promise.all([
      api.get(`/courses/by-slug/${courseSlug}`),
      api.get(`/courses/by-slug/${courseSlug}/modules`),
    ]);
    const course: BackendCourse = courseRes.data?.data ?? courseRes.data;
    const modulesPayload = modulesRes.data?.data ?? modulesRes.data;
    const modules: BackendModule[] = modulesPayload?.modules ?? modulesPayload;
    return toCourse(course, modules);
  } catch {
    return null;
  }
}

type BackendModuleWithProgress = BackendModule & {
  completedSectionIds: string[];
  isCompleted: boolean;
  quizScores?: Record<string, { score: number; total: number; passed: boolean; attemptedAt?: string }>;
};

export async function fetchLessonBySlug(
  courseSlug: string,
  lessonSlug: string,
): Promise<{ course: SustainabilityCourse; lesson: CourseLesson } | null> {
  try {
    const { data } = await api.get(`/courses/by-slug/${courseSlug}/modules/${lessonSlug}`);
    const payload: { course: BackendCourse; module: BackendModuleWithProgress } = data?.data ?? data;

    const course = toCourse(payload.course, []);
    const lesson = toLesson(payload.module);
    const completedIds = new Set(payload.module.completedSectionIds);
    const quizScores = payload.module.quizScores ?? {};

    return {
      course,
      lesson: {
        ...lesson,
        completed: payload.module.isCompleted,
        sections: lesson.sections.map((s) => ({
          ...s,
          completed: completedIds.has(s.id),
          ...(s.type === "quiz" && quizScores[s.id] ? { quizResult: quizScores[s.id] } : {}),
        })),
      },
    };
  } catch {
    return null;
  }
}

export async function toggleSectionComplete(courseSlug: string, lessonSlug: string, sectionId: string) {
  const { data } = await api.patch(
    `/courses/by-slug/${courseSlug}/modules/${lessonSlug}/sections/${sectionId}/toggle`,
  );
  return data;
}

export async function submitQuiz(
  courseSlug: string,
  lessonSlug: string,
  sectionId: string,
  answers: Record<string, number>,
) {
  const { data } = await api.post(
    `/courses/by-slug/${courseSlug}/modules/${lessonSlug}/sections/${sectionId}/submit-quiz`,
    { answers },
  );
  return data?.data ?? data;
}

// ───────────────────────── Certification (project + review) ─────────────────────────
// Mock exam and mentor-review endpoints from the original coursesApi.ts
// aren't ported yet — see components/dashboard/courses/README for what's
// still open.

export type CertificationStatus = {
  certificateStatus: "NOT_STARTED" | "IN_PROGRESS" | "QUIZZES_PASSED" | "PROJECT_SUBMITTED" | "CHANGES_REQUESTED" | "CERTIFIED";
  isCompleted: boolean;
  quizzesTotal: number;
  quizzesPassed: number;
  canSubmitProject: boolean;
  projectSubmissionUrl: string | null;
  projectSubmittedAt: string | null;
  mentorFeedback: string | null;
  certificatePdfUrl: string | null;
  certificateVerificationCode: string | null;
};

export async function fetchCertificationStatus(courseSlug: string): Promise<CertificationStatus> {
  const { data } = await api.get(`/courses/by-slug/${courseSlug}/certification-status`);
  return data?.data ?? data;
}

export async function submitCourseProject(courseSlug: string, submissionUrl: string) {
  const { data } = await api.post(`/courses/by-slug/${courseSlug}/submit-project`, { submissionUrl });
  return data?.data ?? data;
}
