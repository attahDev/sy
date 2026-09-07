"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { PageLoader } from "@/components/shared/feedback";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <PageLoader
        fullScreen
        message="Loading your dashboard"
        submessage="Getting your workspace ready…"
        className="min-h-screen bg-[#FFFDF7]"
      />
    );
  }

  if (!isAuthenticated) {
    return (
      <PageLoader
        fullScreen
        message="Redirecting to login"
        submessage="Please sign in to continue"
        className="min-h-screen bg-[#FFFDF7]"
      />
    );
  }

  return <DashboardShell>{children}</DashboardShell>;
}
