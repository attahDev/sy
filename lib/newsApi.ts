// Matches GMBTEBACKEND's real /news contract (src/engagement/news/news.
// controller.ts) — same routes, same response envelope as communityApi.ts
// already unwraps ({ success, data, message, timestamp } from
// ResponseInterceptor). "Admin pushes" content — no reader submission
// endpoint here, only comments.
import { api } from "./api";

export type NewsArticle = {
  id: string;
  title: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  body: string | null;
  externalLink: string | null;
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  publishedAt: string;
};

export type NewsComment = {
  id: string;
  content: string;
  authorName: string | null;
  createdAt: string;
  author: { firstname: string; lastname: string } | null;
};

/** Landing-page teaser — GET /news?limit=3 */
export async function fetchLatestNews(limit = 3): Promise<NewsArticle[]> {
  const { data } = await api.get("/news", { params: { limit } });
  return data?.data ?? data;
}

/** Full /news archive, with optional title/excerpt search — GET /news/all?search= */
export async function fetchNewsArchive(search?: string): Promise<NewsArticle[]> {
  const { data } = await api.get("/news/all", { params: search ? { search } : undefined });
  return data?.data ?? data;
}

/** Single article detail — GET /news/:id */
export async function fetchNewsArticle(id: string): Promise<NewsArticle> {
  const { data } = await api.get(`/news/${id}`);
  return data?.data ?? data;
}

export async function fetchNewsComments(id: string): Promise<NewsComment[]> {
  const { data } = await api.get(`/news/${id}/comments`);
  return data?.data ?? data;
}

/** Anyone can comment — accounts aren't public yet on GMBTE, so this works
 *  logged-out too (OptionalJwtAuthGuard on the backend), rate-limited to
 *  5/minute/IP. authorName only matters when there's no logged-in user. */
export async function postNewsComment(id: string, content: string, authorName?: string) {
  const { data } = await api.post(`/news/${id}/comments`, { content, authorName });
  return data?.data ?? data;
}
