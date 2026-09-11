import AdminGuard from "@/components/dashboard/admin/AdminGuard";
import AdminNews from "@/components/dashboard/admin/AdminNews";

export default function AdminNewsPage() {
  return (
    <AdminGuard>
      <AdminNews />
    </AdminGuard>
  );
}
