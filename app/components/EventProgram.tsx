"use client";

const programmeItems = [
  {
    time: "10:00 – 10:15",
    title: "Event Opening",
    description: "Welcome by Rose Gordon · Introduction by Michael Ekpechue",
    size: "small",
  },
  {
    time: "10:15 – 10:25",
    title: "Inclusion, Identity & Access to Opportunity",
    description: "Grace Moronfolu MBE",
    size: "small",
  },
  {
    time: "10:25 – 11:05",
    title: "Panel 1: Civic Leadership & Social Impact in the Age of Innovation",
    description: "Mark Storey DL & Panelists",
    size: "medium",
  },
  {
    time: "11:05 – 11:45",
    title: "Panel 2: From Skills to Opportunity Bridging the Talent Gap",
    description: "Dr Ifedapo Francis Awolowo & Panelists",
    size: "small",
  },
  {
    time: "11:45 – 12:25",
    title: "Panel 3: Health, Wellbeing & Digital Access",
    description: "Dr Chinyere Elewachi Sam-Okerenta & Panelists",
    size: "medium",
  },
  {
    time: "12:55 – 13:15",
    title: "AI, Power & The Future of Decision Making",
    description: "Izzy Okosun",
    size: "medium",
  },
  {
    time: "13:15 – 13:55",
    title: "Panel 4: Startups, Creators & the Digital Economy",
    description: "Panel 4: Startups, Creators & the Digital Economy",
    size: "large",
  },
  {
    time: "13:55 – 14:00",
    title: "Closing Remarks & Thank You",
    description: "Connect · Collaborate · Grow",
    size: "closing",
  },
];

const firstRow = programmeItems.slice(0, 4);
const secondRow = programmeItems.slice(4, 8);

function cardSizeClass(size: string) {
  switch (size) {
    case "small":
      return "xl:col-span-3";
    case "medium":
      return "xl:col-span-4";
    case "large":
      return "xl:col-span-3";
    case "closing":
      return "xl:col-span-3";
    default:
      return "xl:col-span-3";
  }
}

function ProgrammeCard({
  item,
}: {
  item: {
    time: string;
    title: string;
    description: string;
    size: string;
  };
}) {
  const isClosing = item.size === "closing";

  return (
    <article
      className={[
        "rounded-[24px] px-6 py-7 sm:px-7 sm:py-8 lg:min-h-[215px]",
        isClosing
          ? "border-[0.67px] border-[#FFD70040] bg-[#FFD7001A]"
          : "border-[0.67px] border-[#0000001A] bg-[#FFFFFF0D]",
        cardSizeClass(item.size),
      ].join(" ")}
    >
      <p className="mb-4 font-open text-[10px] font-semibold tracking-[0.1em] text-[#FFD700] sm:text-[12px]">
        {item.time}
      </p>

      <h3 className="max-w-[95%] text-[16px] font-semibold leading-[1.28] tracking-[0.01em] text-white">
        {item.title}
      </h3>

      <p className="mt-5 font-open max-w-[92%] text-[14px] leading-[1.55] text-[#FFFFFF80]">
        {item.description}
      </p>
    </article>
  );
}

export default function EventProgrammeSection() {
  return (
    <section className="w-full bg-[#0D1B3E]">
      <div className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:px-12 lg:py-24 xl:px-[68px] xl:py-[78px]">
        <div className="mb-10 sm:mb-12 md:mb-14">
          <p className="mb-4 font-open text-[13px] font-semibold uppercase tracking-[0.28em] text-[#FFD700] sm:text-[14px]">
            10 APRIL 2026
          </p>

          <h2 className="text-[35px] font-medium uppercase leading-[0.95] tracking-[-0.03em] text-white md:text-[40px] lg:text-[45px]">
            Event Programme
          </h2>
        </div>

        {/* Mobile / tablet */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:hidden">
          {programmeItems.map((item) => (
            <ProgrammeCard key={`${item.time}-${item.title}`} item={item} />
          ))}
        </div>

        {/* Desktop exact 2 rows */}
        <div className="hidden xl:flex xl:flex-col xl:gap-6">
          <div className="grid grid-cols-14 gap-6">
            {firstRow.map((item) => (
              <ProgrammeCard key={`${item.time}-${item.title}`} item={item} />
            ))}
          </div>

          <div className="grid grid-cols-14 gap-6">
            {secondRow.map((item) => (
              <ProgrammeCard key={`${item.time}-${item.title}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}