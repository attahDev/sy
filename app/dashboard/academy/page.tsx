import CoursesGrid from "../../../components/dashboard/courses/CoursesGrid";

// Replaces the ComingSoon placeholder. Note: this shows the course-browsing
// grid only — GMBT-Updated-Frontend's actual /dashboard/academy route shows
// a richer landing (EducationToolkit + EducationToolkitContent +
// EducationToolkitCommunity marketing sections) before this course grid,
// which lives at /dashboard/academy/courses there. Not ported yet — see
// components/dashboard/courses/README.
export default function AcademyPage() {
  return (
    <CoursesGrid
      category="education"
      basePath="/dashboard/academy/courses"
      title="All Courses & Learning Materials"
      eyebrow="eLearning Portal"
      breadcrumbLabel="Academy"
      showSchoolFilter
    />
  );
}
