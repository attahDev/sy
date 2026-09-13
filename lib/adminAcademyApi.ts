// Admin CRUD for SOUTH-YORKSHIRE-BACKEND's /academy/admin routes.
// Note what the backend does NOT support yet: there is no PATCH/DELETE
// for a module once added, and no endpoint to list a single course's
// modules on their own (findAllCoursesAdmin() must return them nested,
// per findCourseBySlug's shape) — module editing isn't possible from
// here yet, only adding new ones. See AdminCourses.tsx's note in-UI.
import { api } from "./api";

export type CourseSection = {
  id: string;
  title: string;
  type: "content" | "example" | "case-study" | "activity" | "summary" | "quiz";
  paragraphs?: string[];
  points?: string[];
  questions?: { id: string; question: string; options: string[]; correctIndex: number }[];
};

export type ModuleContent = {
  description?: string;
  duration?: string;
  learningOutcomes?: string[];
  sections?: CourseSection[];
};

export type AdminCourseModule = {
  id: string;
  title: string;
  order: number;
  content: ModuleContent | null;
};

export type AdminCourse = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  tags: string[];
  isFeatured: boolean;
  isActive: boolean;
  metadata: Record<string, unknown> | null;
  modules?: AdminCourseModule[];
};

export type CourseInput = {
  title: string;
  description?: string;
  tags?: string[];
  isFeatured?: boolean;
};

export type ModuleInput = {
  title: string;
  order?: number;
  content?: ModuleContent;
};

export type MockExamQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
};

export type MockExam = {
  id: string;
  courseId: string;
  passScore: number;
  timeLimitMinutes: number;
  questions: MockExamQuestion[];
};

export async function fetchAdminCourses(): Promise<AdminCourse[]> {
  const { data } = await api.get("/academy/admin/courses");
  return data?.data ?? data ?? [];
}

export async function createCourse(input: CourseInput): Promise<AdminCourse> {
  const { data } = await api.post("/academy/admin/courses", input);
  return data?.data ?? data;
}

export async function updateCourse(
  id: string,
  input: Partial<CourseInput> & { isActive?: boolean },
): Promise<AdminCourse> {
  const { data } = await api.patch(`/academy/admin/courses/${id}`, input);
  return data?.data ?? data;
}

export async function deleteCourse(id: string): Promise<void> {
  await api.delete(`/academy/admin/courses/${id}`);
}

export async function addModule(courseId: string, input: ModuleInput): Promise<AdminCourseModule> {
  const { data } = await api.post(`/academy/admin/courses/${courseId}/modules`, input);
  return data?.data ?? data;
}

export async function fetchAdminMockExam(courseId: string): Promise<MockExam | null> {
  const { data } = await api.get(`/academy/admin/courses/${courseId}/mock-exam`);
  return data?.data ?? data ?? null;
}

export async function upsertMockExam(
  courseId: string,
  input: { passScore: number; timeLimitMinutes: number; questions: MockExamQuestion[] },
): Promise<MockExam> {
  const { data } = await api.post(`/academy/admin/courses/${courseId}/mock-exam`, input);
  return data?.data ?? data;
}
