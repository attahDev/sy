import AdminGuard from "@/components/dashboard/admin/AdminGuard";
import AdminEvents from "@/components/dashboard/admin/AdminEvents";

export default function AdminEventsPage() {
  return (
    <AdminGuard>
      <AdminEvents />
    </AdminGuard>
  );
}
