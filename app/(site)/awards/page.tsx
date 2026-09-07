import type { Metadata } from "next";
import Image from "next/image";
import {
  Award,
  GraduationCap,
  HeartPulse,
  Info,
  Lightbulb,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";

import PageHero from "../../components/site/PageHero";
import CtaBand from "../../components/site/CtaBand";
import Reveal from "../../components/site/Reveal";
import { Section, SectionHeader, Rule } from "../../components/site/Section";
import { Chip, NoteCallout } from "../../components/site/Cards";
import { ActionLink, ModalButton } from "../../components/site/Buttons";

export const metadata: Metadata = {
  title: "Awards",
  description:
    "The South Yorkshire Black Tech Expo Awards recognise community change makers, leaders, young talent, innovators and those improving health and wellbeing across the region.",
};

const categories = [
  {
    icon: Users,
    title: "Community Impact",
    description:
      "For people whose work has visibly changed outcomes for a neighbourhood, group or community across South Yorkshire.",
  },
  {
    icon: Award,
    title: "Leadership",
    description:
      "For those who lead by example — opening doors, building teams and creating opportunity for others to follow.",
  },
  {
    icon: GraduationCap,
    title: "Youth",
    description:
      "For young people and emerging talent already making a mark in technology, enterprise or community work.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "For original thinking and practical invention that solves a real problem for real people.",
  },
  {
    icon: HeartPulse,
    title: "Health & Wellbeing",
    description:
      "For work that improves health, wellbeing, access or equity — including digital health innovation.",
  },
];

const nominationSteps = [
  {
    step: "01",
    title: "Submit a nomination",
    body: "Tell us who you are nominating, the category, the reason and their key achievements. Supporting links help.",
  },
  {
    step: "02",
    title: "Review and verification",
    body: "Nominations are reviewed against the category criteria and details are verified with the nominee.",
  },
  {
    step: "03",
    title: "Recognition",
    body: "Shortlisted change makers are recognised at the awards and featured across Spotlight and the Hall of Fame.",
  },
];

export default function AwardsPage() {
  return (
    <>
      <PageHero
        breadcrumb="Awards"
        eyebrow="SYBTE Awards"
        title="Recognising the region's"
        accent="change makers"
        lead="The South Yorkshire Black Tech Expo Awards exist to make excellence visible — celebrating the founders, leaders, young talent, innovators and community organisers who move the region forward."
        image="/award/awd5.jpg"
        imageAlt="Audience applauding at a South Yorkshire Black Tech Expo event"
        stats={[
          { value: "5", label: "Nomination categories" },
          { value: "4", label: "Boroughs eligible across South Yorkshire" },
          { value: "Open", label: "Nominations accepted year-round" },
          { value: "Free", label: "To nominate someone" },
        ]}
        footnote="The final award name, categories, eligibility, dates and nomination process are confirmed before publication."
      >
        <ModalButton modal="nominate" variant="gold" size="lg" withArrow>
          Nominate a change maker
        </ModalButton>
        <ModalButton modal="join" variant="outlineLight" size="lg">
          Attend the awards
        </ModalButton>
      </PageHero>

      {/* Why the awards matter */}
      <Section tone="white">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center xl:gap-[80px]">
          <div>
            <SectionHeader
              eyebrow="Why it matters"
              title={
                <>
                  <span className="block">Recognition</span>
                  <span className="block">opens doors</span>
                </>
              }
              display
              intro="Being seen changes what becomes possible. Recognition brings introductions, invitations, credibility and confidence — and it shows the next generation what is achievable in their own region."
            />

            <Reveal delay={170} className="mt-10 flex flex-wrap gap-4">
              <ModalButton modal="nominate" variant="red" withArrow>
                Nominate someone
              </ModalButton>
              <ActionLink href="/spotlight" variant="outlineDark">
                Read spotlight stories
              </ActionLink>
            </Reveal>
          </div>

          {/* Approved awards campaign artwork alongside event photography */}
          <Reveal delay={140} className="grid grid-cols-1 gap-4 sm:grid-cols-[1.1fr_0.9fr]">
            <div className="relative aspect-[2/3] overflow-hidden rounded-[22px] bg-[#0A1328] shadow-[0_34px_70px_-40px_rgba(13,27,62,0.55)]">
              <Image
                src="/award/awd3.jpg"
                alt="South Yorkshire & Humber Black Tech Expo Awards campaign artwork"
                fill
                sizes="(max-width: 640px) 100vw, 30vw"
                className="object-cover"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-1">
              {[
                { src: "/award/awd4.jpg", alt: "Guests connecting at a SYBTE event" },
                { src: "/award/awd5.jpg", alt: "Audience applauding award recipients" },
              ].map((photo) => (
                <div
                  key={photo.src}
                  className="relative aspect-square overflow-hidden rounded-[22px] sm:aspect-[4/3]"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, 24vw"
                    className="object-cover transition duration-500 hover:scale-[1.04]"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Categories */}
      <Section tone="navy">
        <SectionHeader
          eyebrow="Categories"
          title="Five ways to be recognised"
          intro="Nominate someone in the category that best fits their contribution. If you are unsure, submit the nomination anyway and tell us why their work matters."
          tone="navy"
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:mt-16">
          {categories.map((category, index) => (
            <Reveal
              as="article"
              key={category.title}
              delay={index * 90}
              className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.045] p-8 transition duration-300 hover:-translate-y-1.5 hover:border-[#FFD70059] hover:bg-white/[0.08]"
            >
              <span
                aria-hidden
                className="absolute right-0 top-0 h-[180px] w-[180px] translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F5A623] opacity-0 blur-[70px] transition-opacity duration-500 group-hover:opacity-[0.18]"
              />

              <div className="relative">
                <span className="inline-flex h-[54px] w-[54px] items-center justify-center rounded-[16px] bg-[#FFD7001F] text-[#FFD700] transition-transform duration-300 group-hover:scale-105">
                  <category.icon className="h-[24px] w-[24px]" aria-hidden />
                </span>

                <h3 className="mt-7 text-[20px] font-semibold leading-[1.28] tracking-[-0.02em] text-white">
                  {category.title}
                </h3>

                <p className="mt-4 font-open text-[15px] leading-[1.7] text-[#FFFFFFA6]">
                  {category.description}
                </p>
              </div>
            </Reveal>
          ))}

          <Reveal
            delay={450}
            className="flex h-full flex-col justify-between overflow-hidden rounded-[22px] bg-[#FFD700] p-8"
          >
            <div>
              <span className="inline-flex h-[54px] w-[54px] items-center justify-center rounded-[16px] bg-[#0D1B3E] text-[#FFD700]">
                <Trophy className="h-[24px] w-[24px]" aria-hidden />
              </span>
              <h3 className="mt-7 text-[20px] font-semibold leading-[1.28] tracking-[-0.02em] text-[#0D1B3E]">
                Know the right person?
              </h3>
              <p className="mt-4 font-open text-[15px] leading-[1.7] text-[#0D1B3EC4]">
                Nominations take a few minutes and can change the trajectory of
                someone&apos;s work.
              </p>
            </div>

            <div className="mt-8">
              <ModalButton modal="nominate" variant="navy" size="sm" withArrow>
                Start a nomination
              </ModalButton>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* How nominations work */}
      <Section tone="cream">
        <SectionHeader
          eyebrow="How it works"
          title="From nomination to recognition"
          intro="Nominations stay open throughout the year and feed into both the awards and our Spotlight features."
          align="center"
          tone="cream"
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {nominationSteps.map((item, index) => (
            <Reveal
              key={item.step}
              delay={index * 100}
              className="relative overflow-hidden rounded-[22px] border border-[#DADDE2] bg-white p-8 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-38px_rgba(13,27,62,0.42)]"
            >
              <span className="font-beb text-[46px] leading-none tracking-[0.04em] text-[#0D1B3E1F]">
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

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="rounded-[26px] bg-[#0D1B3E] p-9 sm:p-11">
            <div className="flex flex-wrap items-center gap-3">
              <Chip variant="gold">
                <Sparkles className="h-[12px] w-[12px]" aria-hidden />
                What nominees receive
              </Chip>
            </div>

            <Rule className="mt-8" />

            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                "Recognition at the awards",
                "A published Spotlight feature",
                "A place in the Hall of Fame",
                "Introductions across the SYBTE network",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 font-open text-[15px] leading-[1.6] text-[#FFFFFFC4]"
                >
                  <span
                    aria-hidden
                    className="mt-[7px] h-[7px] w-[7px] shrink-0 rounded-full bg-[#FFD700]"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <NoteCallout title="Awaiting final confirmation" icon={Info}>
            <p>
              The final award title, categories, eligibility criteria, dates and
              nomination rules are confirmed internally before publication, and
              approved awards campaign artwork is used for all promotion.
            </p>
          </NoteCallout>
        </div>
      </Section>

      <CtaBand
        title="Nominate or attend the awards"
        description="Recognition is one of the simplest ways to grow an ecosystem. Put someone forward, or join us to celebrate the people already changing the region."
      >
        <ModalButton modal="nominate" variant="gold" size="lg" withArrow>
          Nominate a change maker
        </ModalButton>
        <ModalButton modal="join" variant="outlineLight" size="lg">
          Attend the awards
        </ModalButton>
        <ActionLink href="/spotlight" variant="outlineLight" size="lg">
          Read the stories
        </ActionLink>
      </CtaBand>
    </>
  );
}
