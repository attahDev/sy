import CourseOverviewPageClient from "../../../../../components/dashboard/courses/CourseOverviewPageClient";

export default async function AcademyCourseOverview({ params }: { params: Promise<{ courseSlug: string }> }) {
  const { courseSlug } = await params;
  return <CourseOverviewPageClient courseSlug={courseSlug} basePath="/dashboard/academy/courses" />;
}
