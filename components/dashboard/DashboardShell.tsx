"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Award,
  Briefcase,
  CalendarDays,
  ChevronDown,
  GraduationCap,
  Heart,
  Inbox,
  Leaf,
  LayoutDashboard,
  LogOut,
  Menu,
  Newspaper,
  ShieldCheck,
  Sparkles,
  Sprout,
  UserCog,
  Users,
  X,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

const studioPaths = [
  "/dashboard/ai-studio",
  "/dashboard/idea-generator",
  "/dashboard/opportunity-insights",
  "/dashboard/business-plan",
];

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Academy", href: "/dashboard/academy", icon: GraduationCap },
  { label: "Climate Change", href: "/dashboard/green-impact", icon: Leaf },
  { label: "Community", href: "/dashboard/community", icon: Users },
  { label: "Tributes", href: "/dashboard/tributes", icon: Heart },
];

const studioItems = [
  { label: "Studio dashboard", href: "/dashboard/ai-studio" },
  { label: "Idea Generator", href: "/dashboard/idea-generator" },
  { label: "Opportunity Insights", href: "/dashboard/opportunity-insights" },
  { label: "Business Plan", href: "/dashboard/business-plan" },
];

const adminItems = [
  { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
  { label: "Courses", href: "/dashboard/admin/courses", icon: GraduationCap },
  { label: "Course reviews", href: "/dashboard/admin/course-reviews", icon: ShieldCheck },
  { label: "Events", href: "/dashboard/admin/events", icon: CalendarDays },
  { label: "News", href: "/dashboard/admin/news", icon: Newspaper },
  { label: "Green projects", href: "/dashboard/admin/green-projects", icon: Sprout },
  { label: "Award Recognition", href: "/dashboard/admin/honorees", icon: Award },
  { label: "Form submissions", href: "/dashboard/admin/form-submissions", icon: Inbox },
  { label: "Users", href: "/dashboard/admin/users", icon: UserCog },
];

function isActive(pathname: string, href: string) {
  if (href === "/dashboard" || href === "/dashboard/admin") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [studioOpen, setStudioOpen] = useState(() =>
    studioPaths.some((path) => pathname.startsWith(path)),
  );

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  const initials = user
    ? `${user.firstname?.[0] ?? ""}${user.lastname?.[0] ?? ""}`.toUpperCase()
    : "SY";

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="border-b border-white/10 px-5 py-5">
        <Link href="/" className="block text-sm font-semibold tracking-wide text-white">
          South Yorkshire
        </Link>
        <p className="mt-0.5 text-xs text-white/60">Member workspace</p>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-white/10 font-semibold text-white"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}

        <button
          type="button"
          onClick={() => setStudioOpen((open) => !open)}
          className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${
            studioPaths.some((path) => pathname.startsWith(path))
              ? "bg-white/10 font-semibold text-white"
              : "text-white/70 hover:bg-white/5 hover:text-white"
          }`}
        >
          <span className="flex items-center gap-3">
            <Briefcase className="h-4 w-4" />
            Business Studio
          </span>
          <ChevronDown className={`h-4 w-4 transition-transform ${studioOpen ? "rotate-180" : ""}`} />
        </button>

        {studioOpen && (
          <div className="ml-6 space-y-1">
            {studioItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                  isActive(pathname, item.href)
                    ? "font-semibold text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                {item.label}
              </Link>
            ))}
          </div>
        )}

        {user?.role === "ADMIN" && (
          <>
            <div className="my-2 h-px bg-white/10" />
            <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wide text-white/40">Admin</p>
            {adminItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    isActive(pathname, item.href)
                      ? "bg-white/10 font-semibold text-white"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </>
        )}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D7263D] text-xs font-semibold text-white">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">
              {user ? `${user.firstname} ${user.lastname}` : "Member"}
            </p>
            <p className="truncate text-xs text-white/50">{user?.email}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#FFFDF7]">
      <aside className="hidden w-64 shrink-0 bg-[#0D1B3E] lg:block">{sidebar}</aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative z-50 h-full w-64 bg-[#0D1B3E]">{sidebar}</aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-[#001F3F]/10 bg-white px-4 py-3 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 text-[#001F3F]"
            aria-label="Open menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <p className="text-sm font-semibold text-[#001F3F]">Member workspace</p>
          <span className="w-9" />
        </header>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
