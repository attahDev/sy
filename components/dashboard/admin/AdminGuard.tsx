"use client";

// First admin-gated area in this dashboard — no existing pattern to
// follow, so this is a straightforward client-side role check. Redirects
// non-admins back to the dashboard home rather than showing a 403 page,
// same UX as a nav item that simply isn't there for them.
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user?.role !== "ADMIN") {
      router.replace("/dashboard");
    }
  }, [isLoading, user, router]);

  if (isLoading || user?.role !== "ADMIN") return null;
  return <>{children}</>;
}
