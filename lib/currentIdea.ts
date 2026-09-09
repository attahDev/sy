// Ported as-is from GMBT-Updated-Frontend's MarketResearchDashboard/lib/
// currentIdea.ts.
const KEY = "gmbte_current_idea_id";

export function setCurrentIdeaId(id: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(KEY, id);
}

export function getCurrentIdeaId(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(KEY);
}

export function clearCurrentIdeaId() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(KEY);
}
