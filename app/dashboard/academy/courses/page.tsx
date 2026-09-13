import CoursesGrid from "../../../../components/dashboard/courses/CoursesGrid";

export default function AcademyCoursesPage() {
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
