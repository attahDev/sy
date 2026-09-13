import type { Metadata } from "next";
import Image from "next/image";
import {
  BadgeCheck,
  CalendarDays,
  Info,
  MapPin,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import PageHero from "../../components/site/PageHero";
import CtaBand from "../../components/site/CtaBand";
import Reveal from "../../components/site/Reveal";
import { Section, SectionHeader } from "../../components/site/Section";
import { CheckList, Chip, StatCard } from "../../components/site/Cards";
import { ActionLink, ModalButton } from "../../components/site/Buttons";
import {
  boroughs,
  impactDataDate,
  impactMeasures,
  impactStats,
  publicSources,
} from "../../content/sybte";

export const metadata: Metadata = {
  title: "Community Impact",
  description:
    "Verified SYBTE programme metrics, outcomes and the measures we track — 101 registered candidates, 46 participants trained and five specialist programmes delivered across South Yorkshire.",
};

const trainingAreas = [
  {
    icon: ShieldCheck,
    label: "Cyber Security",
    detail: "Fundamentals, GDPR, data protection, risk and compliance.",
  },
  {
    icon: Sparkles,
    label: "Artificial Intelligence",
    detail: "Applied AI tooling and responsible adoption.",
  },
  {
    icon: Rocket,
    label: "Entrepreneurship",
    detail: "Starting, funding and growing a business.",
  },
  {
    icon: Users,
    label: "Business Leadership",
    detail: "Leadership capability and professional development.",
  },
];

export default function ImpactPage() {
  return (
    <>
      <PageHero
        breadcrumb="Community Impact"
        eyebrow="Community Impact"
        title="Measured in people,"
        accent="not just events"
        lead="We separate verified programme figures from ambition. Everything on this page comes from our latest published Capacity Building Programme update and is date-stamped so it can be updated without creating conflicting totals."
        image="/involved/iv1.jpg"
        imageAlt="SYBTE participants at a capacity building session"
        stats={impactStats.map(({ value, label }) => ({ value, label }))}
        footnote={`${impactDataDate}. Figures are refreshed from the programme dashboard rather than aggregated across older updates.`}
      >
        <ModalButton modal="join" variant="gold" size="lg" withArrow>
          Join the community
        </ModalButton>
        <ActionLink href="/spotlight" variant="outlineLight" size="lg">
          Read community stories
        </ActionLink>
      </PageHero>

      {/* Verified figures */}
      <Section tone="white">
        <SectionHeader
          eyebrow="Verified figures"
          title="The Capacity Building Programme so far"
          intro="These are the latest publicly reported figures for the SYBTE Capacity Building Programme. They cover registrations, training delivery and programme completion at the time of the update."
        >
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Chip variant="confirmed">
              <BadgeCheck className="h-[13px] w-[13px]" aria-hidden />
              Publicly reported
            </Chip>
            <Chip variant="pending">
              <CalendarDays className="h-[13px] w-[13px]" aria-hidden />
              {impactDataDate}
            </Chip>
          </div>
        </SectionHeader>

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
      </Section>

      {/* Training areas */}
      <Section tone="cream" compact>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <SectionHeader
            eyebrow="Where the training landed"
            title="Five specialist programmes across four areas"
            intro="Delivery has concentrated on the capabilities that open the most doors in the regional economy — security, AI, enterprise and leadership."
            tone="cream"
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {trainingAreas.map((area, index) => (
              <Reveal
                key={area.label}
                delay={index * 90}
                className="flex items-start gap-5 rounded-[22px] border border-[#DADDE2] bg-white p-6 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-38px_rgba(13,27,62,0.42)] sm:p-7"
              >
                <span className="inline-flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[15px] bg-[#0D1B3E0F] text-[#0D1B3E]">
                  <area.icon className="h-[21px] w-[21px]" aria-hidden />
                </span>

                <div>
                  <h3 className="text-[18px] font-semibold leading-tight tracking-[-0.015em] text-[#001F3F]">
                    {area.label}
                  </h3>
                  <p className="mt-2.5 font-open text-[14.5px] leading-[1.65] text-[#555555]">
                    {area.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Impact narrative */}
      <Section tone="navy">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center xl:gap-[80px]">
          <div>
            <SectionHeader
              eyebrow="Our impact narrative"
              title={
                <>
                  <span className="block">Routes from learning</span>
                  <span className="block text-[#FFD700]">to continued support</span>
                </>
              }
              tone="navy"
              display
            />

            <Reveal delay={130}>
              <div className="mt-9 space-y-6 font-open text-[17px] leading-[1.8] text-[#FFFFFFB8] md:text-[19px]">
                <p>
                  Our impact is not measured by events alone. SYBTE is building
                  routes from learning to continued support — helping
                  participants develop practical skills, confidence, networks
                  and access to resources that can support careers, businesses
                  and community innovation.
                </p>
                <p>
                  That is why every programme connects into the digital
                  platform, the mentoring network and the regional community
                  rather than ending at the door.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200} className="mt-10 flex flex-wrap gap-4">
              <ActionLink href="/platform" variant="outlineLight" withArrow>
                See what happens next
              </ActionLink>
            </Reveal>
          </div>

          <Reveal delay={170}>
            <div className="relative overflow-hidden rounded-[26px] border border-white/10">
              <Image
                src="/involved/iv4.jpg"
                alt="SYBTE community members networking after a session"
                width={900}
                height={640}
                className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[460px]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[#0A1328] via-[#0A1328]/25 to-transparent"
              />
              <div className="absolute bottom-0 left-0 p-8">
                <p className="font-open text-[12px] font-semibold uppercase tracking-[0.26em] text-[#FFD700]">
                  Powered by community
                </p>
                <p className="mt-3 max-w-[340px] text-[19px] font-medium leading-[1.4] tracking-[-0.015em] text-white">
                  Skills, confidence and networks that outlast the workshop.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* What we measure */}
      <Section tone="white">
        <SectionHeader
          eyebrow="What we measure"
          title="The measures we are building towards"
          intro="As delivery matures we are moving from attendance counting to outcome tracking. These are the measures we are putting in place across programmes, mentoring and business support."
        />

        <div className="mt-12">
          <CheckList items={impactMeasures} columns={3} />
        </div>
      </Section>

      {/* Geographic reach */}
      <Section tone="cream" compact>
        <SectionHeader
          eyebrow="Geographic reach"
          title="Reaching all four boroughs"
          intro="Sheffield is our delivery base, and extending consistent reach into Barnsley, Doncaster and Rotherham is an explicit goal of the 2027 phase of our roadmap."
          tone="cream"
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {boroughs.map((borough, index) => (
            <Reveal
              key={borough.name}
              delay={index * 90}
              className="flex items-start gap-4 rounded-[22px] border border-[#DADDE2] bg-white p-6"
            >
              <span className="inline-flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[13px] bg-[#D7263D14] text-[#D7263D]">
                <MapPin className="h-[19px] w-[19px]" aria-hidden />
              </span>
              <div>
                <h3 className="text-[17px] font-semibold tracking-[-0.015em] text-[#001F3F]">
                  {borough.name}
                </h3>
                <p className="mt-2 font-open text-[14px] leading-[1.6] text-[#6B6B6B]">
                  {borough.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Sources */}
      <Section tone="white" compact>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionHeader
            eyebrow="Data accuracy"
            title="Where our figures come from"
            intro="We distinguish public evidence from proposed copy, and we attribute regional data to its original source rather than presenting it as SYBTE-owned."
          />

          <Reveal delay={130}>
            <ul className="divide-y divide-[#E6E3DC] overflow-hidden rounded-[22px] border border-[#DADDE2] bg-[#FAF8F3]">
              {publicSources.map((source) => (
                <li key={source.label} className="flex gap-5 p-6 sm:p-7">
                  <span className="mt-[3px] inline-flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-[#0D1B3E0F] text-[#0D1B3E]">
                    <Info className="h-[13px] w-[13px]" aria-hidden />
                  </span>
                  <div>
                    <p className="text-[15.5px] font-semibold leading-snug tracking-[-0.01em] text-[#001F3F]">
                      {source.label}
                    </p>
                    <p className="mt-2 font-open text-[14px] leading-[1.65] text-[#6B6B6B]">
                      {source.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        title="Help us grow the evidence"
        description="Every registration, mentoring conversation and business supported adds to the regional picture. Join a programme, share your story or partner with us on delivery."
      >
        <ModalButton modal="join" variant="gold" size="lg" withArrow>
          Join the community
        </ModalButton>
        <ActionLink href="/spotlight" variant="outlineLight" size="lg">
          Share your story
        </ActionLink>
        <ActionLink href="/partners" variant="outlineLight" size="lg">
          Partner with us
        </ActionLink>
      </CtaBand>
    </>
  );
}
