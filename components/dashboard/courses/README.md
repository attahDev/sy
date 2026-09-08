# Course engine — status

Ported from GMBT-Updated-Frontend's ClimateDashboard/Component/* (react-
router → next/link, react-query → useState/useEffect since this repo
doesn't have react-query as a dependency, useParams → server-page props).
Same GMBTE `/courses` API contract as the original — see `lib/coursesApi.ts`.

## Done
- Course browsing (search, tag filter, School filter for Academy, "Continue
  learning" row) — `CoursesGrid.tsx`, used by both `/dashboard/academy` and
  `/dashboard/green-impact`.
- Course overview page — `CourseOverview.tsx` (learning outcomes, curriculum
  list, final project card).
- Lesson player — `LessonContent.tsx` (all section types, per-section quiz
  grading), `CourseSidebar.tsx`, `LessonNavigation.tsx`.
- Project submission / certification status — `ProjectCertificationCard.tsx`.
- **One real bug fixed, not just ported**: the original `CourseSidebar.tsx`
  and `LessonNavigation.tsx` track lesson completion via a browser-local
  `courseProgress.ts` (localStorage) store that's disconnected from the
  real server-side `ModuleProgress` the section checkboxes actually write
  to — meaning progress can drift (e.g. across devices, re-login). Fixed
  here to read `course.lessons[].completed` from the server response
  instead. Worth raising with whoever owns GMBT-Updated-Frontend.

## Not ported — real gaps, not oversights
- **Mock exam** (`MockExamPage.tsx`, 242 lines) — the "Take mock exam" link
  on the course overview page currently 404s. `fetchMockExam`,
  `submitMockExam`, `fetchMockExamHistory` aren't in `lib/coursesApi.ts`
  yet either.
- **Mentor project review** (`fetchPendingReviews`, `reviewCourseProject`)
  — admin/mentor-side of the certification workflow, not member-facing,
  intentionally left out of this pass.
- **Academy's richer landing page** — GMBTE's actual `/dashboard/academy`
  shows `EducationToolkit` + `EducationToolkitContent` +
  `EducationToolkitCommunity` (marketing/orientation sections) before the
  course grid, which lives at `/dashboard/academy/courses` there. This repo
  puts the course grid directly at `/dashboard/academy` instead — simpler,
  but not what the original does.
- **Green Impact's non-course features** — `ClimateActionIndex` is a much
  bigger page than "courses filtered by category": `SustainabilityStats`,
  `GreenExchange`, `ExpertSupport`, `GreenInnovationProjects`,
  `MeasureYourImpact`, `ClimateInsightsData`, plus a `RightRail`
  (leaderboard, AI advisor, log-a-green-action form, achievements). None
  of that is ported — `/dashboard/green-impact` here is course-browsing
  only.
- **Business Studio** (Studio dashboard, Idea Generator, Opportunity
  Insights, Business Plan) — still `ComingSoon`, not touched in this pass.
