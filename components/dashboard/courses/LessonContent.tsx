"use client";

// Ported near-verbatim from GMBT-Updated-Frontend's ClimateDashboard/
// Component/LessonContent.tsx — no react-router/react-query dependency in
// the original, so only the type import path changed.
import { useState, type ElementType } from "react";
import {
  BookOpen, CheckCircle2, CircleHelp, Clock3, GraduationCap, Lightbulb, ListChecks, NotebookPen, Scale,
} from "lucide-react";
import type { SustainabilityCourse, CourseLesson, LessonSection, LessonSectionType } from "../../../types/course";

type LessonContentProps = {
  course: SustainabilityCourse;
  lesson: CourseLesson;
  onToggleSection: (sectionId: string) => void;
  onSubmitQuiz: (sectionId: string, answers: Record<string, number>) => Promise<{ score: number; total: number; passed: boolean }>;
};

type SectionStyle = { wrapper: string; iconWrapper: string; icon: ElementType; label: string };

const sectionStyles: Record<LessonSectionType, SectionStyle> = {
  content: { wrapper: "border-[#E2E5E9] bg-[#FFFDF7]", iconWrapper: "bg-[#E9EEF3] text-[#0D1B3E]", icon: BookOpen, label: "Lesson" },
  example: { wrapper: "border-[#E9D67A] bg-[#FFF9DD]", iconWrapper: "bg-[#FFD700] text-[#0D1B3E]", icon: Lightbulb, label: "Example" },
  "case-study": { wrapper: "border-[#D5DDEA] bg-[#F4F7FA]", iconWrapper: "bg-[#0D1B3E] text-white", icon: Scale, label: "Case study" },
  activity: { wrapper: "border-[#F1C5CB] bg-[#FFF3F5]", iconWrapper: "bg-[#D7263D] text-white", icon: ListChecks, label: "Activity" },
  summary: { wrapper: "border-[#D7E7DA] bg-[#F3FAF5]", iconWrapper: "bg-[#2D7A45] text-white", icon: CheckCircle2, label: "Summary" },
  questions: { wrapper: "border-[#DDD1F3] bg-[#F8F5FF]", iconWrapper: "bg-[#6B45A8] text-white", icon: CircleHelp, label: "Assessment" },
  quiz: { wrapper: "border-[#F1C5CB] bg-[#FFF3F5]", iconWrapper: "bg-[#0D1B3E] text-white", icon: NotebookPen, label: "Quiz" },
};

