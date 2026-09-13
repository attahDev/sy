import AdminGuard from "@/components/dashboard/admin/AdminGuard";
import AdminGreenProjects from "@/components/dashboard/admin/AdminGreenProjects";

export default function AdminGreenProjectsPage() {
  return (
    <AdminGuard>
      <AdminGreenProjects />
    </AdminGuard>
  );
}
