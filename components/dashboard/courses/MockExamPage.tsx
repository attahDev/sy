"use client";

// Ported near-verbatim from GMBT-Updated-Frontend's ClimateDashboard/
// Component/MockExamPage.tsx — react-router's useParams/Navigate/Link
// swapped for a courseSlug prop (from the server page.tsx) and next/link/
// next/navigation, same as the rest of the course engine port.
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Award, CheckCircle2, ChevronLeft, Clock3 } from "lucide-react";
import { fetchMockExam, submitMockExam, type MockExam, type MockExamResult } from "@/lib/coursesApi";

export default function MockExamPage({ courseSlug, basePath = "/dashboard/green-impact" }: {
  courseSlug: string; basePath?: string;
}) {
  const router = useRouter();
  const [exam, setExam] = useState<MockExam | null | undefined>(undefined);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<MockExamResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { fetchMockExam(courseSlug).then(setExam); }, [courseSlug]);

  if (exam === undefined) {
    return (
      <main className="min-h-screen bg-[#F6F4EE] px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-sm text-[#6B7280]">Loading mock exam…</p>
      </main>
    );
  }

  if (exam === null) {
    return (
      <main className="min-h-screen bg-[#F6F4EE] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[720px] rounded-[18px] border border-[#E2E5E9] bg-[#FFFDF7] p-8 text-center">
          <p className="text-[15px] text-[#687384]">There's no mock exam set up for this course yet.</p>
          <Link href={`${basePath}/${courseSlug}`} className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold text-[#0D1B3E]">
            <ChevronLeft size={16} /> Back to course
          </Link>
        </div>
      </main>
    );
  }

  const allAnswered = exam.questions.every((q) => answers[q.id] !== undefined);

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      setResult(await submitMockExam(courseSlug, answers));
    } catch {
      setError("Couldn't submit your exam — check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const retake = () => { setAnswers({}); setResult(null); };

  return (
    <main className="min-h-screen bg-[#F6F4EE] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[860px]">
        <Link href={`${basePath}/${courseSlug}`} className="inline-flex items-center gap-1 text-[13px] font-medium text-[#687384] hover:text-[#0D1B3E]">
          <ChevronLeft size={16} /> Back to course
        </Link>

        <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#D7263D]">Mock exam</p>
            <h1 className="mt-1 text-[26px] font-semibold tracking-[-0.03em] text-[#0D1B3E] sm:text-[32px]">{exam.title}</h1>
            <p className="mt-2 text-[14px] leading-6 text-[#687384]">
              {exam.questionCount} questions · pass mark {exam.passScore}% — practice for the real qualification exam, not the real thing.
            </p>
          </div>
          {exam.timeLimitMinutes && (
            <div className="flex items-center gap-2 rounded-full border border-[#E2E5E9] bg-white px-3 py-1.5 text-[13px] text-[#687384]">
              <Clock3 size={15} /> Suggested {exam.timeLimitMinutes} min
            </div>
          )}
        </div>

        {exam.attempts.length > 0 && !result && (
          <div className="mt-4 rounded-[14px] border border-[#E2E5E9] bg-white p-4 text-[13px] text-[#687384]">
            Best score so far: <span className="font-semibold text-[#0D1B3E]">{exam.bestScore}%</span> across {exam.attempts.length} attempt{exam.attempts.length === 1 ? "" : "s"}.
          </div>
        )}

        {result ? (
          <ResultCard result={result} passScore={exam.passScore} onRetake={retake} />
        ) : (
          <div className="mt-6 space-y-5">
            {exam.questions.map((q, index) => (
              <div key={q.id} className="rounded-[16px] border border-[#E2E5E9] bg-white p-5">
                <p className="text-[15px] font-semibold text-[#0D1B3E]">{index + 1}. {q.question}</p>
                <div className="mt-3 space-y-2">
                  {q.options.map((option, optionIndex) => (
                    <label key={optionIndex} className={`flex cursor-pointer items-center gap-3 rounded-[10px] border px-3 py-2 text-[14px] transition ${answers[q.id] === optionIndex ? "border-[#0D1B3E] bg-[#F5F2EA]" : "border-[#E6E8EB] hover:bg-[#FAFAF7]"}`}>
                      <input type="radio" name={q.id} checked={answers[q.id] === optionIndex} onChange={() => setAnswers((a) => ({ ...a, [q.id]: optionIndex }))} className="accent-[#0D1B3E]" />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            {error && <p className="text-[13px] text-[#8A1F1F]">{error}</p>}
            <button onClick={handleSubmit} disabled={!allAnswered || submitting} className="w-full rounded-[12px] bg-[#D7263D] px-6 py-3 text-[15px] font-semibold text-white transition hover:bg-[#BE1F34] disabled:opacity-50">
              {submitting ? "Submitting…" : "Submit exam"}
            </button>
            {!allAnswered && <p className="text-center text-[13px] text-[#687384]">Answer every question to submit.</p>}
          </div>
        )}
      </div>
    </main>
  );
}

function ResultCard({ result, passScore, onRetake }: { result: MockExamResult; passScore: number; onRetake: () => void }) {
  return (
    <div className="mt-6 rounded-[18px] border border-[#E2E5E9] bg-white p-6 sm:p-8">
      <div className={`flex h-14 w-14 items-center justify-center rounded-full ${result.passed ? "bg-[#E6F4EA] text-[#1E7B3E]" : "bg-[#FBE9E9] text-[#8A1F1F]"}`}>
        {result.passed ? <CheckCircle2 size={26} /> : <Clock3 size={26} />}
      </div>
      <h2 className="mt-4 text-[24px] font-semibold text-[#0D1B3E]">{result.passed ? "You passed — nice work" : "Not quite a pass yet"}</h2>
      <p className="mt-2 text-[15px] text-[#687384]">
        You scored <span className="font-semibold text-[#0D1B3E]">{result.score}%</span> ({result.correct}/{result.total}) — grade{" "}
        <span className="font-semibold text-[#0D1B3E]">{result.grade}</span>.{" "}
        {result.passed ? "That's above the pass mark, so this course's mock-exam certificate has been issued." : `The pass mark for this exam is ${passScore}%. Review the sessions and try again.`}
      </p>
      {result.certificate && (
        <div className="mt-5 flex items-center gap-3 rounded-[14px] border border-[#FFE29A] bg-[#FFF9DD] p-4">
          <Award size={22} className="text-[#B8860B]" />
          <div>
            <p className="text-[14px] font-semibold text-[#0D1B3E]">Mock exam certificate issued</p>
            <p className="text-[13px] text-[#687384]">Verification code: {result.certificate.verificationCode}</p>
            {result.certificate.pdfUrl ? (
              <a href={result.certificate.pdfUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-[13px] font-semibold text-[#0D1B3E] underline">
                Download certificate (PDF)
              </a>
            ) : (
              <p className="mt-1 text-[12px] text-[#687384]">Generating your certificate PDF — check back on your dashboard shortly.</p>
            )}
          </div>
        </div>
      )}
      <button onClick={onRetake} className="mt-6 rounded-[12px] border border-[#0D1B3E] px-5 py-2.5 text-[14px] font-semibold text-[#0D1B3E] transition hover:bg-[#F5F2EA]">
        Retake exam
      </button>
    </div>
  );
}
