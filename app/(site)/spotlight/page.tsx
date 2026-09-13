import type { Metadata } from "next";
import {
  Building2,
  GraduationCap,
  HeartHandshake,
  Mic,
  Rocket,
  ShieldCheck,
  Sparkles,
  UserPlus,
} from "lucide-react";

import PageHero from "../../components/site/PageHero";
import CtaBand from "../../components/site/CtaBand";
import Reveal from "../../components/site/Reveal";
import { Section, SectionHeader, Rule } from "../../components/site/Section";
import { Chip, FeatureCard, Monogram } from "../../components/site/Cards";
import { ActionLink, ModalButton } from "../../components/site/Buttons";

export const metadata: Metadata = {
  title: "Spotlight",
  description:
    "Founders, students, professionals, community leaders, speakers, volunteers and programme alumni — the people behind South Yorkshire Black Tech Expo and the stories of their progress.",
};

const spotlightTypes = [
  {
    icon: Rocket,
    title: "Founder & Entrepreneur",
    description:
      "The business, the challenge they faced, the support they received and the next milestone they are working towards.",
    accent: "red" as const,
  },
  {
    icon: GraduationCap,
    title: "Student & Emerging Talent",
    description:
      "The learning journey, the skills gained through SYBTE programmes and where they want their career to go.",
    accent: "navy" as const,
  },
  {
    icon: HeartHandshake,
    title: "Community Leader",
    description:
      "Local impact, collaboration and the work that holds neighbourhoods and networks together.",
    accent: "gold" as const,
  },
  {
    icon: Building2,
    title: "Partner Organisation",
    description:
      "Why the organisation supports inclusive innovation, and what the collaboration has made possible.",
    accent: "orange" as const,
  },
  {
    icon: Mic,
    title: "Speaker & Mentor",
    description:
      "Expertise, contribution and the guidance they bring to participants across the region.",
    accent: "red" as const,
  },
  {
    icon: UserPlus,
    title: "Volunteer",
    description:
      "The role they play, the skills they contribute and why they give their time to SYBTE.",
    accent: "navy" as const,
  },
  {
    icon: Sparkles,
    title: "Programme Alumni",
    description:
      "What actually happened after a workshop or event — the jobs, businesses and confidence that followed.",
    accent: "gold" as const,
  },
];

const featureFormat = [
  { label: "Name", value: "Who they are" },
  { label: "Role", value: "What they do today" },
  { label: "Location", value: "Their borough or city" },
  { label: "Story", value: "The journey in their own words" },
  { label: "SYBTE connection", value: "Programme, event or partnership" },
  { label: "Key achievement", value: "The milestone worth celebrating" },
  { label: "Quote", value: "One line that captures it" },
  { label: "Call to connect", value: "How readers can reach them" },
];

