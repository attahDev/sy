import type { Metadata } from "next";
import Image from "next/image";
import { Info, Mic, Users, Wrench } from "lucide-react";

import PageHero from "../../components/site/PageHero";
import CtaBand from "../../components/site/CtaBand";
import Reveal from "../../components/site/Reveal";
import { Section, SectionHeader } from "../../components/site/Section";
import { Chip, Monogram, NoteCallout } from "../../components/site/Cards";
import { ActionLink, ModalButton } from "../../components/site/Buttons";
import { team, type TeamMember } from "../../content/sybte";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the regional leadership behind South Yorkshire Black Tech Expo — founder Michael Ekpechue, Regional Head Rose Gordon, Digital Health Innovation Lead Dr Patience Amos and SYBTE Ambassador Nicola Towse.",
};

const leadership = team.slice(0, 2);
const specialists = team.slice(2);

const openRoles = [
  {
    icon: Wrench,
    title: "Technical volunteers",
    description:
      "Web, data, AV and platform support to keep our programmes and digital tools running.",
  },
  {
    icon: Mic,
    title: "Panel advisers & speakers",
    description:
      "Subject specialists who can shape sessions and contribute to events across the region.",
  },
  {
    icon: Users,
    title: "Programme leads & ambassadors",
    description:
      "Local champions in Barnsley, Doncaster and Rotherham who can grow SYBTE in their area.",
  },
];

