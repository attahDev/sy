import { api } from "./api";

export type PostStatus = "PENDING" | "APPROVED" | "FLAGGED" | "REJECTED";

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

export async function fetchCommunityFeed(): Promise<CommunityPost[]> {
  const { data } = await api.get("/community/spotlight");
  return data?.data ?? data;
}

export async function fetchMyPosts(): Promise<CommunityPost[]> {
  const { data } = await api.get("/community/mine");
  return data?.data ?? data;
}

export async function likePost(id: string) {
  const { data } = await api.post(`/community/spotlight/${id}/like`);
  return (data?.data ?? data) as { likes: number; hasLiked: boolean };
}

export async function unlikePost(id: string) {
  const { data } = await api.delete(`/community/spotlight/${id}/like`);
  return (data?.data ?? data) as { likes: number; hasLiked: boolean };
}

export async function createCommunityPost(input: {
  title: string;
  description: string;
  image?: File | null;
}) {
  const form = new FormData();
  form.append("title", input.title);
  form.append("description", input.description);
  if (input.image) form.append("image", input.image);

  const { data } = await api.post("/community/posts", form);
  return (data?.data ?? data) as CommunityPost;
}

export async function fetchComments(postId: string): Promise<CommunityComment[]> {
  const { data } = await api.get(`/community/spotlight/${postId}/comments`);
  return data?.data ?? data;
}

export async function addComment(
  postId: string,
  content: string,
): Promise<CommunityComment> {
  const { data } = await api.post(`/community/spotlight/${postId}/comments`, {
    content,
  });
  return (data?.data ?? data) as CommunityComment;
}