export default function SpotlightPage() {
  return (
    <>
      <PageHero
        breadcrumb="Spotlight"
        eyebrow="Spotlight"
        title="The people behind"
        accent="the progress"
        lead="Impact is easier to understand through people than through percentages. Spotlight makes the SYBTE community visible — founders, students, professionals, community leaders, speakers, volunteers and alumni."
        image="/involved/iv2.jpg"
        imageAlt="Members of the SYBTE community"
        stats={[
          { value: "7", label: "Spotlight categories across the community" },
          { value: "4", label: "Boroughs represented across South Yorkshire" },
          { value: "100%", label: "Features published with consent" },
          { value: "3–6", label: "Verified stories in the first release" },
        ]}
        footnote="Every feature is consented, fact-checked and supported by a photograph where one is available."
      >
        <ActionLink href="#nominate-a-story" variant="gold" size="lg" withArrow>
          Share a story
        </ActionLink>
        <ModalButton modal="nominate" variant="outlineLight" size="lg">
          Nominate a change maker
        </ModalButton>
      </PageHero>

      {/* Categories */}
      <Section tone="white">
        <SectionHeader
          eyebrow="Who we feature"
          title="Seven ways into the spotlight"
          intro="We feature the full breadth of the ecosystem, because a region's technology story is not only told by founders — it is told by students, volunteers, mentors and community organisers too."
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:mt-16">
          {spotlightTypes.map((type, index) => (
            <FeatureCard
              key={type.title}
              icon={type.icon}
              title={type.title}
              description={type.description}
              accent={type.accent}
              delay={Math.min(index * 80, 420)}
            />
          ))}

          <Reveal
            delay={480}
            className="flex h-full flex-col justify-between rounded-[22px] bg-[#0D1B3E] p-7 sm:p-8"
          >
            <div>
              <span className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-[16px] bg-[#FFD7001F] text-[#FFD700]">
                <ShieldCheck className="h-[23px] w-[23px]" aria-hidden />
              </span>
              <h3 className="mt-7 text-[19px] font-semibold leading-[1.3] tracking-[-0.015em] text-white sm:text-[20px]">
                Your story
              </h3>
              <p className="mt-4 font-open text-[15px] leading-[1.7] text-[#FFFFFFA6] sm:text-[16px]">
                Been through a SYBTE programme, or know someone whose work
                deserves recognition? Tell us and we will get in touch.
              </p>
            </div>

            <div className="mt-8">
              <ActionLink
                href="#nominate-a-story"
                variant="gold"
                size="sm"
                withArrow
              >
                Put someone forward
              </ActionLink>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Feature format */}
      <Section tone="cream">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-start xl:gap-[80px]">
          <SectionHeader
            eyebrow="Feature format"
            title="How every spotlight is structured"
            intro="A consistent structure keeps features comparable, fair and quick to read — and it makes clear what we need from each contributor before publication."
            tone="cream"
          />

          {/* Annotated template card */}
          <Reveal delay={140}>
            <article className="overflow-hidden rounded-[26px] border border-[#DADDE2] bg-white shadow-[0_34px_70px_-46px_rgba(13,27,62,0.4)]">
              <div className="relative border-b border-[#E6E3DC] bg-[#0D1B3E] p-8">
                <div
                  aria-hidden
                  className="grid-overlay absolute inset-0 opacity-60"
                />
                <div className="relative flex items-center gap-5">
                  <Monogram name="Spotlight Feature" size="md" className="border border-white/15" />
                  <div>
                    <Chip variant="gold">Template</Chip>
                    <p className="mt-3 text-[20px] font-semibold leading-tight tracking-[-0.02em] text-white">
                      Name
                    </p>
                    <p className="mt-1.5 font-open text-[14px] text-[#FFFFFF99]">
                      Role · Location
                    </p>
                  </div>
                </div>
              </div>

              <dl className="divide-y divide-[#EFECE4]">
                {featureFormat.map((field) => (
                  <div
                    key={field.label}
                    className="flex flex-col gap-1 px-8 py-4 sm:flex-row sm:items-baseline sm:gap-6"
                  >
                    <dt className="font-open text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#D7263D] sm:w-[168px] sm:shrink-0">
                      {field.label}
                    </dt>
                    <dd className="font-open text-[15px] leading-[1.6] text-[#555555]">
                      {field.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="border-t border-[#E6E3DC] bg-[#FAF8F3] px-8 py-6">
                <Rule />
                <p className="mt-5 font-open text-[14px] leading-[1.65] text-[#6B6B6B]">
                  Photography is used where available. Where it is not, features
                  are published with a monogram so no story is delayed by a
                  missing headshot.
                </p>
              </div>
            </article>
          </Reveal>
        </div>
      </Section>

      {/* Stories in preparation */}
      <Section id="nominate-a-story" tone="navy">
        <div className="mx-auto max-w-[900px] text-center">
          <SectionHeader
            eyebrow="Stories in preparation"
            title="The first features are being verified now"
            intro="We are collecting the first three to six spotlight stories with full participant consent. Rather than publish unverified profiles, we would rather wait and get them right."
            tone="navy"
            align="center"
          />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {[
            {
              step: "01",
              title: "You tell us",
              body: "Send a nomination or your own story through the form — a few lines is enough to start.",
            },
            {
              step: "02",
              title: "We verify",
              body: "We fact-check the details, agree the wording and confirm consent and naming preferences.",
            },
            {
              step: "03",
              title: "We publish",
              body: "The feature goes live on Spotlight and is shared across the SYBTE community channels.",
            },
          ].map((item, index) => (
            <Reveal
              key={item.step}
              delay={index * 100}
              className="rounded-[22px] border border-white/10 bg-white/[0.045] p-8"
            >
              <span className="font-beb text-[40px] leading-none tracking-[0.04em] text-[#FFD70047]">
                {item.step}
              </span>
              <h3 className="mt-4 text-[19px] font-semibold tracking-[-0.02em] text-white">
                {item.title}
              </h3>
              <p className="mt-3 font-open text-[15px] leading-[1.7] text-[#FFFFFFA6]">
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal
          delay={220}
          className="mt-14 flex flex-wrap items-center justify-center gap-4"
        >
          <ModalButton modal="nominate" variant="gold" size="lg" withArrow>
            Nominate a change maker
          </ModalButton>
          <ModalButton modal="join" variant="outlineLight" size="lg">
            Share your own journey
          </ModalButton>
        </Reveal>
      </Section>

      <CtaBand
        title="Know someone whose work deserves recognition?"
        description="Nominations stay open all year and feed into both our Spotlight features and the South Yorkshire Black Tech Expo Awards."
      >
        <ModalButton modal="nominate" variant="gold" size="lg" withArrow>
          Nominate a change maker
        </ModalButton>
        <ActionLink href="/awards" variant="outlineLight" size="lg">
          About the awards
        </ActionLink>
      </CtaBand>
    </>
  );
}