function LeadershipCard({ member, delay }: { member: TeamMember; delay: number }) {
  return (
    <Reveal
      as="article"
      delay={delay}
      className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-[#DADDE2] bg-white transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_34px_70px_-42px_rgba(13,27,62,0.45)]"
    >
      {/* Portrait frame so the studio shots are barely cropped. The backdrop
          matches the grey in the source photography so both leads read as one
          consistent set. */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#E7E7E7]">
        {member.image ? (
          <Image
            src={member.image}
            alt={`${member.name}, ${member.role}`}
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1180px) 50vw, 574px"
            className={`object-cover ${member.imagePosition ?? "object-top"} transition duration-500 group-hover:scale-[1.03]`}
          />
        ) : (
          <Monogram name={member.name} size="lg" className="rounded-none" />
        )}

        <span className="absolute left-6 top-6 inline-flex items-center rounded-full bg-[#0D1B3E] px-3.5 py-1.5 font-open text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FFD700]">
          Leadership
        </span>
      </div>

      <div className="flex flex-1 flex-col p-8 sm:p-9">
        <h3 className="text-[24px] font-semibold leading-tight tracking-[-0.025em] text-[#001F3F] sm:text-[27px]">
          {member.name}
        </h3>

        <p className="mt-3 font-open text-[15px] font-semibold leading-[1.5] text-[#D7263D] sm:text-[16px]">
          {member.role}
        </p>

        <p className="mt-6 font-open text-[15.5px] leading-[1.75] text-[#555555] sm:text-[16px]">
          {member.bio}
        </p>

        <div className="mt-8 border-t border-[#E6E3DC] pt-6">
          <p className="font-open text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#8A8A8A]">
            Website focus
          </p>
          <p className="mt-2.5 font-open text-[14.5px] leading-[1.6] text-[#444444]">
            {member.focus}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export default function TeamPage() {
  return (
    <>
      <PageHero
        breadcrumb="Our Team"
        eyebrow="Our Team"
        title="Regional leadership,"
        accent="community driven"
        lead="SYBTE is led by a small core team and powered by specialist leads, ambassadors and volunteers who give their time to widen access to technology across South Yorkshire."
        stats={[
          { value: "4", label: "Core team members and specialist leads" },
          { value: "1", label: "Regional head for South Yorkshire" },
          { value: "3", label: "Volunteer and ambassador routes open" },
          { value: "4", label: "Boroughs we are building leadership across" },
        ]}
      >
        <ModalButton modal="volunteer" variant="gold" size="lg" withArrow>
          Volunteer with us
        </ModalButton>
        <ModalButton modal="speaker" variant="outlineLight" size="lg">
          Become a speaker
        </ModalButton>
      </PageHero>

      {/* Core leadership */}
      <Section tone="white">
        <SectionHeader
          eyebrow="Core leadership"
          title="The people steering SYBTE"
          intro="Our founder connects South Yorkshire to the wider Black Tech Expo ecosystem, while our regional head leads partnerships, programmes and delivery on the ground."
        />

        <div className="mx-auto mt-14 grid max-w-[1180px] grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {leadership.map((member, index) => (
            <LeadershipCard
              key={member.name}
              member={member}
              delay={index * 120}
            />
          ))}
        </div>
      </Section>

      {/* Specialist leads & ambassadors */}
      <Section tone="cream">
        <SectionHeader
          eyebrow="Specialist leads & ambassadors"
          title="Depth where it matters most"
          intro="Alongside the core team, specialist leads and ambassadors bring focused expertise and open doors across the regional ecosystem."
          tone="cream"
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {specialists.map((member, index) => (
            <Reveal
              as="article"
              key={member.name}
              delay={index * 120}
              className="group flex h-full flex-col rounded-[26px] border border-[#DADDE2] bg-white p-8 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_34px_70px_-42px_rgba(13,27,62,0.45)] sm:p-10"
            >
              <div className="flex items-center gap-5">
                <Monogram name={member.name} size="md" />
                <div>
                  <h3 className="text-[21px] font-semibold leading-tight tracking-[-0.02em] text-[#001F3F] sm:text-[23px]">
                    {member.name}
                  </h3>
                  <p className="mt-2 font-open text-[14.5px] font-semibold leading-[1.45] text-[#D7263D]">
                    {member.role}
                  </p>
                </div>
              </div>

              <p className="mt-7 flex-1 font-open text-[15.5px] leading-[1.75] text-[#555555] sm:text-[16px]">
                {member.bio}
              </p>

              <div className="mt-7 border-t border-[#E6E3DC] pt-6">
                <p className="font-open text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#8A8A8A]">
                  Website focus
                </p>
                <p className="mt-2.5 font-open text-[14.5px] leading-[1.6] text-[#444444]">
                  {member.focus}
                </p>
              </div>

              {member.name === "Dr Patience Amos" && (
                <div className="mt-6">
                  <ActionLink href="/digital-health" variant="outlineDark" size="sm" withArrow>
                    Digital Health &amp; Innovation
                  </ActionLink>
                </div>
              )}
            </Reveal>
          ))}
        </div>

        <div className="mt-12">
          <NoteCallout title="Before publication" icon={Info}>
            <p>
              The final team list, exact titles, biographies, headshots and
              publication consent are confirmed internally before going live.
              Additional programme leads, technical volunteers, panel advisers
              and ambassadors are added as those roles are agreed.
            </p>
          </NoteCallout>
        </div>
      </Section>

      {/* Join the team */}
      <Section tone="navy">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeader
            eyebrow="Join the team"
            title="Grow the regional network with us"
            intro="SYBTE runs on volunteer contribution and specialist goodwill. If you have skills, time or reach to offer, there is a role for you."
            tone="navy"
          >
            <Reveal delay={180} className="mt-9 flex flex-wrap gap-4">
              <ModalButton modal="volunteer" variant="gold" withArrow>
                Volunteer with us
              </ModalButton>
              <ModalButton modal="speaker" variant="outlineLight">
                Apply to speak
              </ModalButton>
            </Reveal>
          </SectionHeader>

          <div className="grid grid-cols-1 gap-4">
            {openRoles.map((role, index) => (
              <Reveal
                key={role.title}
                delay={index * 100}
                className="flex items-start gap-5 rounded-[22px] border border-white/10 bg-white/[0.045] p-7 transition duration-300 hover:border-[#FFD70059] hover:bg-white/[0.07]"
              >
                <span className="inline-flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[15px] bg-[#FFD7001F] text-[#FFD700]">
                  <role.icon className="h-[21px] w-[21px]" aria-hidden />
                </span>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-[18px] font-semibold tracking-[-0.015em] text-white">
                      {role.title}
                    </h3>
                    <Chip variant="gold">Open</Chip>
                  </div>
                  <p className="mt-3 font-open text-[15px] leading-[1.7] text-[#FFFFFFA6]">
                    {role.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand
        title="Bring your skills to South Yorkshire"
        description="Volunteers, mentors, speakers and ambassadors are the reason SYBTE reaches as far as it does. Tell us how you would like to contribute."
      >
        <ModalButton modal="volunteer" variant="gold" size="lg" withArrow>
          Volunteer with us
        </ModalButton>
        <ActionLink href="/get-involved" variant="outlineLight" size="lg">
          All the ways to get involved
        </ActionLink>
      </CtaBand>
    </>
  );
}
