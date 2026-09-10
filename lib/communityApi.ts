import { api } from "./api";

// Matches SOUTH-YORKSHIRE-BACKEND's SpotlightStory enum exactly — no
// FLAGGED status there (that's a GMBTE-only state).
export type PostStatus = "PENDING" | "APPROVED" | "REJECTED";

export type CommunityPost = {
  id: string;
  title: string;
  description: string;
  authorName: string;
  authorRole: string;
  avatarColor: string | null;
  imageUrl: string | null;
  likes: number;
  comments: number;
  status: PostStatus;
  flagReason?: string | null;
  createdAt: string;
  hasLiked: boolean;
};

export type CommunityComment = {
  id: string;
  postId: string;
  content: string;
  flagged?: boolean;
  flagReason?: string | null;
  createdAt: string;
  author: { firstname: string; lastname: string };
};

// Raw shape /community/stories actually returns — a Prisma row with
// _count and an optional likedBy match array, not the flat CommunityPost
// shape below. mapStory() bridges the two.
type RawStory = {
  id: string;
  title: string;
  description: string;
  authorName: string;
  authorRole: string;
  imageUrl: string | null;
  status: PostStatus;
  flagReason?: string | null;
  likes: number;
  createdAt: string;
  postId?: string;
  _count?: { comments: number; likedBy: number };
  likedBy?: { id: string }[];
};

function mapStory(raw: RawStory): CommunityPost {
  return {
    id: raw.id,
    title: raw.title,
    description: raw.description,
    authorName: raw.authorName,
    authorRole: raw.authorRole,
    avatarColor: null, // backend doesn't track this — PostCard falls back to a default
    imageUrl: raw.imageUrl,
    likes: raw.likes,
    comments: raw._count?.comments ?? 0,
    status: raw.status,
    flagReason: raw.flagReason,
    createdAt: raw.createdAt,
    hasLiked: (raw.likedBy?.length ?? 0) > 0,
  };
}

export async function fetchCommunityFeed(): Promise<CommunityPost[]> {
  const { data } = await api.get("/community/stories");
  const rows = (data?.data ?? data) as RawStory[];
  return rows.map(mapStory);
}

// NOTE: SOUTH-YORKSHIRE-BACKEND has no "my posts" endpoint yet — this
// call will 404 until one is added (CommunityController only has
// /stories, not a per-user filter). Left in place — CommunityPage
// already swallows the failure — so the "pending/rejected" banner just
// stays empty for now rather than breaking the page.
export async function fetchMyPosts(): Promise<CommunityPost[]> {
  const { data } = await api.get("/community/mine");
  const rows = (data?.data ?? data) as RawStory[];
  return rows.map(mapStory);
}

// Backend has one toggle endpoint (POST .../like), not separate like/
// unlike calls, and it returns { liked }, not an updated like count —
// PostCard already does its own optimistic count increment/decrement.
export async function toggleLike(id: string): Promise<{ liked: boolean }> {
  const { data } = await api.post(`/community/stories/${id}/like`);
  return (data?.data ?? data) as { liked: boolean };
}

export async function createCommunityPost(input: {
  title: string;
  description: string;
  authorName: string;
  authorRole: string;
  image?: File | null;
}) {
  let imageUrl: string | undefined;

  if (input.image) {
    const form = new FormData();
    form.append("file", input.image);
    const { data } = await api.post("/uploads/story-image", form);
    imageUrl = (data?.data ?? data)?.url;
  }

  const { data } = await api.post("/community/stories", {
    title: input.title,
    description: input.description,
    authorName: input.authorName,
    authorRole: input.authorRole,
    imageUrl,
  });
  return mapStory((data?.data ?? data) as RawStory);
}

export async function fetchComments(postId: string): Promise<CommunityComment[]> {
  const { data } = await api.get(`/community/stories/${postId}/comments`);
  return data?.data ?? data;
}

export async function addComment(
  postId: string,
  content: string,
): Promise<CommunityComment> {
  const { data } = await api.post(`/community/stories/${postId}/comments`, {
    content,
  });
  return (data?.data ?? data) as CommunityComment;
}
