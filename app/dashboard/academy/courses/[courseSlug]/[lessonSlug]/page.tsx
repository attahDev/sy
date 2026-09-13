import CourseLessonPageClient from "../../../../../../components/dashboard/courses/CourseLessonPageClient";

export default async function AcademyCourseLesson({ params }: { params: Promise<{ courseSlug: string; lessonSlug: string }> }) {
  const { courseSlug, lessonSlug } = await params;
  return <CourseLessonPageClient courseSlug={courseSlug} lessonSlug={lessonSlug} basePath="/dashboard/academy/courses" />;
}