export function LessonContent({ course, lesson, onToggleSection, onSubmitQuiz }: LessonContentProps) {
  return (
    <div className="min-w-0 flex-1">
      <header className="rounded-[20px] bg-[#0D1B3E] px-5 py-8 text-white sm:px-8 lg:px-10 lg:py-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[13px] font-semibold uppercase tracking-[0.13em] text-[#FFD700]">{course.title}</p>
          {lesson.completed && (
            <span className="flex items-center gap-1.5 rounded-full bg-[#2D7A45]/20 px-3 py-1 text-[12px] font-semibold text-[#7FE0A0]">
              <CheckCircle2 size={14} /> Completed
            </span>
          )}
        </div>
        <h1 className="mt-3 max-w-[850px] text-[30px] font-semibold leading-[1.16] tracking-[-0.04em] sm:text-[38px] lg:text-[44px]">{lesson.title}</h1>
        <p className="mt-4 max-w-[780px] text-[15px] leading-7 text-white/70 sm:text-[16px]">{lesson.description}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <div className="flex items-center gap-2 rounded-[9px] border border-white/10 bg-white/10 px-3 py-2 text-[13px] text-white/80">
            <Clock3 size={16} className="text-[#FFD700]" /> {lesson.duration}
          </div>
          <div className="flex items-center gap-2 rounded-[9px] border border-white/10 bg-white/10 px-3 py-2 text-[13px] text-white/80">
            <GraduationCap size={16} className="text-[#FFD700]" /> {lesson.shortTitle}
          </div>
        </div>
      </header>

      <section className="mt-6 rounded-[18px] border border-[#E2E5E9] bg-[#FFFDF7] p-5 sm:p-7">
        <p className="text-[13px] font-semibold uppercase tracking-[0.13em] text-[#D7263D]">Learning outcomes</p>
        <h2 className="mt-2 text-[23px] font-semibold tracking-[-0.03em] text-[#0D1B3E]">By the end of this session, you should be able to:</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {lesson.learningOutcomes.map((outcome) => (
            <div key={outcome} className="flex items-start gap-3 rounded-[12px] bg-[#F5F2EA] p-4">
              <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-[#D7263D]" />
              <p className="text-[14px] leading-6 text-[#4E5D6C]">{outcome}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-6 space-y-5">
        {lesson.sections.map((section) => (
          <LessonSectionCard
            key={section.id}
            section={section}
            onToggleComplete={() => onToggleSection(section.id)}
            onSubmitQuiz={(answers) => onSubmitQuiz(section.id, answers)}
          />
        ))}
      </div>
    </div>
  );
}

function LessonSectionCard({
  section, onToggleComplete, onSubmitQuiz,
}: {
  section: LessonSection;
  onToggleComplete: () => void;
  onSubmitQuiz: (answers: Record<string, number>) => Promise<{ score: number; total: number; passed: boolean }>;
}) {
  const sectionType = section.type ?? "content";
  const style = sectionStyles[sectionType];
  const Icon = style.icon;
  const isQuestionSection = sectionType === "questions";
  const isQuiz = sectionType === "quiz";

  return (
    <section id={section.id} className={`scroll-mt-6 rounded-[18px] border p-5 sm:p-7 ${style.wrapper} ${section.completed ? "ring-2 ring-[#2D7A45]/40" : ""}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${style.iconWrapper}`}>
            <Icon size={21} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-semibold uppercase tracking-[0.13em] text-[#7E8794]">{style.label}</p>
            <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.025em] text-[#0D1B3E]">{section.title}</h2>
          </div>
        </div>
        {isQuiz ? (
          section.completed && (
            <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#2D7A45]/10 px-3 py-1.5 text-[13px] font-semibold text-[#2D7A45]">
              <CheckCircle2 size={15} /> Passed
            </span>
          )
        ) : (
          <label className="flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-[#D8DCE2] bg-white px-3 py-1.5 text-[13px] font-medium text-[#4E5D6C] transition hover:border-[#2D7A45]">
            <input type="checkbox" checked={!!section.completed} onChange={onToggleComplete} className="h-4 w-4 accent-[#2D7A45]" />
            {section.completed ? "Done" : "Mark as done"}
          </label>
        )}
      </div>

      {section.media && (
        <div className="mt-5">
          {section.media.type === "image" ? (
            <img src={section.media.url} alt={section.media.caption ?? section.title} className="w-full rounded-[14px] border border-[#E2E5E9] object-cover" />
          ) : (
            <video src={section.media.url} controls className="w-full rounded-[14px] border border-[#E2E5E9]" />
          )}
          {section.media.caption && <p className="mt-2 text-[13px] text-[#7E8794]">{section.media.caption}</p>}
        </div>
      )}

      {section.paragraphs && (
        <div className="mt-5 space-y-4">
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-[15px] leading-7 text-[#536170]">{paragraph}</p>
          ))}
        </div>
      )}

      {section.points && !isQuestionSection && (
        <ul className="mt-5 space-y-3">
          {section.points.map((point) => (
            <li key={point} className="flex items-start gap-3 text-[15px] leading-7 text-[#536170]">
              <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#D7263D]" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}

      {isQuiz && <QuizSectionBody section={section} onSubmit={onSubmitQuiz} />}
    </section>
  );
}

function QuizSectionBody({ section, onSubmit }: {
  section: LessonSection;
  onSubmit: (answers: Record<string, number>) => Promise<{ score: number; total: number; passed: boolean }>;
}) {
  const questions = section.questions ?? [];
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(section.quizResult ?? null);
  const [error, setError] = useState<string | null>(null);

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      setResult(await onSubmit(answers));
    } catch {
      setError("Couldn't submit the quiz — check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (questions.length === 0) {
    return <p className="mt-5 text-[14px] text-[#7E8794]">This quiz has no questions yet.</p>;
  }

  return (
    <div className="mt-6 space-y-4">
      {result && (
        <div className={`rounded-[12px] border px-4 py-3 text-[14px] ${result.passed ? "border-[#BFE3CB] bg-[#F3FAF5] text-[#1E7B3E]" : "border-[#F1C5CB] bg-[#FFF3F5] text-[#8A1F1F]"}`}>
          {result.passed ? `Passed — ${result.score}/${result.total} correct.` : `Not quite — ${result.score}/${result.total}. Review the session above and try again.`}
        </div>
      )}
      {questions.map((q, index) => (
        <div key={q.id} className="rounded-[14px] border border-[#E3DDF0] bg-white p-4 sm:p-5">
          <p className="text-[15px] font-medium leading-6 text-[#0D1B3E]">{index + 1}. {q.question}</p>
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
      <button type="button" onClick={handleSubmit} disabled={!allAnswered || submitting} className="flex h-[48px] w-full items-center justify-center rounded-[12px] bg-[#D7263D] px-5 text-[15px] font-semibold text-white transition hover:bg-[#BE1F34] disabled:opacity-50 sm:w-fit">
        {submitting ? "Submitting…" : result ? "Retake quiz" : "Submit quiz"}
      </button>
    </div>
  );
}
