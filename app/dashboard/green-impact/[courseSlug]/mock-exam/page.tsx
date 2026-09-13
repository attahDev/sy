import MockExamPage from "@/components/dashboard/courses/MockExamPage";

export default async function GreenImpactMockExam({ params }: { params: Promise<{ courseSlug: string }> }) {
  const { courseSlug } = await params;
  return <MockExamPage courseSlug={courseSlug} basePath="/dashboard/green-impact" />;
}
