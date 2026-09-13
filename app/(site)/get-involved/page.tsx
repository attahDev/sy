import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  Building2,
  CalendarDays,
  Mail,
  MapPin,
  Mic,
  Rocket,
  ShieldCheck,
  Sparkles,
  Store,
  Trophy,
  UserPlus,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import PageHero from "../../components/site/PageHero";
import CtaBand from "../../components/site/CtaBand";
import Reveal from "../../components/site/Reveal";
import { Section, SectionHeader, Rule } from "../../components/site/Section";
import { Chip } from "../../components/site/Cards";
import {
  ActionLink,
  ModalButton,
  ModalTrigger,
} from "../../components/site/Buttons";
import type { ModalKey } from "../../components/site/modal-context";
import { contactDetails } from "../../content/sybte";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Join the SYBTE community, apply for business support, become a speaker, nominate a change maker, register for free cyber security training or volunteer with South Yorkshire Black Tech Expo.",
};

type ActionCard = {
  modal: ModalKey;
  icon: LucideIcon;
  title: string;
  description: string;
  fields: string[];
  cta: string;
  image: string;
  featured?: boolean;
};

const actions: ActionCard[] = [
  {
    modal: "join",
    icon: Users,
    title: "Join South Yorkshire Black Tech Expo",
    description:
      "Register as an attendee, founder, student or professional and tell us what you are hoping to gain. This is the main route into the community and the digital platform.",
    fields: [
      "Your details and city or region",
      "Attending as: attendee, founder, student or professional",
      "Areas of interest: tech, business, startups, AI or community",
      "Whether you want to join the platform after the event",
    ],
    cta: "Join us",
    image: "/involved/iv1.jpg",
    featured: true,
  },
  {
    modal: "business",
    icon: Rocket,
    title: "Business Support & Growth",
    description:
      "For founders and business owners looking for funding, mentorship, marketing, product development or partnerships — including coaching, investment readiness and accelerator routes.",
    fields: [
      "Business name, stage and industry",
      "Support required and biggest current challenge",
      "Interest in coaching, investment readiness or accelerators",
    ],
    cta: "Apply for support",
    image: "/involved/iv2.jpg",
  },
  {
    modal: "speaker",
    icon: Mic,
    title: "Become a Speaker",
    description:
      "Share your expertise at SYBTE events and platform sessions. We are always looking for practitioners who can speak candidly about technology, business and community.",
    fields: [
      "Organisation and area of expertise",
      "Two or three speaking topics",
      "Previous experience and a video or LinkedIn link",
      "Availability — specific dates or flexible",
    ],
    cta: "Apply to speak",
    image: "/involved/iv3.jpg",
  },
  {
    modal: "nominate",
    icon: Trophy,
    title: "Nominate a Change Maker",
    description:
      "Put forward someone whose work deserves recognition across community impact, leadership, youth, innovation or health and wellbeing.",
    fields: [
      "Nominee name, organisation and location",
      "Category and reason for nomination",
      "Key achievements and supporting evidence",
    ],
    cta: "Submit a nomination",
    image: "/involved/iv4.jpg",
  },
  {
    modal: "cyber",
    icon: ShieldCheck,
    title: "Free Cyber Security & Policy Training",
    description:
      "Free training across cyber security, GDPR, data protection and risk and compliance — available online or in person, from beginner to advanced.",
    fields: [
      "Organisation, role and knowledge level",
      "Areas of interest and what you want to learn",
      "Preferred format: online or in person",
    ],
    cta: "Register free",
    image: "/involved/Iv5.jpg",
  },
  {
    modal: "volunteer",
    icon: UserPlus,
    title: "Volunteer With Us",
    description:
      "Support the event team, guests, speakers and community activities. Volunteering is one of the fastest ways to build networks and experience in the regional tech scene.",
    fields: [
      "Your skills and availability",
      "The kind of support you would like to give",
      "Which borough you are based in",
    ],
    cta: "Volunteer",
    image: "/involved/volunteer.jpeg",
  },
];

