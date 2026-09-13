import AdminGuard from "@/components/dashboard/admin/AdminGuard";
import CourseProjectReviews from "@/components/dashboard/admin/CourseProjectReviews";

export default function CourseReviewsPage() {
  return (
    <AdminGuard>
      <CourseProjectReviews />
    </AdminGuard>
  );
}
