import type { Metadata } from "next";
import Image from "next/image";
import {
  Accessibility,
  Activity,
  HeartPulse,
  Lightbulb,
  Microscope,
  Network,
  Rocket,
  Sparkles,
  Users,
} from "lucide-react";

import PageHero from "../../components/site/PageHero";
import CtaBand from "../../components/site/CtaBand";
import Reveal from "../../components/site/Reveal";
import { Section, SectionHeader, Rule } from "../../components/site/Section";
import {
  CheckList,
  FeatureCard,
  Monogram,
} from "../../components/site/Cards";
import { ActionLink, ModalButton } from "../../components/site/Buttons";
import { contactDetails, team } from "../../content/sybte";

export const metadata: Metadata = {
  title: "Digital Health & Innovation",
  description:
    "SYBTE's Digital Health & Innovation strand brings communities, health professionals, researchers, innovators and technologists together to develop digital health solutions with people rather than simply for them.",
};

const lead = team.find((member) => member.name === "Dr Patience Amos");

const focusAreas = [
  {
    icon: HeartPulse,
    title: "Digital Health Innovation",
    description:
      "Emerging health technologies and the practical innovation that improves care, access and everyday wellbeing.",
    accent: "red" as const,
  },
  {
    icon: Accessibility,
    title: "Health Equity & Digital Inclusion",
    description:
      "Reducing digital exclusion so that new health technology narrows gaps rather than widening them.",
    accent: "navy" as const,
  },
  {
    icon: Users,
    title: "Community-Led Co-Design",
    description:
      "Solutions designed with communities, drawing directly on lived experience of health challenges.",
    accent: "gold" as const,
  },
  {
    icon: Sparkles,
    title: "Responsible AI in Health",
    description:
      "Artificial intelligence applied to health with care — transparent, accountable and safety-conscious.",
    accent: "orange" as const,
  },
  {
    icon: Network,
    title: "Connecting the Ecosystem",
    description:
      "Bringing healthcare, research, technology and community expertise into the same conversation.",
    accent: "navy" as const,
  },
  {
    icon: Rocket,
    title: "Supporting Health Founders",
    description:
      "Backing innovators and founders developing health-focused solutions with mentoring and business support.",
    accent: "red" as const,
  },
  {
    icon: Lightbulb,
    title: "Digital Confidence in Communities",
    description:
      "Improving digital confidence, access and understanding so people can use health technology well.",
    accent: "gold" as const,
  },
  {
    icon: Microscope,
    title: "Learning & Knowledge Exchange",
    description:
      "Creating opportunities for collaboration, learning, research and knowledge exchange across sectors.",
    accent: "orange" as const,
  },
];

const developing = [
  "Digital health talks, panels and community conversations.",
  "Innovation workshops and collaborative problem-solving sessions.",
  "Opportunities to showcase digital health founders, researchers and emerging solutions.",
  "Connections between communities, academia, health services and the technology sector.",
  "Digital health and health-equity content for the SYBTE platform.",
  "A growing network of people interested in shaping inclusive digital health innovation across South Yorkshire.",
];

