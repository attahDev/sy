// Admin read/triage for SOUTH-YORKSHIRE-BACKEND's /form-submissions.
// These are the six public "Get Involved" forms (join-us,
// business-support, speaker, nominate, volunteer, cyber-training) that
// fix/stale-content-and-form-routing pointed at the real backend instead
// of Google Sheets — there was no admin UI to actually see what came in.
import { api } from "./api";

export const FORM_TYPES = [
  "join-us",
  "business-support",
  "speaker",
  "nominate",
  "volunteer",
  "cyber-training",
] as const;
export type FormType = (typeof FORM_TYPES)[number];
export type SubmissionStatus = "new" | "reviewed" | "archived";

export type FormSubmission = {
  id: string;
  type: FormType | string;
  name: string | null;
  email: string | null;
  data: Record<string, unknown>;
  status: SubmissionStatus;
  createdAt: string;
};

export async function fetchFormSubmissions(filters?: {
  type?: string;
  status?: string;
}): Promise<FormSubmission[]> {
  const { data } = await api.get("/form-submissions", { params: filters });
  return data?.data ?? data ?? [];
}

export async function updateSubmissionStatus(
  id: string,
  status: SubmissionStatus,
): Promise<FormSubmission> {
  const { data } = await api.patch(`/form-submissions/${id}/status`, { status });
  return data?.data ?? data;
}
