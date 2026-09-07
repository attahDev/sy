import type { Metadata } from "next";
import Image from "next/image";
import {
  Compass,
  Eye,
  GraduationCap,
  HeartHandshake,
  Info,
  Laptop,
  MapPin,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

import PageHero from "../../components/site/PageHero";
import CtaBand from "../../components/site/CtaBand";
import Reveal from "../../components/site/Reveal";
import { Section, SectionHeader, Rule } from "../../components/site/Section";
import { FeatureCard, NoteCallout } from "../../components/site/Cards";
import { ActionLink, ModalButton } from "../../components/site/Buttons";
import { boroughs } from "../../content/sybte";

export const metadata: Metadata = {
  title: "About",
  description:
    "South Yorkshire Black Tech Expo is a regional innovation and community platform widening access to technology, digital skills, entrepreneurship and opportunity across Sheffield, Barnsley, Doncaster and Rotherham.",
};

const focusCards = [
  {
    icon: Laptop,
    title: "Digital Skills & Confidence",
    description:
      "Practical, applied training that helps people use technology with confidence — from first steps to specialist capability.",
    accent: "navy" as const,
  },
  {
    icon: Sparkles,
    title: "AI & Emerging Technology",
    description:
      "Demystifying artificial intelligence and emerging tools so communities and businesses can adopt them responsibly.",
    accent: "gold" as const,
  },
  {
    icon: ShieldCheck,
    title: "Cyber Security & Digital Trust",
    description:
      "Building the security, data protection and compliance knowledge that individuals and small organisations need.",
    accent: "red" as const,
  },
  {
    icon: Rocket,
    title: "Entrepreneurship & Business Growth",
    description:
      "Supporting founders to start, stabilise and scale — with tools, mentoring and routes to funding readiness.",
    accent: "orange" as const,
  },
  {
    icon: Compass,
    title: "Leadership & Professional Development",
    description:
      "Helping professionals step into leadership, influence decisions and progress in their careers.",
    accent: "navy" as const,
  },
  {
    icon: Users,
    title: "Mentoring & Access to Networks",
    description:
      "Connecting people to the mentors, peers and organisations that open doors — because networks are opportunity.",
    accent: "gold" as const,
  },
  {
    icon: GraduationCap,
    title: "Student & Youth Opportunity",
    description:
      "Working with universities and colleges to turn study into real pathways into the digital economy.",
    accent: "red" as const,
  },
  {
    icon: HeartHandshake,
    title: "Community-Led Innovation & Inclusion",
    description:
      "Innovation shaped with communities rather than delivered to them, keeping inclusion at the centre.",
    accent: "orange" as const,
  },
];

const audiences = [
  { label: "Students", className: "bg-[#0D1B3E]" },
  { label: "Founders", className: "bg-[#D7263D]" },
  { label: "Professionals", className: "bg-[#E17100]" },
  { label: "Educators", className: "bg-[#F5A623]" },
  { label: "Business Leaders", className: "bg-[#1A2F5E]" },
  { label: "Communities", className: "bg-[#16295A]" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumb="About"
        eyebrow="About SYBTE"
        title="Widening access to"
        accent="the digital economy"
        lead="South Yorkshire Black Tech Expo (SYBTE) is a regional innovation and community platform focused on widening access to technology, digital skills, entrepreneurship and opportunity across South Yorkshire."
        image="/Hero/herosection.jpg"
        imageAlt="South Yorkshire Black Tech Expo community event"
        stats={[
          { value: "4", label: "Boroughs served across South Yorkshire" },
          { value: "£3.7bn", label: "South Yorkshire tech ecosystem, reported by TECH SY" },
          { value: "8", label: "Core focus areas across our programmes" },
          { value: "101", label: "Candidates registered on our programmes" },
        ]}
        footnote="Ecosystem value attributed to TECH SY (July 2026 data). Regional growth cluster context: South Yorkshire Mayoral Combined Authority. Programme figures from the latest published SYBTE update."
      >
        <ModalButton modal="join" variant="gold" size="lg" withArrow>
          Join the community
        </ModalButton>
        <ActionLink href="/programmes" variant="outlineLight" size="lg">
          See our programmes
        </ActionLink>
      </PageHero>

      {/* Who we are */}
      <Section tone="white">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-start xl:gap-[86px]">
          <div>
            <SectionHeader
              eyebrow="Who we are"
              title={
                <>
                  <span className="block">A movement,</span>
                  <span className="block">not just an event</span>
                </>
              }
              display
            />

            <Reveal delay={120}>
              <div className="mt-9 space-y-7 font-open text-[17px] leading-[1.8] text-[#555555] md:text-[19px]">
                <p>
                  We connect people, ideas, businesses, education and community
                  networks to create more inclusive pathways into the digital
                  economy. Our work brings together students, founders,
                  professionals, business leaders, educators and communities
                  through practical training, events, mentoring, business
                  support, partnerships and access to digital resources.
                </p>
                <p>
                  We champion global majority excellence in technology while
                  building an ecosystem in which underrepresented talent can
                  connect, develop, innovate and lead.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200} className="mt-10">
              <ActionLink href="/impact" variant="outlineDark" withArrow>
                See the impact so far
              </ActionLink>
            </Reveal>
          </div>

          <Reveal delay={160} className="lg:pt-4">
            <div className="relative overflow-hidden rounded-[26px]">
              <Image
                src="/involved/iv3.jpg"
                alt="SYBTE participants at a regional training session"
                width={900}
                height={620}
                className="h-[300px] w-full object-cover sm:h-[380px] lg:h-[420px]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[#0A1328]/70 via-transparent to-transparent"
              />
            </div>

            <div className="mt-6 rounded-[26px] border border-[#DADDE2] bg-[#FAF8F3] p-8">
              <Rule />
              <p className="mt-6 font-open text-[16px] leading-[1.75] text-[#444444]">
                SYBTE is a regional gateway into the wider Black Tech Expo
                platform — connecting talent, enterprise and opportunity across
                technology, innovation, business and community impact.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Mission & vision */}
      <Section tone="navy">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {[
            {
              icon: Target,
              label: "Our Mission",
              body: "To unlock the potential of global majority and underrepresented tech talent by creating equitable pathways to skills, networks, entrepreneurship, innovation and sustainable growth across South Yorkshire.",
            },
            {
              icon: Eye,
              label: "Our Vision",
              body: "A connected, inclusive and future-ready South Yorkshire where diverse talent can participate fully in technology, innovation and economic growth.",
            },
          ].map((item, index) => (
            <Reveal
              as="article"
              key={item.label}
              delay={index * 120}
              className="relative flex flex-col overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.045] p-9 backdrop-blur-[2px] sm:p-11"
            >
              <span
                aria-hidden
                className="absolute right-0 top-0 h-[220px] w-[220px] translate-x-1/3 -translate-y-1/3 rounded-full bg-[#F5A623] opacity-[0.11] blur-[80px]"
              />

              <span className="inline-flex h-[58px] w-[58px] items-center justify-center rounded-[18px] bg-[#FFD7001F] text-[#FFD700]">
                <item.icon className="h-[26px] w-[26px]" aria-hidden />
              </span>

              <p className="mt-8 font-open text-[12px] font-semibold uppercase leading-none tracking-[0.3em] text-[#FFD700]">
                {item.label}
              </p>

              <p className="mt-6 text-[21px] font-medium leading-[1.5] tracking-[-0.015em] text-white sm:text-[24px] lg:text-[26px]">
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Focus areas */}
      <Section id="focus" tone="cream">
        <div aria-hidden className="grid-overlay-light absolute inset-0 opacity-60" />

        <div className="relative">
          <SectionHeader
            eyebrow="Our focus"
            title="Eight areas that shape everything we deliver"
            intro="Every programme, event and partnership we take on maps back to at least one of these focus areas. Together they describe how we move people from interest to capability to opportunity."
            align="center"
            tone="cream"
          />

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:mt-16">
            {focusCards.map((card, index) => (
              <FeatureCard
                key={card.title}
                icon={card.icon}
                title={card.title}
                description={card.description}
                accent={card.accent}
                delay={Math.min(index * 70, 420)}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* Who we serve */}
      <Section tone="white" compact>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <SectionHeader
            eyebrow="Who we serve"
            title="Built for the whole ecosystem"
            intro="SYBTE is deliberately broad. Progress happens when students, founders, professionals, educators, employers and community organisations are in the same room."
          />

          <Reveal delay={140} className="flex flex-wrap gap-3 font-dm sm:gap-4">
            {audiences.map((item) => (
              <span
                key={item.label}
                className={`${item.className} flex h-[54px] items-center justify-center rounded-[18px] px-6 font-open text-[15px] font-medium text-white transition-transform duration-300 hover:-translate-y-1 sm:h-[62px] sm:px-8 sm:text-[17px] md:h-[66px] md:px-9 md:text-[18px]`}
              >
                {item.label}
              </span>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* Why South Yorkshire */}
      <Section id="why-south-yorkshire" tone="cream">
        <SectionHeader
          eyebrow="Why South Yorkshire"
          title="A growing ecosystem that has to include everyone"
          intro="South Yorkshire includes Sheffield, Barnsley, Doncaster and Rotherham, and it has a growing technology and innovation ecosystem. SYBTE's role is to complement that growth by ensuring that inclusion, access, representation and community participation are part of the region's technology story."
          tone="cream"
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {boroughs.map((borough, index) => (
            <Reveal
              as="article"
              key={borough.name}
              delay={index * 90}
              className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-[#DADDE2] bg-white p-7 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-38px_rgba(13,27,62,0.42)] sm:p-8"
            >
              <span className="inline-flex h-[46px] w-[46px] items-center justify-center rounded-[14px] bg-[#0D1B3E0F] text-[#0D1B3E] transition-colors duration-300 group-hover:bg-[#D7263D] group-hover:text-white">
                <MapPin className="h-[20px] w-[20px]" aria-hidden />
              </span>

              <h3 className="mt-6 text-[22px] font-semibold leading-tight tracking-[-0.02em] text-[#001F3F]">
                {borough.name}
              </h3>

              <p className="mt-4 font-open text-[15px] leading-[1.7] text-[#555555]">
                {borough.description}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal className="flex flex-col justify-center rounded-[26px] bg-[#0D1B3E] p-9 sm:p-11">
            <p className="font-open text-[12px] font-semibold uppercase leading-none tracking-[0.3em] text-[#FFD700]">
              Regional context
            </p>
            <p className="mt-7 text-[46px] font-semibold leading-none tracking-[-0.03em] text-white sm:text-[58px]">
              £3.7bn
            </p>
            <p className="mt-5 font-open text-[16px] leading-[1.7] text-[#FFFFFFB3]">
              The scale of the South Yorkshire tech ecosystem as reported by
              TECH SY (July 2026 data). The South Yorkshire Mayoral Combined
              Authority also identifies digital and tech as an important
              regional growth cluster.
            </p>
          </Reveal>

          <NoteCallout title="How we use external data" icon={Info}>
            <p>
              Regional figures above belong to their original sources and are
              attributed accordingly. They describe the environment SYBTE works
              in — they are not SYBTE-owned data.
            </p>
            <p>
              Our own programme metrics are published separately and
              date-stamped on the{" "}
              <a
                href="/impact"
                className="font-semibold text-[#D7263D] underline decoration-[#D7263D]/30 underline-offset-4 transition-colors hover:text-[#0D1B3E]"
              >
                Community Impact
              </a>{" "}
              page.
            </p>
          </NoteCallout>
        </div>
      </Section>

      <CtaBand
        title="Be part of the region's technology story"
        description="Whether you are starting out, building a business, hiring talent or leading an organisation, there is a way into SYBTE."
      >
        <ModalButton modal="join" variant="gold" size="lg" withArrow>
          Join the community
        </ModalButton>
        <ActionLink href="/partners" variant="outlineLight" size="lg">
          Partner with us
        </ActionLink>
        <ActionLink href="/team" variant="outlineLight" size="lg">
          Meet the team
        </ActionLink>
      </CtaBand>
    </>
  );
}
