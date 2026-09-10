"use client";

import { CheckCircle2, Clock, Heart, ImagePlus, MessageCircle, X, XCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import {
  addComment,
  createCommunityPost,
  fetchComments,
  fetchCommunityFeed,
  fetchMyPosts,
  toggleLike as apiToggleLike,
  type CommunityComment,
  type CommunityPost,
} from "@/lib/communityApi";
import { ContentSkeleton, SectionFeedback } from "@/components/shared/feedback";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diffMs / 3600000);
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

export default function CommunityPage() {
  const { user } = useAuth();
  const [feed, setFeed] = useState<CommunityPost[] | null>(null);
  const [mine, setMine] = useState<CommunityPost[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    fetchCommunityFeed()
      .then(setFeed)
      .catch(() => setError("Couldn't load the community feed. Try refreshing."));
    fetchMyPosts()
      .then(setMine)
      .catch(() => {});
  };

  useEffect(load, []);

  const flaggedOrRejected = useMemo(
    () => (mine ?? []).filter((post) => post.status !== "APPROVED"),
    [mine],
  );

  return (
    <div className="min-w-0 overflow-x-hidden bg-[#FFFDF7] pb-20 lg:pb-8">
      <div className="mx-auto max-w-[1400px] px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-extrabold text-[#001F3F] sm:text-3xl">Community</h1>
          <p className="mt-1 text-sm text-gray-500">
            Share a win, post a photo from an event, and celebrate what everyone is building.
          </p>

          <Composer
            authorName={user ? `${user.firstname} ${user.lastname}` : "You"}
            onPosted={load}
          />

          {flaggedOrRejected.length > 0 && (
            <div className="mt-6 space-y-2">
              {flaggedOrRejected.map((post) => (
                <div
                  key={post.id}
                  className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm ${
                    post.status === "PENDING"
                      ? "bg-amber-50 text-amber-800"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {post.status === "PENDING" ? (
                    <Clock className="h-4 w-4 shrink-0" />
                  ) : (
                    <XCircle className="h-4 w-4 shrink-0" />
                  )}
                  <span className="font-medium">{post.title}</span>
                  <span className="text-xs opacity-75">
                    {post.status === "PENDING"
                      ? "— awaiting admin approval"
                      : "— removed"}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 space-y-4 sm:space-y-6">
            {!feed && !error && <ContentSkeleton variant="row" count={2} />}

            {error && (
              <SectionFeedback
                variant="error"
                title="Couldn't load the community feed"
                description="Something went wrong while fetching posts."
                actionLabel="Try again"
                onAction={load}
              />
            )}

            {feed && feed.length === 0 && (
              <SectionFeedback
                variant="empty"
                title="No posts yet"
                description="Be the first to share a win or photo with the community."
              />
            )}

            {feed?.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Composer({
  authorName,
  onPosted,
}: {
  authorName: string;
  onPosted: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [authorRole, setAuthorRole] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const pickImage = (file: File | null) => {
    setImage(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const reset = () => {
    setTitle("");
    setDescription("");
    setAuthorRole("");
    pickImage(null);
    setOpen(false);
  };

  const submit = async () => {
    if (!title.trim() || !description.trim() || !authorRole.trim() || submitting) return;
    setSubmitting(true);
    try {
      await createCommunityPost({
        title,
        description,
        authorName,
        authorRole,
        image,
      });
      setMessage("Posted! It's live in the feed now.");
      reset();
      onPosted();
    } catch {
      setMessage("Couldn't submit your post — try again.");
    } finally {
      setSubmitting(false);
      setTimeout(() => setMessage(null), 5000);
    }
  };

  return (
    <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm sm:p-5">
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex w-full items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-left text-sm text-gray-400 transition-colors hover:border-gray-300"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#001F3F] text-xs font-semibold text-white">
            {initials(authorName)}
          </div>
          Share something with the community…
        </button>
      ) : (
        <div className="space-y-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Give it a headline — e.g. "Wrapped my first AWS deploy!"'
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-[#001F3F] focus:outline-none"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell everyone what happened…"
            rows={3}
            className="w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-[#001F3F] focus:outline-none"
          />
          <input
            value={authorRole}
            onChange={(e) => setAuthorRole(e.target.value)}
            placeholder="Your role — e.g. Frontend Developer"
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-[#001F3F] focus:outline-none"
          />

          {preview && (
            <div className="relative inline-block">
              {/* Preview is a local object URL, not a remote asset */}
              <img src={preview} alt="Preview" className="h-32 rounded-xl object-cover" />
              <button
                type="button"
                onClick={() => pickImage(null)}
                className="absolute -top-2 -right-2 rounded-full bg-white p-1 shadow"
                aria-label="Remove image"
              >
                <X className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          )}

          <div className="flex items-center justify-between">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-500 hover:text-[#001F3F]">
              <ImagePlus className="h-5 w-5" />
              {preview ? "Change photo" : "Add a photo"}
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                className="hidden"
                onChange={(e) => pickImage(e.target.files?.[0] ?? null)}
              />
            </label>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={reset}
                className="rounded-full px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={submit}
                disabled={!title.trim() || !description.trim() || !authorRole.trim() || submitting}
                className="rounded-full bg-[#D7263D] px-5 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-[#B81F32] disabled:opacity-50"
              >
                {submitting ? "Posting…" : "Post"}
              </button>
            </div>
          </div>
        </div>
      )}

      {message && (
        <p className="mt-3 flex items-center gap-1.5 text-sm text-gray-500">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          {message}
        </p>
      )}
    </div>
  );
}

function PostCard({ post }: { post: CommunityPost }) {
  const [likes, setLikes] = useState(post.likes);
  const [hasLiked, setHasLiked] = useState(post.hasLiked);
  const [pending, setPending] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const toggleLike = async () => {
    if (pending) return;
    const next = hasLiked
      ? { likes: Math.max(0, likes - 1), hasLiked: false }
      : { likes: likes + 1, hasLiked: true };
    setPending(true);
    setLikes(next.likes);
    setHasLiked(next.hasLiked);
    try {
      // Backend has one toggle endpoint, not separate like/unlike calls,
      // and only returns { liked } — the optimistic count set above is
      // what actually drives the displayed number.
      const result = await apiToggleLike(post.id);
      setHasLiked(result.liked);
    } catch {
      setLikes(post.likes);
      setHasLiked(post.hasLiked);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md sm:rounded-2xl">
      <div className="p-4 pb-0 sm:p-6 sm:pb-0">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white sm:h-10 sm:w-10 sm:text-sm ${post.avatarColor ?? "bg-red-600"}`}
            >
              {initials(post.authorName)}
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-gray-900 sm:text-sm">
                {post.authorName}
              </p>
              <p className="truncate text-[10px] text-gray-500 sm:text-xs">{post.authorRole}</p>
            </div>
          </div>
          <span className="shrink-0 whitespace-nowrap text-xs text-gray-400 sm:text-sm">
            {timeAgo(post.createdAt)}
          </span>
        </div>

        <h3 className="mt-3 text-lg font-bold text-gray-900 sm:text-xl">{post.title}</h3>
        <p className="mt-1 text-xs leading-relaxed text-gray-600 sm:text-sm">{post.description}</p>
      </div>

      {post.imageUrl && (
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="mt-4 block w-full group"
          aria-label="View full-size photo"
        >
          <img
            src={post.imageUrl}
            alt={post.title}
            loading="lazy"
            className="h-64 w-full object-cover transition group-hover:brightness-95 sm:h-80"
          />
        </button>
      )}

      <div className="flex items-center gap-4 px-4 py-3 sm:gap-6 sm:px-6 sm:py-4">
        <button
          type="button"
          onClick={toggleLike}
          disabled={pending}
          className={`flex items-center gap-1.5 transition disabled:opacity-60 sm:gap-2 ${
            hasLiked ? "text-red-600" : "text-gray-600 hover:text-red-600"
          }`}
          aria-label={hasLiked ? "Unlike" : "Like"}
        >
          <Heart className="h-4 w-4 sm:h-5 sm:w-5" fill={hasLiked ? "currentColor" : "none"} />
          <span className="text-xs font-medium sm:text-sm">{likes}</span>
        </button>
        <button
          type="button"
          onClick={() => setShowComments((value) => !value)}
          className="flex items-center gap-1.5 text-gray-600 transition hover:text-[#001F3F] sm:gap-2"
        >
          <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="text-xs font-medium sm:text-sm">{post.comments}</span>
        </button>
      </div>

      {showComments && (
        <div className="px-4 pb-4 sm:px-6 sm:pb-6">
          <CommentThread postId={post.id} />
        </div>
      )}

      {lightboxOpen && post.imageUrl && (
        <Lightbox src={post.imageUrl} alt={post.title} onClose={() => setLightboxOpen(false)} />
      )}
    </div>
  );
}

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-8"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
        aria-label="Close"
      >
        <X className="h-6 w-6" />
      </button>
      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-full max-w-full rounded-lg object-contain"
      />
    </div>
  );
}

function CommentThread({ postId }: { postId: string }) {
  const [comments, setComments] = useState<CommunityComment[] | null>(null);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchComments(postId)
      .then(setComments)
      .catch(() => setComments([]));
  }, [postId]);

  const submit = async () => {
    if (!text.trim() || submitting) return;
    setSubmitting(true);
    try {
      const comment = await addComment(postId, text.trim());
      setComments((prev) => [...(prev ?? []), comment]);
      setText("");
    } catch {
      // Keep the draft so they can retry.
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-4 space-y-3 border-t border-gray-100 pt-4">
      {comments === null && <p className="text-xs text-gray-400">Loading comments…</p>}
      {comments?.length === 0 && (
        <p className="text-xs text-gray-400">No comments yet — say something.</p>
      )}
      {comments?.map((comment) => (
        <div key={comment.id} className="flex gap-2 text-sm">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-200 text-[10px] font-semibold text-gray-600">
            {initials(`${comment.author.firstname} ${comment.author.lastname}`)}
          </div>
          <div>
            <span className="mr-1.5 font-semibold text-gray-900">
              {comment.author.firstname} {comment.author.lastname}
            </span>
            <span className="text-gray-600">{comment.content}</span>
          </div>
        </div>
      ))}

      <div className="flex items-center gap-2 pt-1">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Write a comment…"
          className="flex-1 rounded-full border border-gray-200 px-3 py-1.5 text-xs focus:border-[#001F3F] focus:outline-none"
        />
        <button
          type="button"
          onClick={submit}
          disabled={!text.trim() || submitting}
          className="rounded-full bg-[#001F3F] px-4 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
