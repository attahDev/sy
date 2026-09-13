// Ported as-is from GMBT-Updated-Frontend's src/lib/greenImpactEvents.ts.
// A tiny pub/sub so logging a green action (owned by the right-rail form)
// can tell the top stat cards, leaderboard, and achievements widgets to
// refetch, without lifting state up through the whole composite page.
const EVENT_NAME = "green-impact:updated";

export function broadcastGreenImpactUpdate() {
  window.dispatchEvent(new Event(EVENT_NAME));
}

/** Call inside a useEffect; returns the cleanup function. */
export function onGreenImpactUpdate(handler: () => void): () => void {
  window.addEventListener(EVENT_NAME, handler);
  return () => window.removeEventListener(EVENT_NAME, handler);
}
