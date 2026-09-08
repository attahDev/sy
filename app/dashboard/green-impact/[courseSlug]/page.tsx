import CourseOverviewPageClient from "../../../../components/dashboard/courses/CourseOverviewPageClient";

export default async function GreenImpactCourseOverview({ params }: { params: Promise<{ courseSlug: string }> }) {
  const { courseSlug } = await params;
  return <CourseOverviewPageClient courseSlug={courseSlug} basePath="/dashboard/green-impact" />;
}
