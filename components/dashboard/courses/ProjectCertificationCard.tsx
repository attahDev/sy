"use client";

// Adapted from GMBT-Updated-Frontend's ClimateDashboard/Component/
// ProjectCertificationCard.tsx — useQuery/useQueryClient swapped for plain
// useState/useEffect since react-query isn't a dependency in this repo.
// Logic and copy otherwise unchanged.
import { useEffect, useState } from "react";
import { Award, FileCheck2, MessageSquareWarning } from "lucide-react";
import { fetchCertificationStatus, submitCourseProject, type CertificationStatus } from "../../../lib/coursesApi";

export default function ProjectCertificationCard({ courseSlug }: { courseSlug: string }) {
  const [status, setStatus] = useState<CertificationStatus | null>(null);
  const [submissionUrl, setSubmissionUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = () => fetchCertificationStatus(courseSlug).then(setStatus).catch(() => {});
  useEffect(() => { load(); }, [courseSlug]);

  if (!status) return null;

  const handleSubmit = async () => {
    if (!submissionUrl.trim() || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      await submitCourseProject(courseSlug, submissionUrl.trim());
      load();
    } catch {
      setError("Couldn't submit your project — check the link and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-[18px] border border-[#E2E5E9] bg-[#FFFDF7] p-5 sm:p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF3C4] text-[#0D1B3E]">
        <FileCheck2 size={22} />
      </div>
      <h2 className="mt-4 text-[20px] font-semibold text-[#0D1B3E]">Course certificate</h2>
      <StatusBody status={status} submissionUrl={submissionUrl} onChangeUrl={setSubmissionUrl} onSubmit={handleSubmit} submitting={submitting} error={error} />
    </div>
  );
}

function StatusBody({ status, submissionUrl, onChangeUrl, onSubmit, submitting, error }: {
  status: CertificationStatus; submissionUrl: string; onChangeUrl: (v: string) => void;
  onSubmit: () => void; submitting: boolean; error: string | null;
}) {
  if (status.certificateStatus === "CERTIFIED") {
    return (
      <div className="mt-4 flex items-center gap-3 rounded-[14px] border border-[#FFE29A] bg-[#FFF9DD] p-4">
        <Award size={22} className="text-[#B8860B]" />
        <div>
          <p className="text-[14px] font-semibold text-[#0D1B3E]">You're certified</p>
          {status.certificatePdfUrl ? (
            <a href={status.certificatePdfUrl} target="_blank" rel="noopener noreferrer" className="text-[13px] font-semibold text-[#0D1B3E] underline">
              Download certificate (PDF)
            </a>
          ) : (
            <p className="text-[13px] text-[#687384]">Certificate PDF is on its way.</p>
          )}
        </div>
      </div>
    );
  }

  if (status.certificateStatus === "PROJECT_SUBMITTED") {
    return (
      <p className="mt-3 text-[14px] leading-6 text-[#687384]">
        Your project is submitted and waiting on a mentor's review. You'll see your certificate here as soon as it's approved.
      </p>
    );
  }

  if (status.certificateStatus === "CHANGES_REQUESTED") {
    return (
      <div className="mt-3">
        <div className="flex items-start gap-2 rounded-[12px] border border-[#F1C5CB] bg-[#FFF3F5] p-3">
          <MessageSquareWarning size={18} className="mt-0.5 shrink-0 text-[#8A1F1F]" />
          <p className="text-[13px] leading-6 text-[#8A1F1F]">
            {status.mentorFeedback || "Your mentor asked for some changes before this can be approved."}
          </p>
        </div>
        <SubmissionForm submissionUrl={submissionUrl} onChangeUrl={onChangeUrl} onSubmit={onSubmit} submitting={submitting} error={error} buttonLabel="Resubmit project" />
      </div>
    );
  }

  if (status.canSubmitProject) {
    return (
      <div className="mt-3">
        <p className="text-[14px] leading-6 text-[#687384]">
          All {status.quizzesTotal > 0 ? `${status.quizzesTotal} quizzes and ` : ""}chapters are done — submit a link to your final project (a repo, a deployed link, a doc — whatever this course asks for) for a mentor to review.
        </p>
        <SubmissionForm submissionUrl={submissionUrl} onChangeUrl={onChangeUrl} onSubmit={onSubmit} submitting={submitting} error={error} buttonLabel="Submit project" />
      </div>
    );
  }

  return (
    <div className="mt-3">
      <p className="text-[14px] leading-6 text-[#687384]">
        Complete every chapter{status.quizzesTotal > 0 ? " and pass every quiz" : ""} to unlock the final project submission.
      </p>
      {status.quizzesTotal > 0 && (
        <p className="mt-2 text-[13px] text-[#687384]">
          Quizzes passed: <span className="font-semibold text-[#0D1B3E]">{status.quizzesPassed}</span> of {status.quizzesTotal}
        </p>
      )}
    </div>
  );
}

function SubmissionForm({ submissionUrl, onChangeUrl, onSubmit, submitting, error, buttonLabel }: {
  submissionUrl: string; onChangeUrl: (v: string) => void; onSubmit: () => void;
  submitting: boolean; error: string | null; buttonLabel: string;
}) {
  return (
    <div className="mt-4 space-y-2">
      <input type="url" placeholder="https://…" value={submissionUrl} onChange={(e) => onChangeUrl(e.target.value)} className="w-full rounded-[10px] border border-[#D8DCE2] px-3 py-2 text-[14px] outline-none focus:border-[#0D1B3E]" />
      {error && <p className="text-[13px] text-[#8A1F1F]">{error}</p>}
      <button onClick={onSubmit} disabled={!submissionUrl.trim() || submitting} className="rounded-[10px] bg-[#D7263D] px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#BE1F34] disabled:opacity-50">
        {submitting ? "Submitting…" : buttonLabel}
      </button>
    </div>
  );
}