export default function DigitalHealthPage() {
  return (
    <>
      <PageHero
        breadcrumb="Digital Health & Innovation"
        eyebrow="Digital Health & Innovation"
        title="Built with people,"
        accent="not just for them"
        lead="SYBTE recognises digital health as an important area where technology, research, innovation and community experience can come together to improve lives."
        image="/involved/iv4.jpg"
        imageAlt="Community conversation about digital health innovation"
        stats={[
          { value: "8", label: "Areas of focus across the strand" },
          { value: "4", label: "Sectors we bring together" },
          { value: "1", label: "Dedicated voluntary innovation lead" },
          { value: "2026", label: "Strand established" },
        ]}
        footnote="This page describes the intended direction of the Digital Health & Innovation strand. Specific projects, partnerships, research activity and impact figures are added once formally confirmed."
      >
        <ActionLink href="#collaborate" variant="gold" size="lg" withArrow>
          Collaborate with us
        </ActionLink>
        <ModalButton modal="join" variant="outlineLight" size="lg">
          Join the network
        </ModalButton>
      </PageHero>

      {/* Purpose */}
      <Section tone="white">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.06fr_0.94fr] lg:items-center xl:gap-[80px]">
          <div>
            <SectionHeader
              eyebrow="Our purpose"
              title={
                <>
                  <span className="block">Inclusive,</span>
                  <span className="block">community-centred</span>
                  <span className="block">innovation</span>
                </>
              }
              display
            />

            <Reveal delay={130}>
              <div className="mt-9 space-y-7 font-open text-[17px] leading-[1.8] text-[#555555] md:text-[19px]">
                <p>
                  Our Digital Health &amp; Innovation work creates space for
                  communities, health professionals, researchers, innovators,
                  founders and technology specialists to explore how digital
                  solutions can be developed with people, rather than simply for
                  them.
                </p>
                <p>
                  We want to help connect the people who understand health
                  challenges with the people who can research, design, build and
                  scale technology solutions — while keeping health equity,
                  accessibility and lived experience at the centre.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200} className="mt-10 flex flex-wrap gap-4">
              <ActionLink href="#collaborate" variant="outlineDark" withArrow>
                Work with the strand
              </ActionLink>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <div className="relative overflow-hidden rounded-[26px]">
              <Image
                src="/involved/iv1.jpg"
                alt="Community members discussing health technology"
                width={900}
                height={640}
                className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[470px]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[#0A1328]/85 via-[#0A1328]/15 to-transparent"
              />
              <div className="absolute bottom-0 left-0 p-8">
                <span className="inline-flex h-[48px] w-[48px] items-center justify-center rounded-[15px] bg-[#FFD700] text-[#0D1B3E]">
                  <Activity className="h-[22px] w-[22px]" aria-hidden />
                </span>
                <p className="mt-5 max-w-[360px] text-[19px] font-medium leading-[1.42] tracking-[-0.015em] text-white sm:text-[21px]">
                  Health equity, accessibility and lived experience at the
                  centre of every conversation.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Key areas of focus */}
      <Section tone="cream">
        <div aria-hidden className="grid-overlay-light absolute inset-0 opacity-60" />

        <div className="relative">
          <SectionHeader
            eyebrow="Key areas of focus"
            title="Where technology and health meet"
            intro="Eight areas shape how this strand develops — spanning innovation, equity, co-design, responsible AI, ecosystem building, founder support, digital confidence and knowledge exchange."
            align="center"
            tone="cream"
          />

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:mt-16">
            {focusAreas.map((area, index) => (
              <FeatureCard
                key={area.title}
                icon={area.icon}
                title={area.title}
                description={area.description}
                accent={area.accent}
                delay={Math.min(index * 70, 420)}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* Community-centred innovation + ecosystem */}
      <Section tone="navy">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {[
            {
              label: "Community-centred innovation",
              heading: "Innovation that responds to real needs",
              body: "Technology can create new opportunities in health, but innovation is most meaningful when it responds to real needs. SYBTE encourages conversations with communities that may be underrepresented in technology, research and innovation — helping ensure lived experience informs the development of more relevant, accessible and inclusive digital health solutions.",
            },
            {
              label: "Connecting the ecosystem",
              heading: "Bringing four worlds into one room",
              body: "Through events, panel discussions, workshops, partnerships and specialist leadership, this strand brings together universities, health and care organisations, researchers, businesses, technology professionals, founders and community organisations — creating connections that can lead to learning, collaboration and practical innovation.",
            },
          ].map((block, index) => (
            <Reveal
              as="article"
              key={block.label}
              delay={index * 120}
              className="relative flex flex-col overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.045] p-9 sm:p-11"
            >
              <span
                aria-hidden
                className="absolute right-0 top-0 h-[240px] w-[240px] translate-x-1/3 -translate-y-1/3 rounded-full bg-[#D7263D] opacity-[0.16] blur-[90px]"
              />

              <div className="relative">
                <p className="font-open text-[12px] font-semibold uppercase leading-none tracking-[0.3em] text-[#FFD700]">
                  {block.label}
                </p>

                <h3 className="mt-7 text-[24px] font-semibold leading-[1.22] tracking-[-0.025em] text-white sm:text-[28px]">
                  {block.heading}
                </h3>

                <Rule className="mt-7" />

                <p className="mt-7 font-open text-[16px] leading-[1.8] text-[#FFFFFFB3] sm:text-[17px]">
                  {block.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Innovation lead */}
      {lead && (
        <Section tone="white" compact>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <SectionHeader
              eyebrow="Strand leadership"
              title="Digital Health Innovation Lead"
              intro="The role supports the development of SYBTE's digital health direction, with a focus on innovation, research, community engagement and health equity."
            />

            <Reveal delay={140}>
              <article className="flex flex-col gap-7 rounded-[26px] border border-[#DADDE2] bg-[#FAF8F3] p-8 sm:flex-row sm:items-start sm:p-10">
                <Monogram name={lead.name} size="md" />

                <div>
                  <h3 className="text-[23px] font-semibold leading-tight tracking-[-0.025em] text-[#001F3F] sm:text-[26px]">
                    {lead.name}
                  </h3>
                  <p className="mt-3 font-open text-[15px] font-semibold text-[#D7263D] sm:text-[16px]">
                    {lead.role}
                  </p>
                  <p className="mt-6 font-open text-[15.5px] leading-[1.75] text-[#555555] sm:text-[16px]">
                    {lead.bio}
                  </p>

                  <div className="mt-8">
                    <ActionLink href="/team" variant="outlineDark" size="sm" withArrow>
                      Meet the wider team
                    </ActionLink>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </Section>
      )}

      {/* What we want to develop */}
      <Section id="collaborate" tone="cream">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:items-start xl:gap-[80px]">
          <div>
            <SectionHeader
              eyebrow="What we want to develop"
              title="The next steps for this strand"
              intro="These are the activities we are actively building towards. If any of them match what your organisation, research group or community does, we would like to hear from you."
              tone="cream"
            />

            <Reveal delay={160} className="mt-10 flex flex-wrap gap-4">
              <ActionLink
                href={`mailto:${contactDetails.email}?subject=Digital%20Health%20%26%20Innovation%20%E2%80%94%20collaboration`}
                variant="gold"
                withArrow
              >
                Share your innovation
              </ActionLink>
              <ModalButton modal="business" variant="outlineDark">
                Get founder support
              </ModalButton>
            </Reveal>

          </div>

          <Reveal delay={130}>
            <div className="rounded-[26px] border border-[#DADDE2] bg-white p-8 sm:p-10">
              <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-[#001F3F]">
                In development
              </h3>
              <div className="mt-8">
                <CheckList items={developing} columns={1} />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        title="Help shape inclusive digital health"
        description="Whether you are a researcher, clinician, founder, technologist or community organiser, there is a place for you in this conversation."
      >
        <ModalButton modal="join" variant="gold" size="lg" withArrow>
          Join the digital health network
        </ModalButton>
        <ActionLink
          href={`mailto:${contactDetails.email}?subject=Digital%20Health%20research%20or%20community%20partnership`}
          variant="outlineLight"
          size="lg"
        >
          Become a research partner
        </ActionLink>
        <ActionLink href="/partners" variant="outlineLight" size="lg">
          Partner with SYBTE
        </ActionLink>
      </CtaBand>
    </>
  );
}
