import type { Metadata } from "next";
import Image from "next/image";
import {
  CalendarDays,
  Clock,
  GraduationCap,
  Landmark,
  MapPin,
  School,
  Sparkles,
} from "lucide-react";

import PageHero from "../../components/site/PageHero";
import CtaBand from "../../components/site/CtaBand";
import Reveal from "../../components/site/Reveal";
import EventProgrammeSection from "../../components/EventProgram";
import UpcomingEventsSection from "../../components/site/UpcomingEventsSection";
import { Section, SectionHeader, Rule } from "../../components/site/Section";
import { Chip } from "../../components/site/Cards";
import { ActionLink, ModalButton } from "../../components/site/Buttons";
import { contactDetails } from "../../content/sybte";

export const metadata: Metadata = {
  title: "Events & Training",
  description:
    "Upcoming and past South Yorkshire Black Tech Expo events, free training programmes, masterclasses and university collaborations across Sheffield, Barnsley, Doncaster and Rotherham.",
};

const trainingSessions = [
  {
    title: "Cyber Security & Policy Training",
    format: "Online & in-person",
    level: "Beginner to advanced",
    description:
      "Free training across cyber security fundamentals, GDPR, data protection, and risk and compliance — with practical policy application for small organisations.",
    image: "/awards/cyber-training.jpeg",
    modal: "cyber" as const,
    cta: "Register free",
  },
  {
    title: "Artificial Intelligence Workshops",
    format: "In-person workshops",
    level: "All levels",
    description:
      "Hands-on sessions on applied AI tools, responsible use and how to put artificial intelligence to work in a job, a business or a community organisation.",
    image: "/awards/Ai-Training.jpeg",
    modal: "join" as const,
    cta: "Join the next session",
  },
  {
    title: "Business Leaders Masterclass",
    format: "Masterclass series",
    level: "Founders & leaders",
    description:
      "Growth, funding readiness, marketing, partnerships and leadership capability for founders and business leaders across the region.",
    image: "/awards/ai-business-training.jpg",
    modal: "business" as const,
    cta: "Apply for support",
  },
];

const universityWork = [
  {
    icon: School,
    title: "Sheffield Hallam University",
    detail:
      "Event collaboration with the University and Students' Union, connecting students to industry and to the SYBTE community.",
  },
  {
    icon: Landmark,
    title: "University of Sheffield",
    detail:
      "Black History Month collaboration with the Staff Race Equality Network, including panel and community programming.",
  },
  {
    icon: Sparkles,
    title: "Power of Expression",
    detail:
      "Black History Month programming that connects culture, identity and technology through talks and creative sessions.",
  },
  {
    icon: GraduationCap,
    title: "Student pathways",
    detail:
      "Careers sessions, mentoring introductions and routes from study into the regional digital economy.",
  },
];

