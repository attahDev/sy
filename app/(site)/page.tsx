import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  HeartPulse,
  Route,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";

import AwardsSection from "../components/AwardSection";
import EventProgrammeSection from "../components/EventProgram";
import GetInvolvedSection from "../components/GetInvolvedSection";
import HeroSection from "../components/HeroSection";
import WhoWeAreSection from "../components/Whoarewe";
import Reveal from "../components/site/Reveal";
import { Section, SectionHeader } from "../components/site/Section";
import { StatCard } from "../components/site/Cards";
import { ActionLink } from "../components/site/Buttons";
import { impactDataDate, impactStats } from "../content/sybte";

const explore = [
  {
    href: "/about",
    icon: Users,
    title: "About SYBTE",
    description:
      "Our mission, vision, focus areas and why South Yorkshire is where we build.",
  },
  {
    href: "/programmes",
    icon: Route,
    title: "Programmes & Roadmap",
    description:
      "Current delivery in cyber, AI, leadership and enterprise, plus our 2026–2028 direction.",
  },
  {
    href: "/events",
    icon: CalendarDays,
    title: "Events & Training",
    description:
      "The expo programme, free training, masterclasses and university collaborations.",
  },
  {
    href: "/impact",
    icon: Trophy,
    title: "Community Impact",
    description:
      "Verified programme figures, outcomes and the measures we track across the region.",
  },
  {
    href: "/digital-health",
    icon: HeartPulse,
    title: "Digital Health & Innovation",
    description:
      "Community-centred health technology, research and health equity work.",
  },
  {
    href: "/platform",
    icon: Sparkles,
    title: "Digital Platform",
    description:
      "Digital Academy, AI Business Studio, Mentor AI and the resources behind our programmes.",
  },
  {
    href: "/spotlight",
    icon: Users,
    title: "Spotlight",
    description:
      "Founders, students, leaders, speakers, volunteers and alumni stories.",
  },
  {
    href: "/partners",
    icon: Building2,
    title: "Partners",
    description:
      "Delivery partners, universities, community organisations and how to work with us.",
  },
];

export default function Home() {
  return (
    <>
      <HeroSection />

      <section id="about">
        <WhoWeAreSection />
      </section>

      {/* Impact highlights */}
      <Section tone="cream">
        <div aria-hidden className="grid-overlay-light absolute inset-0 opacity-60" />

        <div className="relative">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <SectionHeader
              eyebrow="Impact highlights"
              title="Progress you can count"
              intro="These are the latest publicly reported figures from our Capacity Building Programme, date-stamped so they can be updated without creating conflicting totals."
              tone="cream"
            />

            <Reveal delay={140} className="flex flex-wrap gap-4 lg:justify-end">
              <ActionLink href="/impact" variant="outlineDark" withArrow>
                See the full impact page
              </ActionLink>
            </Reveal>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((stat, index) => (
              <StatCard
                key={stat.label}
                value={stat.value}
                label={stat.label}
                note={stat.note}
                delay={index * 90}
              />
            ))}
          </div>

          <Reveal delay={300}>
            <p className="mt-8 font-open text-[13px] leading-[1.6] text-[#8A8A8A]">
              {impactDataDate}. Regional ecosystem context (£3.7bn, July 2026)
              is attributed to TECH SY and is not SYBTE-owned data.
            </p>
          </Reveal>
        </div>
      </Section>

      <section id="programme">
        <EventProgrammeSection />
      </section>

      {/* Explore the platform */}
      <Section tone="white">
        <SectionHeader
          eyebrow="Explore"
          title="Everything SYBTE does, in one place"
          intro="From programmes and partnerships to impact and digital resources — here is the full picture of the regional platform."
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:mt-16">
          {explore.map((item, index) => (
            <Reveal key={item.href} delay={Math.min(index * 70, 420)} className="h-full">
              <Link
                href={item.href}
                className="group flex h-full flex-col rounded-[22px] border border-[#DADDE2] bg-white p-7 transition duration-300 hover:-translate-y-1.5 hover:border-[#0D1B3E26] hover:shadow-[0_28px_60px_-38px_rgba(13,27,62,0.42)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex h-[50px] w-[50px] items-center justify-center rounded-[15px] bg-[#0D1B3E0F] text-[#0D1B3E] transition-colors duration-300 group-hover:bg-[#D7263D] group-hover:text-white">
                    <item.icon className="h-[22px] w-[22px]" aria-hidden />
                  </span>

                  <ArrowRight
                    className="h-[17px] w-[17px] text-[#C9C6BE] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#D7263D]"
                    aria-hidden
                  />
                </div>

                <h3 className="mt-7 text-[18px] font-semibold leading-[1.3] tracking-[-0.02em] text-[#001F3F]">
                  {item.title}
                </h3>

                <p className="mt-3.5 font-open text-[14.5px] leading-[1.65] text-[#555555]">
                  {item.description}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={480} className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <ActionLink href="/get-involved" variant="navy" size="lg" withArrow>
            Get involved
          </ActionLink>
          <ActionLink href="/get-involved#contact" variant="outlineDark" size="lg">
            Contact the team
          </ActionLink>
        </Reveal>
      </Section>

      <section id="get-involved">
        <GetInvolvedSection />
      </section>

      <section id="awards">
        <AwardsSection />
      </section>
    </>
  );
}
