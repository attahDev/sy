"use client";

// New — admin-only review queue for course project submissions, filling
// the gap left by not building a mentor system yet (see
// components/dashboard/courses/README: "since we aren't adding mentors
// yet"). Calls the same GMBTE endpoints @Roles(MENTOR, ADMIN) already
// allows for admins.
import { useEffect, useState } from "react";
import { CheckCircle2, ExternalLink, XCircle } from "lucide-react";
import { fetchPendingReviews, reviewCourseProject, type PendingReview } from "@/lib/coursesApi";

export default function CourseProjectReviews() {
  const [reviews, setReviews] = useState<PendingReview[] | null>(null);
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  const [submittingKey, setSubmittingKey] = useState<string | null>(null);

  const load = () => { fetchPendingReviews().then(setReviews); };
  useEffect(load, []);

  const keyFor = (r: PendingReview) => `${r.courseSlug}:${r.studentUserId}`;

  const handleReview = async (review: PendingReview, approve: boolean) => {
    const key = keyFor(review);
    setSubmittingKey(key);
    try {
      await reviewCourseProject(review.courseSlug, review.studentUserId, approve, feedback[key]);
      load();
    } finally {
      setSubmittingKey(null);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-[#0D1B3E]">Course project reviews</h1>
      <p className="mt-1 text-sm text-[#6B7280]">
        Approving issues the student's course-completion certificate. Rejecting asks them to
        resubmit — add feedback so they know what to change.
      </p>

      <div className="mt-6 space-y-4">
        {reviews === null && <p className="text-sm text-[#6B7280]">Loading…</p>}
        {reviews?.length === 0 && <p className="text-sm text-[#6B7280]">Nothing pending review.</p>}
        {reviews?.map((review) => {
          const key = keyFor(review);
          return (
            <div key={key} className="rounded-2xl border border-[#0D1B3E1F] bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-[#0D1B3E]">{review.studentName}</p>
                  <p className="text-sm text-[#6B7280]">{review.courseTitle}</p>
                </div>
                {review.submittedAt && (
                  <span className="text-xs text-[#8B93A1]">
                    Submitted {new Date(review.submittedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                  </span>
                )}
              </div>

              {review.submissionUrl && (
                <a href={review.submissionUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#0D1B3E] underline">
                  View submission <ExternalLink size={14} />
                </a>
              )}

              <textarea
                value={feedback[key] ?? ""}
                onChange={(e) => setFeedback((f) => ({ ...f, [key]: e.target.value }))}
                placeholder="Feedback (shown to the student, especially useful if requesting changes)"
                rows={2}
                className="mt-3 w-full rounded-lg border border-[#0D1B3E1F] px-3 py-2 text-sm outline-none focus:border-[#0D1B3E]"
              />

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => handleReview(review, true)}
                  disabled={submittingKey === key}
                  className="flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-1.5 text-sm font-semibold text-white disabled:opacity-50"
                >
                  <CheckCircle2 size={15} /> Approve
                </button>
                <button
                  onClick={() => handleReview(review, false)}
                  disabled={submittingKey === key}
                  className="flex items-center gap-1.5 rounded-full bg-red-600 px-4 py-1.5 text-sm font-semibold text-white disabled:opacity-50"
                >
                  <XCircle size={15} /> Request changes
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
