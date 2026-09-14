import AdminGuard from "@/components/dashboard/admin/AdminGuard";
import AdminHonorees from "@/components/dashboard/admin/AdminHonorees";

export default function AdminHonoreesPage() {
  return (
    <AdminGuard>
      <AdminHonorees />
    </AdminGuard>
  );
}
