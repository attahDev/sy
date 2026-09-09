import Link from "next/link";

export default function ComingSoon({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D7263D]">
        Porting from SYBTE
      </p>
      <h1 className="mt-2 text-3xl font-extrabold text-[#001F3F]">{title}</h1>
      <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">{description}</p>
      <Link
        href="/dashboard"
        className="mt-6 inline-flex rounded-full bg-[#001F3F] px-5 py-2 text-sm font-semibold text-white"
      >
        Back to overview
      </Link>
    </div>
  );
}
