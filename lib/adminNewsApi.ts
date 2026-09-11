// Admin CRUD for SOUTH-YORKSHIRE-BACKEND's /news/admin routes. These are
// the platform's own announcements — no reader submissions or comments,
// so the panel is a plain create/edit/delete list.
import { api } from "./api";

export type AdminNewsArticle = {
  id: string;
  title: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  body: string | null;
  externalLink: string | null;
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  publishedAt: string | null;
};

export type NewsInput = {
  title: string;
  excerpt?: string;
  coverImageUrl?: string;
  body?: string;
  externalLink?: string;
  tags?: string[];
  isFeatured?: boolean;
  publishedAt?: string;
};

export async function fetchAdminNews(): Promise<AdminNewsArticle[]> {
  const { data } = await api.get("/news/admin/all");
  return data?.data ?? data ?? [];
}

export async function createNewsArticle(input: NewsInput): Promise<AdminNewsArticle> {
  const { data } = await api.post("/news/admin", input);
  return data?.data ?? data;
}

export async function updateNewsArticle(
  id: string,
  input: Partial<NewsInput> & { isActive?: boolean },
): Promise<AdminNewsArticle> {
  const { data } = await api.patch(`/news/admin/${id}`, input);
  return data?.data ?? data;
}

export async function deleteNewsArticle(id: string): Promise<void> {
  await api.delete(`/news/admin/${id}`);
}
