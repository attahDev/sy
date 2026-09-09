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
- **Admin project review** (`/dashboard/admin/course-reviews`, admin-only
  nav entry) — since mentors aren't in scope yet, this calls the same
  GMBTE endpoints (`@Roles(MENTOR, ADMIN)`) as an admin instead. Without
  this, a member who finishes a course and submits their final project
  would sit in `PROJECT_SUBMITTED` forever with nobody able to review it —
  this closes that loop. First admin-gated route in this dashboard, so
  `AdminGuard.tsx` is new client-side role-check scaffolding, not an
  existing pattern.
- **One real bug fixed, not just ported**: the original `CourseSidebar.tsx`
  and `LessonNavigation.tsx` track lesson completion via a browser-local
  `courseProgress.ts` (localStorage) store that's disconnected from the
  real server-side `ModuleProgress` the section checkboxes actually write
  to — meaning progress can drift (e.g. across devices, re-login). Fixed
  here to read `course.lessons[].completed` from the server response
  instead. Worth raising with whoever owns GMBT-Updated-Frontend.

## Not ported — real gaps, not oversights
- **Mock exam history widget** (`fetchMockExamHistory`, `coursePathFor`) —
  the exam-taking flow itself is ported (`MockExamPage.tsx`, works from
  the course overview's "Take mock exam" link), but the dashboard-wide
  "every mock exam you've taken, across every course" summary widget
  isn't built.
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
