import AdminGuard from "@/components/dashboard/admin/AdminGuard";
import AdminCourses from "@/components/dashboard/admin/AdminCourses";

export default function AdminCoursesPage() {
  return (
    <AdminGuard>
      <AdminCourses />
    </AdminGuard>
  );
}
