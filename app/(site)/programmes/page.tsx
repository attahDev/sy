import type { Metadata } from "next";
import Image from "next/image";
import { Rocket, ShieldCheck, Sparkles, Users } from "lucide-react";

import PageHero from "../../components/site/PageHero";
import CtaBand from "../../components/site/CtaBand";
import Reveal from "../../components/site/Reveal";
import { Section, SectionHeader } from "../../components/site/Section";
import { ActionLink, ModalButton } from "../../components/site/Buttons";
import { roadmap } from "../../content/sybte";

export const metadata: Metadata = {
  title: "Programmes & Roadmap",
  description:
    "Current SYBTE delivery in cyber security, artificial intelligence, business leadership and entrepreneurship, plus our strategic roadmap for 2026, 2027 and 2028 and beyond.",
};

const programmes = [
  {
    icon: ShieldCheck,
    title: "Cyber Security & Policy",
    strand: "Capacity building",
    description:
      "Free training covering cyber security fundamentals, GDPR, data protection, and risk and compliance — delivered for beginners through to advanced practitioners.",
    outcomes: [
      "Online and in-person formats",
      "Beginner to advanced pathways",
      "Practical policy and compliance focus",
    ],
    image: "/awards/cyber-training.jpeg",
    modal: "cyber" as const,
    cta: "Register for training",
  },
  {
    icon: Sparkles,
    title: "Artificial Intelligence",
    strand: "Capacity building",
    description:
      "Applied AI sessions that move participants beyond the hype — understanding the tools, using them responsibly, and applying them to real work and business problems.",
    outcomes: [
      "Hands-on tooling sessions",
      "Responsible and ethical use",
      "Continued access via AI Business Studio",
    ],
    image: "/awards/Ai-Training.jpeg",
    modal: "join" as const,
    cta: "Join the next cohort",
  },
  {
    icon: Rocket,
    title: "Business Leadership & Entrepreneurship",
    strand: "Business growth",
    description:
      "Support for founders and business leaders across funding, marketing, product development, partnerships and investment readiness, with coaching and accelerator routes.",
    outcomes: [
      "Founder masterclasses",
      "Mentoring and coaching",
      "Investment readiness support",
    ],
    image: "/awards/ai-business-training.jpg",
    modal: "business" as const,
    cta: "Apply for business support",
  },
  {
    icon: Users,
    title: "Mentoring, Networks & Community",
    strand: "Progression",
    description:
      "The connective layer between programmes — mentoring relationships, peer networks and the digital platform that keeps participants supported long after a workshop ends.",
    outcomes: [
      "Mentor and speaker network",
      "Regional community space",
      "Ongoing digital resources",
    ],
    image: "/involved/iv2.jpg",
    modal: "speaker" as const,
    cta: "Become a mentor or speaker",
  },
];

const phaseAccent = [
  { dot: "bg-[#D7263D]", chip: "border-[#D7263D33] bg-[#D7263D0F] text-[#D7263D]" },
  { dot: "bg-[#E17100]", chip: "border-[#E1710033] bg-[#E171000F] text-[#B85C00]" },
  { dot: "bg-[#F5A623]", chip: "border-[#F5A62347] bg-[#F5A6231A] text-[#8A5D06]" },
];

