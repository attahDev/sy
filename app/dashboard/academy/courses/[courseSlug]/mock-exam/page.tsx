import MockExamPage from "@/components/dashboard/courses/MockExamPage";

export default async function AcademyMockExam({ params }: { params: Promise<{ courseSlug: string }> }) {
  const { courseSlug } = await params;
  return <MockExamPage courseSlug={courseSlug} basePath="/dashboard/academy/courses" />;
}