const allCtas: { label: string; icon: LucideIcon; modal?: ModalKey; href?: string }[] = [
  { label: "Join the SYBTE community", icon: Users, modal: "join" },
  { label: "Attend an event or training programme", icon: CalendarDays, href: "/events" },
  { label: "Become a mentor or speaker", icon: Mic, modal: "speaker" },
  { label: "Volunteer with us", icon: UserPlus, modal: "volunteer" },
  { label: "Partner or sponsor a programme", icon: Building2, href: "/partners" },
  { label: "Showcase your business or innovation", icon: Store, modal: "business" },
  { label: "Join the digital platform", icon: Sparkles, href: "/platform" },
  { label: "Sign up for updates", icon: Bell, modal: "join" },
];

const journeys = [
  {
    visitor: "New visitor",
    path: ["Home", "About", "Impact / Spotlight"],
    action: "Join the community",
    href: "/about",
  },
  {
    visitor: "Founder or business",
    path: ["Home", "Business Support", "Digital Platform"],
    action: "Apply for support",
    href: "/platform",
  },
  {
    visitor: "Student or professional",
    path: ["Home", "Events & Training", "Join Us"],
    action: "Register and attend",
    href: "/events",
  },
  {
    visitor: "Potential speaker",
    path: ["Home", "Become a Speaker"],
    action: "Submit a speaker application",
    href: "/get-involved",
  },
  {
    visitor: "Partner or sponsor",
    path: ["Home", "Partners", "Community Impact"],
    action: "Start a partnership conversation",
    href: "/partners",
  },
  {
    visitor: "Community member",
    path: ["Home", "Spotlight / Awards"],
    action: "Nominate a change maker",
    href: "/awards",
  },
  {
    visitor: "Training participant",
    path: ["Home", "Training", "Digital Platform"],
    action: "Register and continue learning",
    href: "/programmes",
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        breadcrumb="Get Involved"
        eyebrow="Get Involved"
        title="Six ways in,"
        accent="one community"
        lead="Whether you want to learn, build a business, speak, volunteer, recognise someone or partner with us, there is a route in. Every form below takes a few minutes."
        image="/involved/iv2.jpg"
        imageAlt="SYBTE community members getting involved"
        stats={[
          { value: "6", label: "Ways to take part" },
          { value: "Free", label: "To join the community" },
          { value: "8", label: "Calls to action across the platform" },
          { value: "4", label: "Boroughs of South Yorkshire covered" },
        ]}
      >
        <ModalButton modal="join" variant="gold" size="lg" withArrow>
          Join us
        </ModalButton>
        <ModalButton modal="cyber" variant="outlineLight" size="lg">
          Free cyber training
        </ModalButton>
      </PageHero>

      {/* Action grid */}
      <Section tone="white">
        <SectionHeader
          eyebrow="Take action"
          title="Choose the route that fits you"
          intro="Each card opens a short application form. We have listed what each form asks so you know what to have ready before you start."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3 xl:mt-16">
          {actions.map((action, index) => (
            <Reveal
              as="article"
              key={action.modal}
              delay={Math.min(index * 90, 450)}
              className={[
                "group flex h-full flex-col overflow-hidden rounded-[26px] border border-[#DADDE2] bg-white transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_34px_70px_-42px_rgba(13,27,62,0.45)]",
                action.featured ? "lg:col-span-3 lg:flex-row" : "",
              ].join(" ")}
            >
              <div
                className={[
                  "relative w-full overflow-hidden",
                  action.featured
                    ? "h-[240px] lg:h-auto lg:w-[42%]"
                    : "h-[200px]",
                ].join(" ")}
              >
                <Image
                  src={action.image}
                  alt={action.title}
                  fill
                  sizes={action.featured ? "(max-width: 1024px) 100vw, 42vw" : "(max-width: 1024px) 100vw, 33vw"}
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-[#0A1328]/75 via-[#0A1328]/10 to-transparent"
                />

                {action.featured && (
                  <span className="absolute left-6 top-6">
                    <Chip variant="gold">Start here</Chip>
                  </span>
                )}
              </div>

              <div
                className={[
                  "flex flex-1 flex-col p-7 sm:p-8",
                  action.featured ? "lg:p-11" : "",
                ].join(" ")}
              >
                <span className="inline-flex h-[50px] w-[50px] items-center justify-center rounded-[15px] bg-[#D7263D14] text-[#D7263D] transition-colors duration-300 group-hover:bg-[#D7263D] group-hover:text-white">
                  <action.icon className="h-[22px] w-[22px]" aria-hidden />
                </span>

                <h3
                  className={[
                    "mt-6 font-semibold leading-[1.25] tracking-[-0.02em] text-[#001F3F]",
                    action.featured
                      ? "text-[24px] sm:text-[28px] lg:text-[32px]"
                      : "text-[20px]",
                  ].join(" ")}
                >
                  {action.title}
                </h3>

                <p
                  className={[
                    "mt-4 font-open leading-[1.7] text-[#555555]",
                    action.featured ? "max-w-[620px] text-[16px] sm:text-[17px]" : "text-[15px]",
                  ].join(" ")}
                >
                  {action.description}
                </p>

                <div className="mt-7 flex-1">
                  <p className="font-open text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A8A8A]">
                    What the form asks
                  </p>

                  <ul
                    className={[
                      "mt-4 space-y-2.5",
                      action.featured ? "sm:grid sm:grid-cols-2 sm:gap-x-8 sm:space-y-0 sm:gap-y-2.5" : "",
                    ].join(" ")}
                  >
                    {action.fields.map((field) => (
                      <li
                        key={field}
                        className="flex items-start gap-3 font-open text-[14px] leading-[1.6] text-[#555555]"
                      >
                        <span
                          aria-hidden
                          className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#F5A623]"
                        />
                        {field}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <ModalButton
                    modal={action.modal}
                    variant={action.featured ? "red" : "outlineDark"}
                    size={action.featured ? "md" : "sm"}
                    withArrow
                  >
                    {action.cta}
                  </ModalButton>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* All calls to action */}
      <Section tone="navy" compact>
        <SectionHeader
          eyebrow="Every way to take part"
          title="Eight things you can do today"
          tone="navy"
        />

        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {allCtas.map((cta, index) => {
            const inner = (
              <>
                <span className="inline-flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[13px] bg-[#FFD7001F] text-[#FFD700] transition-transform duration-300 group-hover:scale-105">
                  <cta.icon className="h-[19px] w-[19px]" aria-hidden />
                </span>
                <span className="flex-1 font-open text-[14.5px] font-medium leading-[1.45] text-[#FFFFFFC4]">
                  {cta.label}
                </span>
                <ArrowRight
                  className="h-[16px] w-[16px] shrink-0 text-[#FFFFFF4D] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#FFD700]"
                  aria-hidden
                />
              </>
            );

            const className =
              "group flex w-full items-center gap-4 rounded-[18px] border border-white/10 bg-white/[0.04] p-5 text-left transition duration-300 hover:border-[#FFD70047] hover:bg-white/[0.075]";

            return (
              <Reveal key={cta.label} delay={Math.min(index * 60, 400)}>
                {cta.href ? (
                  <Link href={cta.href} className={className}>
                    {inner}
                  </Link>
                ) : (
                  <ModalTrigger modal={cta.modal!} className={className}>
                    {inner}
                  </ModalTrigger>
                )}
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Journeys */}
      <Section tone="cream">
        <SectionHeader
          eyebrow="Find your route"
          title="Journeys through the platform"
          intro="However you arrive, there is a short path to something useful. These are the routes we design for."
          tone="cream"
        />

        <div className="mt-14 overflow-hidden rounded-[26px] border border-[#DADDE2] bg-white">
          {journeys.map((journey, index) => (
            <Reveal
              key={journey.visitor}
              delay={Math.min(index * 60, 360)}
              className={index === 0 ? "" : "border-t border-[#EFECE4]"}
            >
              <Link
                href={journey.href}
                className="group grid grid-cols-1 gap-4 p-7 transition-colors duration-200 hover:bg-[#FAF8F3] lg:grid-cols-[0.9fr_1.5fr_1fr] lg:items-center lg:gap-8 lg:p-8"
              >
                <p className="text-[17px] font-semibold tracking-[-0.015em] text-[#001F3F]">
                  {journey.visitor}
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  {journey.path.map((step, stepIndex) => (
                    <span key={step} className="flex items-center gap-2">
                      <span className="rounded-full border border-[#0D1B3E1A] bg-[#FAF8F3] px-3.5 py-1.5 font-open text-[12.5px] font-medium text-[#3B4C74]">
                        {step}
                      </span>
                      {stepIndex < journey.path.length - 1 && (
                        <ArrowRight
                          className="h-[13px] w-[13px] text-[#B8B4AA]"
                          aria-hidden
                        />
                      )}
                    </span>
                  ))}
                </div>

                <p className="flex items-center gap-2 font-open text-[14.5px] font-semibold text-[#D7263D]">
                  {journey.action}
                  <ArrowRight
                    className="h-[15px] w-[15px] transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden
                  />
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" tone="white">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-start xl:gap-[80px]">
          <div>
            <SectionHeader
              eyebrow="Contact"
              title={
                <>
                  <span className="block">Talk to the</span>
                  <span className="block">South Yorkshire team</span>
                </>
              }
              display
              intro="For partnerships, speaking, media, programme questions or anything the forms do not cover, email us directly — we read everything."
            />

            <Reveal delay={150} className="mt-10 space-y-5">
              <a
                href={`mailto:${contactDetails.email}`}
                className="group flex items-start gap-5 rounded-[22px] border border-[#DADDE2] bg-[#FAF8F3] p-7 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_28px_60px_-38px_rgba(13,27,62,0.4)]"
              >
                <span className="inline-flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[15px] bg-[#D7263D14] text-[#D7263D] transition-colors duration-300 group-hover:bg-[#D7263D] group-hover:text-white">
                  <Mail className="h-[21px] w-[21px]" aria-hidden />
                </span>
                <div>
                  <p className="font-open text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#8A8A8A]">
                    Email
                  </p>
                  <p className="mt-2 text-[17px] font-semibold tracking-[-0.01em] text-[#001F3F] sm:text-[19px]">
                    {contactDetails.email}
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-5 rounded-[22px] border border-[#DADDE2] bg-[#FAF8F3] p-7">
                <span className="inline-flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[15px] bg-[#0D1B3E0F] text-[#0D1B3E]">
                  <MapPin className="h-[21px] w-[21px]" aria-hidden />
                </span>
                <div>
                  <p className="font-open text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#8A8A8A]">
                    Where we deliver
                  </p>
                  <p className="mt-2 text-[16px] font-semibold tracking-[-0.01em] text-[#001F3F]">
                    {contactDetails.venue}
                  </p>
                  <p className="mt-1.5 font-open text-[14.5px] leading-[1.6] text-[#6B6B6B]">
                    {contactDetails.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 rounded-[22px] border border-[#DADDE2] bg-[#FAF8F3] p-7">
                <span className="inline-flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[15px] bg-[#F5A62321] text-[#B27A0C]">
                  <Users className="h-[21px] w-[21px]" aria-hidden />
                </span>
                <div>
                  <p className="font-open text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#8A8A8A]">
                    Regional lead
                  </p>
                  <p className="mt-2 text-[16px] font-semibold tracking-[-0.01em] text-[#001F3F]">
                    {contactDetails.regionalHead}
                  </p>
                  <p className="mt-1.5 font-open text-[14.5px] leading-[1.6] text-[#6B6B6B]">
                    Black Tech Expo
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={180}>
            <div className="overflow-hidden rounded-[26px] bg-[#0D1B3E] p-9 sm:p-11">
              <p className="font-open text-[12px] font-semibold uppercase leading-none tracking-[0.3em] text-[#FFD700]">
                Scan to connect
              </p>

              <div className="mt-8 inline-block rounded-[18px] bg-white p-4">
                <Image
                  src="/footer/qrfooter.png"
                  alt="QR code linking to the SYBTE platform"
                  width={190}
                  height={190}
                  className="h-[170px] w-[170px] object-cover sm:h-[190px] sm:w-[190px]"
                />
              </div>

              <Rule className="mt-9" />

              <p className="mt-7 font-open text-[16px] leading-[1.75] text-[#FFFFFFB3]">
                Scan the code to reach the South Yorkshire Black Tech Expo
                platform, register for programmes and join the regional
                community.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <ModalButton modal="join" variant="gold" size="sm" withArrow>
                  Join us
                </ModalButton>
                <ActionLink href="/signup" variant="outlineLight" size="sm">
                  Create an account
                </ActionLink>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        title="Ready when you are"
        description="Pick a form, send an email or create a platform account. The quickest way in is simply to join the community."
      >
        <ModalButton modal="join" variant="gold" size="lg" withArrow>
          Join the community
        </ModalButton>
        <ActionLink
          href={`mailto:${contactDetails.email}`}
          variant="outlineLight"
          size="lg"
        >
          Email the team
        </ActionLink>
      </CtaBand>
    </>
  );
}