export default function ProgrammesPage() {
  return (
    <>
      <PageHero
        breadcrumb="Programmes & Roadmap"
        eyebrow="Programmes & Roadmap"
        title="What we deliver,"
        accent="and where we're going"
        lead="Our current delivery focuses on capacity building in cyber security, artificial intelligence, business leadership and entrepreneurship. Alongside it we publish a living roadmap — a direction of travel rather than a set of fixed promises."
        image="/award/awd1.jpg"
        imageAlt="A professional working at a laptop during a SYBTE programme"
        stats={[
          { value: "5", label: "Specialist programmes delivered to date" },
          { value: "4", label: "Active delivery strands" },
          { value: "46", label: "Participants trained so far" },
          { value: "2026–28", label: "Roadmap horizon" },
        ]}
      >
        <ModalButton modal="cyber" variant="gold" size="lg" withArrow>
          Free cyber security training
        </ModalButton>
        <ActionLink href="/events" variant="outlineLight" size="lg">
          Upcoming events
        </ActionLink>
      </PageHero>

      {/* Current delivery */}
      <Section tone="white">
        <SectionHeader
          eyebrow="Current delivery"
          title="Four strands, one progression route"
          intro="Each strand is designed to stand alone and to connect. Someone can arrive through free cyber security training and leave with a mentor, a community and access to the digital platform."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:mt-16">
          {programmes.map((programme, index) => (
            <Reveal
              as="article"
              key={programme.title}
              delay={index * 100}
              className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-[#DADDE2] bg-white transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_34px_70px_-40px_rgba(13,27,62,0.45)]"
            >
              <div className="relative h-[210px] w-full overflow-hidden bg-[#0A1328] sm:h-[240px]">
                <Image
                  src={programme.image}
                  alt={programme.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top transition duration-500 group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-[#0A1328]/70 via-transparent to-[#0A1328]/25"
                />

                <span className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/35 px-3.5 py-1.5 font-open text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                  {programme.strand}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-7 sm:p-8">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[15px] bg-[#D7263D14] text-[#D7263D] transition-colors duration-300 group-hover:bg-[#D7263D] group-hover:text-white">
                    <programme.icon className="h-[22px] w-[22px]" aria-hidden />
                  </span>

                  <h3 className="text-[21px] font-semibold leading-[1.22] tracking-[-0.02em] text-[#001F3F] sm:text-[23px]">
                    {programme.title}
                  </h3>
                </div>

                <p className="mt-6 font-open text-[15px] leading-[1.75] text-[#555555] sm:text-[16px]">
                  {programme.description}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {programme.outcomes.map((outcome) => (
                    <li
                      key={outcome}
                      className="rounded-full border border-[#0D1B3E1A] bg-[#FAF8F3] px-3.5 py-1.5 font-open text-[12.5px] font-medium text-[#3B4C74]"
                    >
                      {outcome}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-2">
                  <ModalButton
                    modal={programme.modal}
                    variant="outlineDark"
                    size="sm"
                    withArrow
                  >
                    {programme.cta}
                  </ModalButton>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Roadmap */}
      <Section tone="navy">
        <SectionHeader
          eyebrow="Roadmap"
          title="A living roadmap for 2026 to 2028"
          intro="We publish our direction openly so partners, participants and funders can see where we are heading. Milestones evolve as the region and the community evolve."
          tone="navy"
        />

        <div className="relative mt-16 xl:mt-20">
          <span
            aria-hidden
            className="absolute left-[11px] top-2 hidden h-[calc(100%-2rem)] w-[2px] bg-gradient-to-b from-[#D7263D] via-[#E17100] to-[#F5A62300] lg:block"
          />

          <div className="flex flex-col gap-14 lg:gap-20">
            {roadmap.map((phase, index) => {
              const accent = phaseAccent[index] ?? phaseAccent[2];

              return (
                <Reveal
                  key={phase.period}
                  delay={index * 90}
                  className="relative lg:pl-[68px]"
                >
                  <span
                    aria-hidden
                    className={`absolute left-0 top-[10px] hidden h-[24px] w-[24px] items-center justify-center rounded-full border-[5px] border-[#0D1B3E] lg:flex ${accent.dot}`}
                  />

                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
                    <div>
                      <span
                        className={`inline-flex items-center rounded-full border px-3.5 py-1.5 font-open text-[11.5px] font-semibold uppercase tracking-[0.16em] ${accent.chip}`}
                        style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                      >
                        Phase {index + 1}
                      </span>

                      <p className="mt-6 font-beb text-[42px] font-medium uppercase leading-none tracking-[0.03em] text-[#FFD700] sm:text-[52px] lg:text-[58px]">
                        {phase.period}
                      </p>

                      <h3 className="mt-4 text-[23px] font-semibold leading-[1.25] tracking-[-0.02em] text-white sm:text-[26px]">
                        {phase.title}
                      </h3>

                      <p className="mt-5 font-open text-[15px] leading-[1.75] text-[#FFFFFF99] sm:text-[16px]">
                        {phase.summary}
                      </p>
                    </div>

                    <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.03] sm:grid-cols-2">
                      {phase.milestones.map((milestone, milestoneIndex) => (
                        <li
                          key={milestone}
                          className="flex gap-4 border-b border-white/[0.07] p-6 last:border-b-0 sm:border-r sm:[&:nth-child(2n)]:border-r-0"
                        >
                          <span className="mt-[2px] font-open text-[12px] font-semibold tabular-nums tracking-[0.1em] text-[#FFD70099]">
                            {String(milestoneIndex + 1).padStart(2, "0")}
                          </span>
                          <span className="font-open text-[14.5px] leading-[1.65] text-[#FFFFFFB8] sm:text-[15px]">
                            {milestone}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      {/* How progression works */}
      <Section tone="cream">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeader
            eyebrow="Progression"
            title="From a first workshop to a real outcome"
            intro="Attendance is the start, not the goal. Every programme is wired into ongoing support so that learning turns into confidence, mentoring, employment or a business that grows."
            tone="cream"
          >
            <div className="mt-10 flex flex-wrap gap-4">
              <ActionLink href="/platform" variant="outlineDark" withArrow>
                Explore the digital platform
              </ActionLink>
            </div>
          </SectionHeader>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                step: "01",
                title: "Register",
                body: "Sign up for a free training programme, event or the community platform.",
              },
              {
                step: "02",
                title: "Train",
                body: "Take part in specialist sessions in cyber security, AI, leadership or enterprise.",
              },
              {
                step: "03",
                title: "Connect",
                body: "Meet mentors, peers, partners and employers through the regional network.",
              },
              {
                step: "04",
                title: "Progress",
                body: "Continue on the digital platform with resources, tools and ongoing support.",
              },
            ].map((item, index) => (
              <Reveal
                key={item.step}
                delay={index * 90}
                className="relative overflow-hidden rounded-[22px] border border-[#DADDE2] bg-white p-7 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-38px_rgba(13,27,62,0.42)]"
              >
                <span className="font-beb text-[42px] leading-none tracking-[0.04em] text-[#0D1B3E1F]">
                  {item.step}
                </span>
                <h3 className="mt-4 text-[19px] font-semibold tracking-[-0.02em] text-[#001F3F]">
                  {item.title}
                </h3>
                <p className="mt-3 font-open text-[15px] leading-[1.7] text-[#555555]">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand
        title="Find the programme that fits you"
        description="Training is free at the point of access. Business support, mentoring and speaking opportunities are open to applications throughout the year."
      >
        <ModalButton modal="cyber" variant="gold" size="lg" withArrow>
          Free cyber security training
        </ModalButton>
        <ModalButton modal="business" variant="outlineLight" size="lg">
          Get business support
        </ModalButton>
        <ActionLink href="/impact" variant="outlineLight" size="lg">
          See our impact
        </ActionLink>
      </CtaBand>
    </>
  );
}
