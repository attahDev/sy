"use client";

// Client component so it can fetch and support search — page.tsx stays a
// server component for the metadata export, same split used elsewhere
// (e.g. CommunityPage is a client component rendered from a thin server
// route file).
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { fetchNewsArchive, type NewsArticle } from "../../../lib/newsApi";
import { Chip } from "./Cards";

export default function NewsArchiveList() {
  const [articles, setArticles] = useState<NewsArticle[] | null>(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchNewsArchive(search || undefined)
        .then(setArticles)
        .catch(() => setError("Couldn't load news right now — try refreshing."));
    }, 250); // light debounce so typing doesn't fire a request per keystroke
    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div>
      <div className="relative mb-10 max-w-md">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B93A1]" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search news…"
          className="w-full rounded-full border border-[#0D1B3E1F] bg-white py-3 pl-11 pr-4 font-open text-[14px] text-[#0D1B3E] outline-none transition focus:border-[#0D1B3E]"
        />
      </div>

      {error && <p className="font-open text-[14px] text-[#8A1F1F]">{error}</p>}
      {!articles && !error && <p className="font-open text-[14px] text-[#6B7280]">Loading…</p>}
      {articles?.length === 0 && (
        <p className="font-open text-[14px] text-[#6B7280]">
          {search ? `No articles match "${search}".` : "No articles published yet."}
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles?.map((article) => {
          const href = article.externalLink || `/news/${article.id}`;
          const external = !!article.externalLink;
          return (
            <Link
              key={article.id}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              className="group flex flex-col overflow-hidden rounded-[18px] border border-[#0D1B3E14] bg-white transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              {article.coverImageUrl && (
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={article.coverImageUrl}
                    alt={article.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-5">
                {article.isFeatured && (
                  <Chip variant="gold">Featured</Chip>
                )}
                <h3 className="mt-3 font-medium text-[18px] leading-snug text-[#0D1B3E]">
                  {article.title}
                  {external && (
                    <ArrowUpRight className="ml-1 inline h-4 w-4 -translate-y-0.5 text-[#8B93A1]" />
                  )}
                </h3>
                {article.excerpt && (
                  <p className="mt-2 font-open text-[14px] leading-relaxed text-[#6B7280]">
                    {article.excerpt}
                  </p>
                )}
                <p className="mt-4 font-open text-[12px] text-[#8B93A1]">
                  {new Date(article.publishedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
