import AdminGuard from "@/components/dashboard/admin/AdminGuard";
import AdminFormSubmissions from "@/components/dashboard/admin/AdminFormSubmissions";

export default function AdminFormSubmissionsPage() {
  return (
    <AdminGuard>
      <AdminFormSubmissions />
    </AdminGuard>
  );
}
