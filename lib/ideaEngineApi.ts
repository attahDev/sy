// Ported as-is from GMBT-Updated-Frontend's MarketResearchDashboard/lib/
// ideaEngineApi.ts. NOTE: unlike every other API client in this codebase,
// this one is NOT the shared GMBTE backend — idea-engine is a separate,
// independently-deployed FastAPI microservice with its own base URL and
// manual token handling (not the shared axios `api` instance from
// lib/api.ts). Reads the same "token" localStorage key that lib/api.ts's
// setStoredToken() writes, so auth stays in sync without extra wiring.
//
// Set NEXT_PUBLIC_IDEA_ENGINE_URL once the SY idea-engine (see
// SOUTH-YORKSHIRE-BACKEND/idea-engine/) is deployed on Render. The
// fallback below is an unrelated dev deployment — don't rely on it.
const BASE = (
  process.env.NEXT_PUBLIC_IDEA_ENGINE_URL ?? "https://ideaengiene-avcv.onrender.com"
).replace(/\/+$/, "");

function getToken() {
  if (typeof window === "undefined") return "";
  return (
    sessionStorage.getItem("token") ||
    localStorage.getItem("token") ||
    localStorage.getItem("gmbte_token") ||
    ""
  );
}

function headers(json = true): HeadersInit {
  const h: Record<string, string> = {};
  const token = getToken();
  if (token) h.Authorization = `Bearer ${token}`;
  if (json) h["Content-Type"] = "application/json";
  return h;
}

export type GenerateIdeaPayload = {
  business_idea: string;
  industry?: string;
  target_audience?: string;
  skills?: string;
  budget?: string;
  location?: string;
  experience_level?: string;
  goal?: string;
};

export type ScoredLabel = { label: string; score: number };

export type IdeaContent = {
  summary_card: { title: string; description: string; confidence_score: number };
  market_insights: {
    demand: ScoredLabel;
    competition: ScoredLabel;
    startup_cost: string;
    profit_potential: string;
    opportunity: string;
  };
  feasibility_card: { fit_score: number; difficulty: string; strengths: string[]; risks: string[] };
  revenue_chart: { model: string; scalability: string; projection: { month: string; revenue: number }[] };
  score_breakdown: { market: number; profit: number; execution: number; scalability: number };
  next_steps: string[];
  competitors: { name: string; description: string; score: number }[];
  target_audience: { text: string; segment: string }[];
  competitive_edge: string[];
  roadmap: { phases: { tag: string; title: string; items: { text: string; done: boolean }[] }[] };
  financials: {
    stats: { label: string; value: string; sub: string; badge?: string | null }[];
    chart: { label: string; amount: string; value: number }[];
  };
  business_model: { label: string; value: string }[];
  executive_summary: string;
  next_actions: string[];
  related_articles?: { title: string; description?: string | null; url: string; source_name?: string | null; published_at?: string | null }[] | null;
};

export type IdeaResponse = {
  id: string;
  user_id: string;
  business_idea: string;
  industry: string;
  content: IdeaContent;
  created_at: string;
};

export type IdeaListItem = {
  id: string;
  business_idea: string;
  industry: string;
  confidence_score: number;
  created_at: string;
};

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let detail = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      detail = body?.detail || detail;
    } catch {}
    throw new Error(detail);
  }
  return res.json();
}

export async function generateIdea(payload: GenerateIdeaPayload): Promise<IdeaResponse> {
  const res = await fetch(`${BASE}/api/ideas/generate`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(payload),
  });
  return handle<IdeaResponse>(res);
}

export async function listIdeas(): Promise<IdeaListItem[]> {
  const res = await fetch(`${BASE}/api/ideas`, { headers: headers(false) });
  return handle<IdeaListItem[]>(res);
}

export async function getIdea(ideaId: string): Promise<IdeaResponse> {
  const res = await fetch(`${BASE}/api/ideas/${ideaId}`, { headers: headers(false) });
  return handle<IdeaResponse>(res);
}