export default function EventsPage() {
  return (
    <>
      <PageHero
        breadcrumb="Events & Training"
        eyebrow="Events & Training"
        title="Where the region"
        accent="comes together"
        lead="Our events and training programmes are where skills, networks and opportunity meet. Most training is free at the point of access, and every session connects into ongoing support on the digital platform."
        image="/Hero/herosection.jpg"
        imageAlt="South Yorkshire Black Tech Expo main event"
        stats={[
          { value: "5", label: "Specialist programmes delivered" },
          { value: "8", label: "Sessions in the main expo programme" },
          { value: "Free", label: "Cyber security and policy training" },
          { value: "2", label: "Regional universities collaborating" },
        ]}
      >
        <ModalButton modal="join" variant="gold" size="lg" withArrow>
          Attend the expo
        </ModalButton>
        <ModalButton modal="cyber" variant="outlineLight" size="lg">
          Free cyber training
        </ModalButton>
      </PageHero>

      <UpcomingEventsSection />

      {/* Featured event */}
      <Section tone="white">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center xl:gap-[80px]">
          <div>
            <Reveal className="flex flex-wrap items-center gap-3">
              <Chip variant="confirmed">
                <CalendarDays className="h-[13px] w-[13px]" aria-hidden />
                Next flagship event
              </Chip>
              <Chip variant="neutral">
                <Clock className="h-[12px] w-[12px]" aria-hidden />
                10:00 – 14:00
              </Chip>
            </Reveal>

            <SectionHeader
              eyebrow="10 April 2026"
              title="South Yorkshire Black Tech Expo"
              display
              className="mt-8"
              intro="A full day of panels, keynotes and conversations on civic leadership, skills, health, AI and the digital economy — followed by networking with founders, professionals, students and partners from across the region."
            />

            <Reveal delay={160} className="mt-9 space-y-4">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[14px] bg-[#D7263D14] text-[#D7263D]">
                  <MapPin className="h-[20px] w-[20px]" aria-hidden />
                </span>
                <div>
                  <p className="text-[16px] font-semibold tracking-[-0.01em] text-[#001F3F]">
                    {contactDetails.venue}
                  </p>
                  <p className="mt-1.5 font-open text-[14.5px] leading-[1.6] text-[#6B6B6B]">
                    {contactDetails.address}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={220} className="mt-10 flex flex-wrap gap-4">
              <ModalButton modal="join" variant="red" withArrow>
                Register to attend
              </ModalButton>
              <ModalButton modal="speaker" variant="outlineDark">
                Apply to speak
              </ModalButton>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <div className="relative overflow-hidden rounded-[26px]">
              <Image
                src="/award/awd5.jpg"
                alt="Audience at a South Yorkshire Black Tech Expo event"
                width={900}
                height={660}
                className="h-[340px] w-full object-cover sm:h-[440px] lg:h-[500px]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[#0A1328]/80 via-transparent to-transparent"
              />
              <div className="absolute bottom-0 left-0 p-8">
                <Rule />
                <p className="mt-5 max-w-[360px] text-[19px] font-medium leading-[1.4] tracking-[-0.015em] text-white sm:text-[21px]">
                  Powered by community · Driven by innovation
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Programme timeline (existing component) */}
      <EventProgrammeSection />

      {/* Training programmes */}
      <Section tone="cream">
        <SectionHeader
          eyebrow="Training programmes"
          title="Workshops and masterclasses"
          intro="Our capacity-building programme runs throughout the year in cyber security, artificial intelligence, business leadership and entrepreneurship. Sessions run online and in person across South Yorkshire."
          tone="cream"
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {trainingSessions.map((session, index) => (
            <Reveal
              as="article"
              key={session.title}
              delay={index * 110}
              className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-[#DADDE2] bg-white transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_34px_70px_-42px_rgba(13,27,62,0.45)]"
            >
              <div className="relative h-[220px] w-full overflow-hidden bg-[#0A1328]">
                <Image
                  src={session.image}
                  alt={session.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top transition duration-500 group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-[#0A1328]/70 to-transparent"
                />
              </div>

              <div className="flex flex-1 flex-col p-7 sm:p-8">
                <div className="flex flex-wrap gap-2.5">
                  <Chip variant="neutral">{session.format}</Chip>
                  <Chip variant="pending">{session.level}</Chip>
                </div>

                <h3 className="mt-6 text-[20px] font-semibold leading-[1.28] tracking-[-0.02em] text-[#001F3F]">
                  {session.title}
                </h3>

                <p className="mt-4 flex-1 font-open text-[15px] leading-[1.7] text-[#555555]">
                  {session.description}
                </p>

                <div className="mt-7">
                  <ModalButton
                    modal={session.modal}
                    variant="outlineDark"
                    size="sm"
                    withArrow
                  >
                    {session.cta}
                  </ModalButton>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* University collaborations */}
      <Section tone="navy">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <SectionHeader
            eyebrow="University collaborations"
            title="Working with the region's universities"
            intro="University engagement is central to our 2026 roadmap. We work with both regional universities on events, Black History Month programming and student pathways into technology."
            tone="navy"
          >
            <Reveal delay={180} className="mt-9">
              <ActionLink href="/partners" variant="outlineLight" withArrow>
                See all collaborations
              </ActionLink>
            </Reveal>
          </SectionHeader>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {universityWork.map((item, index) => (
              <Reveal
                key={item.title}
                delay={index * 90}
                className="flex h-full flex-col rounded-[22px] border border-white/10 bg-white/[0.045] p-7 transition duration-300 hover:border-[#FFD70059] hover:bg-white/[0.07]"
              >
                <span className="inline-flex h-[46px] w-[46px] items-center justify-center rounded-[14px] bg-[#FFD7001F] text-[#FFD700]">
                  <item.icon className="h-[20px] w-[20px]" aria-hidden />
                </span>
                <h3 className="mt-6 text-[17.5px] font-semibold leading-[1.3] tracking-[-0.015em] text-white">
                  {item.title}
                </h3>
                <p className="mt-3 font-open text-[14.5px] leading-[1.65] text-[#FFFFFFA6]">
                  {item.detail}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Past activity */}
      <Section tone="white" compact>
        <SectionHeader
          eyebrow="Past activity"
          title="A growing regional archive"
          intro="Our capacity-building sessions, university collaborations and community events are building a record of what has been delivered — and what participants went on to do next."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {[
            { src: "/award/awd5.jpg", alt: "Audience at a SYBTE panel session" },
            { src: "/award/awd4.jpg", alt: "Guests networking at a SYBTE event" },
            { src: "/involved/iv1.jpg", alt: "Participants during a SYBTE workshop" },
            { src: "/involved/iv3.jpg", alt: "A SYBTE training session in progress" },
            { src: "/involved/iv2.jpg", alt: "SYBTE community members collaborating" },
          ].map((photo, index) => (
            <Reveal
              key={photo.src}
              delay={index * 80}
              className="group relative aspect-[3/4] overflow-hidden rounded-[18px]"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 50vw, 20vw"
                className="object-cover transition duration-500 group-hover:scale-[1.05]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[#0A1328]/25 transition-opacity duration-300 group-hover:opacity-0"
              />
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-12 flex flex-wrap items-center gap-4">
          <ActionLink href="/impact" variant="outlineDark" withArrow>
            See the numbers behind the events
          </ActionLink>
          <p className="font-open text-[14px] leading-[1.6] text-[#6B6B6B]">
            A dated programme and event archive is being compiled with images
            and recorded outcomes.
          </p>
        </Reveal>
      </Section>

      <CtaBand
        title="Save your place at the next session"
        description="Training places are limited and allocated on registration. Speakers, panellists and volunteers are welcome to apply at any time."
      >
        <ModalButton modal="join" variant="gold" size="lg" withArrow>
          Register to attend
        </ModalButton>
        <ModalButton modal="cyber" variant="outlineLight" size="lg">
          Free cyber training
        </ModalButton>
        <ModalButton modal="volunteer" variant="outlineLight" size="lg">
          Volunteer at an event
        </ModalButton>
      </CtaBand>
    </>
  );
}
