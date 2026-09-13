// Ported as-is from GMBT-Updated-Frontend's ClimateDashboard/types/sustainability.ts.
export type LessonSectionType = "content" | "example" | "case-study" | "activity" | "summary" | "questions" | "quiz";

export type SectionMedia = { type: "image" | "video"; url: string; caption?: string };
export type QuizQuestion = { id: string; question: string; options: string[] };
export type QuizResult = { score: number; total: number; passed: boolean; attemptedAt?: string };

export type LessonSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  points?: string[];
  type?: LessonSectionType;
  media?: SectionMedia;
  order?: number;
  completed?: boolean;
  questions?: QuizQuestion[];
  quizResult?: QuizResult;
};

export type CourseLesson = {
  slug: string;
  shortTitle: string;
  title: string;
  description: string;
  duration: string;
  learningOutcomes: string[];
  sections: LessonSection[];
  completed?: boolean;
};

export type CourseProject = {
  title: string;
  description: string;
  deliverables: string[];
};

export type SustainabilityCourse = {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  duration: string;
  contactHours: string;
  mode: string;
  level: string;
  progress: number;
  certificateAvailable: boolean;
  learningOutcomes: string[];
  lessons: CourseLesson[];
  finalProject?: CourseProject;
  tags: string[];
  school: string | null;
  isFeatured: boolean;
  isPremium: boolean;
  priceCredits: number;
};
