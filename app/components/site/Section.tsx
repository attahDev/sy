import Reveal from "./Reveal";

export type SectionTone = "white" | "cream" | "navy" | "deep";

const toneShell: Record<SectionTone, string> = {
  white: "bg-white",
  cream: "bg-[#FAF8F3]",
  navy: "bg-[#0D1B3E]",
  deep: "bg-[#0A1328]",
};

const isDark = (tone: SectionTone) => tone === "navy" || tone === "deep";

/** Full-bleed section band with the site's standard max width and gutters. */
export function Section({
  children,
  id,
  tone = "white",
  className,
  innerClassName,
  compact = false,
}: {
  children: React.ReactNode;
  id?: string;
  tone?: SectionTone;
  className?: string;
  innerClassName?: string;
  compact?: boolean;
}) {
  return (
    <section
      id={id}
      className={[
        "relative w-full scroll-mt-24 overflow-hidden",
        toneShell[tone],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className={[
          "relative mx-auto max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-12 xl:px-[78px]",
          compact
            ? "py-12 sm:py-14 md:py-16 lg:py-[72px]"
            : "py-14 sm:py-16 md:py-20 lg:py-24 xl:py-[104px]",
          innerClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </div>
    </section>
  );
}

/** Small uppercase label that sits above every section heading. */
export function Eyebrow({
  children,
  tone = "white",
  className,
}: {
  children: React.ReactNode;
  tone?: SectionTone;
  className?: string;
}) {
  return (
    <p
      className={[
        "font-open text-[12px] font-semibold uppercase leading-none tracking-[0.3em] sm:text-[13px]",
        isDark(tone) ? "text-[#FFD700]" : "text-[#D7263D]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </p>
  );
}

/** Eyebrow + heading + optional standfirst, used at the top of most sections. */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  tone = "white",
  align = "left",
  display = false,
  className,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  tone?: SectionTone;
  align?: "left" | "center";
  /** Use the Bebas Neue display face for oversized headings. */
  display?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  const dark = isDark(tone);
  const centered = align === "center";

  return (
    <Reveal
      className={[
        centered ? "mx-auto max-w-[900px] text-center" : "max-w-[900px]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrow && (
        <Eyebrow tone={tone} className="mb-5 sm:mb-6">
          {eyebrow}
        </Eyebrow>
      )}

      <h2
        className={[
          display
            ? "font-beb text-[42px] font-medium uppercase leading-[1.03] tracking-[0.035em] sm:text-[56px] md:text-[66px] lg:text-[72px]"
            : "text-[31px] font-medium uppercase leading-[0.98] tracking-[-0.03em] sm:text-[38px] md:text-[43px] lg:text-[45px]",
          dark ? "text-white" : "text-[#001F3F]",
        ].join(" ")}
      >
        {title}
      </h2>

      {intro && (
        <div
          className={[
            "mt-6 space-y-5 font-open text-[16px] leading-[1.75] sm:text-[18px]",
            centered ? "mx-auto max-w-[780px]" : "max-w-[820px]",
            dark ? "text-[#FFFFFFB3]" : "text-[#555555]",
          ].join(" ")}
        >
          {typeof intro === "string" ? <p>{intro}</p> : intro}
        </div>
      )}

      {children}
    </Reveal>
  );
}

/** Thin gold rule used as a decorative divider. */
export function Rule({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={[
        "block h-[3px] w-[64px] rounded-full bg-gradient-to-r from-[#D7263D] to-[#F5A623]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
