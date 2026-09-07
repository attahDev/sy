import Reveal from "./Reveal";

/** Closing conversion band that appears at the foot of every content page. */
export default function CtaBand({
  eyebrow = "Get involved",
  title,
  description,
  children,
  id,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section
      id={id}
      className="relative w-full scroll-mt-24 overflow-hidden bg-[#0A1328]"
    >
      <div aria-hidden className="grid-overlay absolute inset-0 opacity-70" />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F5A623] opacity-[0.12] blur-[140px]"
      />

      <div className="relative mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-20 md:px-10 md:py-24 lg:px-12 xl:px-[78px]">
        <div className="mx-auto max-w-[900px] text-center">
          <Reveal>
            <p className="font-open text-[12px] font-semibold uppercase leading-none tracking-[0.3em] text-[#FFD700] sm:text-[13px]">
              {eyebrow}
            </p>

            <h2 className="mt-6 text-[31px] font-medium uppercase leading-[1] tracking-[-0.025em] text-white sm:text-[40px] md:text-[46px] lg:text-[50px]">
              {title}
            </h2>
          </Reveal>

          {description && (
            <Reveal delay={100}>
              <p className="mx-auto mt-6 max-w-[720px] font-open text-[16px] leading-[1.75] text-[#FFFFFFB3] sm:text-[18px]">
                {description}
              </p>
            </Reveal>
          )}

          <Reveal
            delay={180}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            {children}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
