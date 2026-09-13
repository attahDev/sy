import type { Metadata } from "next";
import {
  BadgeCheck,
  Building2,
  Clock,
  Handshake,
  Mail,
} from "lucide-react";

import PageHero from "../../components/site/PageHero";
import CtaBand from "../../components/site/CtaBand";
import Reveal from "../../components/site/Reveal";
import { Section, SectionHeader, Rule } from "../../components/site/Section";
import { Chip } from "../../components/site/Cards";
import { ActionLink, ModalButton } from "../../components/site/Buttons";
import { contactDetails, partners, partnershipOffers } from "../../content/sybte";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "SYBTE works with technology organisations, universities, businesses, community organisations, mentors and regional networks to widen access to skills, innovation and opportunity across South Yorkshire.",
};

const confirmed = partners.filter((partner) => partner.status === "confirmed");
const inProgress = partners.filter((partner) => partner.status === "pending");

const partnerCategories = [
  "Partner",
  "Delivery Partner",
  "Collaborator",
  "Supporter",
  "Community Partner",
];

export default function PartnersPage() {
  return (
    <>
      <PageHero
        breadcrumb="Partners"
        eyebrow="Partners"
        title="SYBTE grows"
        accent="through collaboration"
        lead="We work with technology organisations, universities, businesses, community organisations, mentors and regional networks to widen access to skills, innovation and opportunity."
        image="/involved/iv3.jpg"
        imageAlt="Partner organisations collaborating at a SYBTE event"
        stats={[
          { value: "10", label: "Ways organisations can partner with us" },
          { value: "2", label: "Regional universities engaged" },
          { value: "4", label: "Boroughs of delivery reach" },
          { value: "5", label: "Partner categories we recognise" },
        ]}
      >
        <ActionLink href="#partner-with-us" variant="gold" size="lg" withArrow>
          Partner with us
        </ActionLink>
        <ActionLink href="/programmes" variant="outlineLight" size="lg">
          See what we deliver
        </ActionLink>
      </PageHero>

      {/* Confirmed delivery partner */}
      <Section tone="white">
        <SectionHeader
          eyebrow="Delivery partner"
          title="Confirmed delivery relationship"
          intro="This relationship is publicly evidenced and supports the delivery of our capacity-building activity in Sheffield."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          {confirmed.map((partner) => (
            <Reveal
              as="article"
              key={partner.name}
              className="relative overflow-hidden rounded-[26px] bg-[#0D1B3E] p-9 sm:p-11"
            >
              <div aria-hidden className="grid-overlay absolute inset-0 opacity-60" />
              <span
                aria-hidden
                className="absolute -right-[8%] -top-[40%] h-[380px] w-[380px] rounded-full bg-[#F5A623] opacity-[0.13] blur-[110px]"
              />

              <div className="relative">
                <div className="flex flex-wrap items-center gap-3">
                  <Chip variant="gold">
                    <BadgeCheck className="h-[13px] w-[13px]" aria-hidden />
                    {partner.category}
                  </Chip>
                  <Chip variant="gold">Publicly evidenced</Chip>
                </div>

                <h3 className="mt-8 text-[28px] font-semibold leading-[1.15] tracking-[-0.025em] text-white sm:text-[34px] lg:text-[38px]">
                  {partner.name}
                </h3>

                <p className="mt-6 max-w-[620px] font-open text-[16px] leading-[1.8] text-[#FFFFFFB3] sm:text-[18px]">
                  {partner.description}
                </p>

                <div className="mt-9 flex items-center gap-4 border-t border-white/12 pt-7">
                  <span className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-[14px] bg-[#FFD7001F] text-[#FFD700]">
                    <Building2 className="h-[20px] w-[20px]" aria-hidden />
                  </span>
                  <p className="font-open text-[14px] leading-[1.55] text-[#FFFFFF99]">
                    Cooper Buildings, Sheffield city centre — the venue for much
                    of our regional training delivery.
                  </p>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal delay={120} className="flex flex-col gap-6">
            <div className="flex-1 rounded-[26px] border border-[#DADDE2] bg-[#FAF8F3] p-8">
              <Rule />
              <h3 className="mt-6 text-[19px] font-semibold tracking-[-0.02em] text-[#001F3F]">
                How we describe relationships
              </h3>
              <p className="mt-3 font-open text-[15px] leading-[1.7] text-[#555555]">
                Every organisation is listed under an agreed category so the
                nature of the relationship is never overstated.
              </p>

              <ul className="mt-6 flex flex-wrap gap-2.5">
                {partnerCategories.map((category) => (
                  <li key={category}>
                    <Chip variant="neutral">{category}</Chip>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Collaborations being confirmed */}
      <Section tone="cream">
        <SectionHeader
          eyebrow="Collaborations"
          title="Relationships we are formalising"
          intro="These organisations have collaborated with SYBTE on events, programmes or community activity. Each is listed here as a collaboration while we confirm preferred naming, logo permission and the right partner category before it appears as a formal website partnership."
          tone="cream"
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {inProgress.map((partner, index) => (
            <Reveal
              as="article"
              key={partner.name}
              delay={Math.min(index * 80, 400)}
              className="group flex h-full flex-col rounded-[22px] border border-[#DADDE2] bg-white p-7 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-38px_rgba(13,27,62,0.42)] sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-[15px] bg-[#0D1B3E0F] text-[#0D1B3E] transition-colors duration-300 group-hover:bg-[#0D1B3E] group-hover:text-white">
                  <Building2 className="h-[22px] w-[22px]" aria-hidden />
                </span>

                <Chip variant="pending">
                  <Clock className="h-[12px] w-[12px]" aria-hidden />
                  To confirm
                </Chip>
              </div>

              <p className="mt-7 font-open text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#D7263D]">
                {partner.category}
              </p>

              <h3 className="mt-3 text-[19px] font-semibold leading-[1.3] tracking-[-0.02em] text-[#001F3F]">
                {partner.name}
              </h3>

              <p className="mt-4 font-open text-[15px] leading-[1.7] text-[#555555]">
                {partner.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Partner with us */}
      <Section id="partner-with-us" tone="navy">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-start xl:gap-[80px]">
          <div>
            <SectionHeader
              eyebrow="Partner with us"
              title={
                <>
                  <span className="block">Build inclusive</span>
                  <span className="block text-[#FFD700]">innovation with us</span>
                </>
              }
              tone="navy"
              display
              intro="We welcome organisations that share our commitment to inclusive innovation, skills development, entrepreneurship and community opportunity."
            />

            <Reveal delay={180} className="mt-10 flex flex-wrap gap-4">
              <ActionLink
                href={`mailto:${contactDetails.email}?subject=Partnership%20enquiry%20%E2%80%94%20South%20Yorkshire%20Black%20Tech%20Expo`}
                variant="gold"
                withArrow
              >
                Start a partnership conversation
              </ActionLink>
              <ModalButton modal="speaker" variant="outlineLight">
                Offer a speaker
              </ModalButton>
            </Reveal>

            <Reveal delay={240} className="mt-10 flex items-center gap-4">
              <span className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-[14px] bg-[#FFD7001F] text-[#FFD700]">
                <Mail className="h-[20px] w-[20px]" aria-hidden />
              </span>
              <div>
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="font-open text-[16px] font-medium text-[#F5A623] transition-opacity hover:opacity-80"
                >
                  {contactDetails.email}
                </a>
                <p className="mt-1 font-open text-[13.5px] text-[#FFFFFF80]">
                  {contactDetails.regionalHead}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <div className="rounded-[26px] border border-white/10 bg-white/[0.045] p-8 sm:p-10">
              <div className="flex items-center gap-4">
                <span className="inline-flex h-[48px] w-[48px] items-center justify-center rounded-[15px] bg-[#FFD7001F] text-[#FFD700]">
                  <Handshake className="h-[21px] w-[21px]" aria-hidden />
                </span>
                <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-white">
                  Partnership can include
                </h3>
              </div>

              <ul className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-[18px] border border-white/10 sm:grid-cols-2">
                {partnershipOffers.map((offer, index) => (
                  <li
                    key={offer}
                    className="flex items-center gap-3.5 border-b border-white/[0.07] bg-white/[0.02] px-5 py-4 last:border-b-0 sm:border-r sm:[&:nth-child(2n)]:border-r-0"
                  >
                    <span className="font-open text-[11.5px] font-semibold tabular-nums tracking-[0.1em] text-[#FFD70099]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-open text-[15px] leading-[1.5] text-[#FFFFFFC4]">
                      {offer}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-7 font-open text-[14px] leading-[1.7] text-[#FFFFFF8C]">
                Not sure which fits? Tell us what your organisation cares about
                and we will suggest the most useful way to work together.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        title="Let's widen access together"
        description="Programme delivery, sponsorship, venues, mentoring, speakers, technology access, student engagement, research, employment pathways and community outreach — there is a route for every organisation."
      >
        <ActionLink
          href={`mailto:${contactDetails.email}?subject=Partnership%20enquiry%20%E2%80%94%20South%20Yorkshire%20Black%20Tech%20Expo`}
          variant="gold"
          size="lg"
          withArrow
        >
          Email the team
        </ActionLink>
        <ActionLink href="/impact" variant="outlineLight" size="lg">
          Review our impact
        </ActionLink>
      </CtaBand>
    </>
  );
}
