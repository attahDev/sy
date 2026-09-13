"use client";

// Generalized from GMBT-Updated-Frontend's ServicesSection/Toolkits/
// AcademyAllCourses.tsx — same search/category/school-filter/continue-
// learning UI, but parameterized so both Academy (category="education",
// with School filtering) and Green Impact (category="climate", no School
// filter — Schools are an Academy-only concept) can use one component
// instead of duplicating it.
import { useEffect, useMemo, useState } from "react";
import { BookOpen, Search, SlidersHorizontal } from "lucide-react";
import DashboardBreadcrumb from "../DashboardBreadcrumb";
import { CourseCard } from "./CourseCard";
import { fetchCourses } from "../../../lib/coursesApi";
import { ACADEMY_SCHOOLS } from "../../../lib/academySchools";
import type { SustainabilityCourse } from "../../../types/course";

type CoursesGridProps = {
  category: "education" | "climate";
  basePath: string;
  title: string;
  eyebrow: string;
  breadcrumbLabel: string;
  showSchoolFilter?: boolean;
};

export default function CoursesGrid({ category, basePath, title, eyebrow, breadcrumbLabel, showSchoolFilter = false }: CoursesGridProps) {
  const [courses, setCourses] = useState<SustainabilityCourse[] | null>(null);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSchool, setActiveSchool] = useState("");
  const [availableSchools, setAvailableSchools] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    setCourses(null);
    fetchCourses(category, activeSchool || undefined)
      .then((data) => { if (!cancelled) setCourses(data); })
      .catch(() => { if (!cancelled) setCourses([]); });
    return () => { cancelled = true; };
  }, [category, activeSchool]);

  useEffect(() => {
    if (!showSchoolFilter) return;
    let cancelled = false;
    fetchCourses(category)
      .then((all) => {
        if (cancelled) return;
        const present = new Set(all.map((c) => c.school).filter((s): s is string => Boolean(s)));
        setAvailableSchools(ACADEMY_SCHOOLS.filter((s) => present.has(s.value)).map((s) => s.value));
      })
      .catch(() => { if (!cancelled) setAvailableSchools([]); });
    return () => { cancelled = true; };
  }, [category, showSchoolFilter]);

  const categories = useMemo(() => {
    if (!courses) return ["All"];
    const tagSet = new Set<string>();
    courses.forEach((course) => course.tags.forEach((tag) => tagSet.add(tag)));
    return ["All", ...Array.from(tagSet).sort()];
  }, [courses]);

  const filteredCourses = useMemo(() => {
    if (!courses) return null;
    const q = query.trim().toLowerCase();
    return courses.filter((course) => {
      const matchesCategory = activeCategory === "All" || course.tags.includes(activeCategory);
      const matchesQuery = q.length === 0 || course.title.toLowerCase().includes(q) || course.shortDescription.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [courses, activeCategory, query]);

  const inProgressCourses = useMemo(() => (courses ?? []).filter((c) => c.progress > 0 && c.progress < 100), [courses]);

  return (
    <div className="min-h-screen bg-[#FFFDF7]">
      <div className="border-b-4 border-[#0D1B3E] bg-[#FFD700] px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-10">
        <DashboardBreadcrumb items={[{ label: "Dashboard", href: "/dashboard" }, { label: breadcrumbLabel, href: basePath }, { label: "All Courses" }]} />
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0D1B3E] sm:h-14 sm:w-14 sm:rounded-2xl md:h-16 md:w-16">
            <BookOpen className="text-[#FFD700]" size={26} />
          </div>
          <div>
            <p className="mb-1 text-sm font-medium text-[#0D1B3E] sm:mb-2 sm:text-base">{eyebrow}</p>
            <h1 className="text-lg font-bold leading-tight text-[#0D1B3E] sm:text-xl md:text-2xl">{title}</h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-10">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10">
          <div className="relative w-full sm:max-w-md">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses…"
              className="w-full rounded-xl border border-[#E2E8F0] bg-white py-2.5 pl-10 pr-4 text-sm text-[#0D1B3E] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0D1B3E] focus:ring-2 focus:ring-[#0D1B3E]/10 sm:py-3 sm:text-base"
            />
          </div>

          {showSchoolFilter && availableSchools.length > 0 && (
            <div className="-mx-4 flex items-start gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:gap-3 sm:px-0">
              <button type="button" onClick={() => setActiveSchool("")} className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition sm:text-sm ${activeSchool === "" ? "bg-[#0D1B3E] text-[#FFD700]" : "border border-[#0D1B3E]/20 bg-white text-[#0D1B3E] hover:bg-[#F1F5F9]"}`}>
                All Schools
              </button>
              {ACADEMY_SCHOOLS.filter((s) => availableSchools.includes(s.value)).map((s) => (
                <button key={s.value} type="button" onClick={() => setActiveSchool(s.value)} className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition sm:text-sm ${activeSchool === s.value ? "bg-[#0D1B3E] text-[#FFD700]" : "border border-[#0D1B3E]/20 bg-white text-[#0D1B3E] hover:bg-[#F1F5F9]"}`}>
                  {s.label}
                </button>
              ))}
            </div>
          )}

          <div className="-mx-4 flex items-start gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:gap-3 sm:px-0">
            <div className="mr-1 hidden shrink-0 items-center gap-1.5 pt-2 text-sm text-[#64748B] sm:flex">
              <SlidersHorizontal size={15} />
            </div>
            {categories.map((cat) => (
              <button key={cat} type="button" onClick={() => setActiveCategory(cat)} className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition sm:text-sm ${activeCategory === cat ? "bg-[#0D1B3E] text-[#FFD700]" : "bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {inProgressCourses.length > 0 && (
          <section className="mb-10 sm:mb-12">
            <h2 className="mb-4 text-xl font-semibold text-[#0D1B3E] sm:mb-6 sm:text-2xl">Continue Learning</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {inProgressCourses.map((course) => (
                <CourseCard key={course.slug} slug={course.slug} title={course.title} image={course.image} duration={course.duration} progress={course.progress} certificateAvailable={course.certificateAvailable} basePath={basePath} isPremium={course.isPremium} priceCredits={course.priceCredits} />
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="mb-4 text-xl font-semibold text-[#0D1B3E] sm:mb-6 sm:text-2xl">{activeCategory === "All" ? "All Courses" : activeCategory}</h2>
          {filteredCourses === null ? (
            <p className="text-sm text-[#6B7280]">Loading courses…</p>
          ) : filteredCourses.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#E2E8F0] bg-white py-16 text-center">
              <BookOpen className="mx-auto mb-3 text-[#CBD5E1]" size={32} />
              <p className="text-sm text-[#6B7280]">
                {courses && courses.length === 0 ? "No courses have been published yet — check back soon." : "No courses match your search."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {filteredCourses.map((course) => (
                <CourseCard key={course.slug} slug={course.slug} title={course.title} image={course.image} duration={course.duration} progress={course.progress} certificateAvailable={course.certificateAvailable} basePath={basePath} isPremium={course.isPremium} priceCredits={course.priceCredits} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
