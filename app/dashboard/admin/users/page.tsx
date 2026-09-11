import AdminGuard from "@/components/dashboard/admin/AdminGuard";
import AdminUsers from "@/components/dashboard/admin/AdminUsers";

export default function AdminUsersPage() {
  return (
    <AdminGuard>
      <AdminUsers />
    </AdminGuard>
  );
}
