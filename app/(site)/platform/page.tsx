import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  BookOpen,
  Briefcase,
  Leaf,
  LineChart,
  Lock,
  MessagesSquare,
  Sparkles,
  Trophy,
  UserPlus,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import PageHero from "../../components/site/PageHero";
import CtaBand from "../../components/site/CtaBand";
import Reveal from "../../components/site/Reveal";
import { Section, SectionHeader } from "../../components/site/Section";
import { Chip } from "../../components/site/Cards";
import { ActionLink, ModalButton } from "../../components/site/Buttons";
import { platformTools } from "../../content/sybte";

export const metadata: Metadata = {
  title: "Digital Platform & Resources",
  description:
    "The SYBTE digital platform extends support beyond individual workshops — Digital Academy, AI Business Studio, Mentor AI, business and startup resources, research intelligence, the Green Impact Toolkit, Hall of Fame and community networking.",
};

const toolIcons: Record<string, LucideIcon> = {
  "Digital Academy": BookOpen,
  "AI Business Studio": Sparkles,
  "Mentor AI": Bot,
  "Business & Startup Resources": Briefcase,
  "Research & Market Intelligence": LineChart,
  "Green Impact Toolkit": Leaf,
  "Hall of Fame": Trophy,
  "Community & Networking": MessagesSquare,
};

export default function PlatformPage() {
  return (
    <>
      <PageHero
        breadcrumb="Digital Platform"
        eyebrow="Digital Platform & Resources"
        title="Support that doesn't"
        accent="stop at the door"
        lead="A workshop is a starting point. The SYBTE digital platform gives participants somewhere to keep learning, keep building and keep connecting long after a session ends."
        stats={[
          { value: "8", label: "Tools and resources on the platform" },
          { value: "24/7", label: "Access for registered members" },
          { value: "Free", label: "To join as a community member" },
          { value: "1", label: "Login across the whole platform" },
        ]}
      >
        <ActionLink href="/signup" variant="gold" size="lg" withArrow>
          Create your account
        </ActionLink>
        <ActionLink href="/login" variant="outlineLight" size="lg">
          Member login
        </ActionLink>
      </PageHero>

      {/* Why it exists */}
      <Section tone="white">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center xl:gap-[80px]">
          <SectionHeader
            eyebrow="Why the platform exists"
            title={
              <>
                <span className="block">One place for</span>
                <span className="block">everything after</span>
                <span className="block">the workshop</span>
              </>
            }
            display
            intro="Public programme communications reference continued access to a growing digital infrastructure. This page explains who can access each resource, what it does, whether registration is required and how it supports progression after training."
          >
            <Reveal delay={180} className="mt-10 flex flex-wrap gap-4">
              <ActionLink href="/signup" variant="outlineDark" withArrow>
                Join the platform
              </ActionLink>
            </Reveal>
          </SectionHeader>

          <Reveal delay={140} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                step: "01",
                title: "Register once",
                body: "A single SYBTE account opens every tool your access level allows.",
              },
              {
                step: "02",
                title: "Keep learning",
                body: "Digital Academy courses continue the training you started in person.",
              },
              {
                step: "03",
                title: "Build with tools",
                body: "AI Business Studio, business resources and market intelligence.",
              },
              {
                step: "04",
                title: "Stay connected",
                body: "Community, mentoring and recognition through the Hall of Fame.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-[22px] border border-[#DADDE2] bg-[#FAF8F3] p-7 transition duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_28px_60px_-38px_rgba(13,27,62,0.4)]"
              >
                <span className="font-beb text-[40px] leading-none tracking-[0.04em] text-[#0D1B3E1F]">
                  {item.step}
                </span>
                <h3 className="mt-4 text-[18px] font-semibold tracking-[-0.02em] text-[#001F3F]">
                  {item.title}
                </h3>
                <p className="mt-3 font-open text-[14.5px] leading-[1.65] text-[#555555]">
                  {item.body}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* The tools */}
      <Section tone="navy">
        <SectionHeader
          eyebrow="What's on the platform"
          title="Eight resources, one account"
          intro="Some tools are live today and others are being ported across from the wider Black Tech Expo platform. Access levels are listed against each resource."
          tone="navy"
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:mt-16">
          {platformTools.map((tool, index) => {
            const Icon = toolIcons[tool.name] ?? Sparkles;

            const card = (
              <>
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex h-[50px] w-[50px] items-center justify-center rounded-[15px] bg-[#FFD7001F] text-[#FFD700] transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-[22px] w-[22px]" aria-hidden />
                  </span>

                  {tool.href && (
                    <ArrowRight
                      className="h-[18px] w-[18px] text-[#FFFFFF4D] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#FFD700]"
                      aria-hidden
                    />
                  )}
                </div>

                <h3 className="mt-7 text-[18.5px] font-semibold leading-[1.3] tracking-[-0.02em] text-white">
                  {tool.name}
                </h3>

                <p className="mt-4 flex-1 font-open text-[14.5px] leading-[1.7] text-[#FFFFFFA6]">
                  {tool.summary}
                </p>

                <dl className="mt-7 space-y-3 border-t border-white/10 pt-6">
                  <div>
                    <dt className="font-open text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#FFD70099]">
                      Who can access
                    </dt>
                    <dd className="mt-1.5 font-open text-[13.5px] leading-[1.55] text-[#FFFFFFB8]">
                      {tool.access}
                    </dd>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <Lock className="h-[12px] w-[12px] text-[#FFFFFF66]" aria-hidden />
                    <span className="font-open text-[12.5px] text-[#FFFFFF8C]">
                      {tool.registration}
                    </span>
                  </div>
                </dl>
              </>
            );

            const cardClass =
              "group flex h-full flex-col rounded-[22px] border border-white/10 bg-white/[0.045] p-7 transition duration-300 hover:-translate-y-1.5 hover:border-[#FFD70059] hover:bg-white/[0.08]";

            return (
              <Reveal
                key={tool.name}
                delay={Math.min(index * 70, 420)}
                className="h-full"
              >
                {tool.href ? (
                  <Link href={tool.href} className={cardClass}>
                    {card}
                  </Link>
                ) : (
                  <div className={cardClass}>{card}</div>
                )}
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={220} className="mt-14 flex flex-wrap items-center gap-4">
          <ActionLink href="/signup" variant="gold" withArrow>
            Create your free account
          </ActionLink>
          <ActionLink href="/dashboard" variant="outlineLight">
            Go to the dashboard
          </ActionLink>
        </Reveal>
      </Section>

      {/* Access & progression */}
      <Section tone="cream">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-start xl:gap-[80px]">
          <div>
            <SectionHeader
              eyebrow="Access & progression"
              title="How the platform supports progression"
              intro="The platform is designed around the journey rather than the tool. Each resource exists to move someone one step further along a pathway into skills, work or enterprise."
              tone="cream"
            />

            <Reveal delay={140} className="mt-10 space-y-4">
              {[
                {
                  icon: BookOpen,
                  title: "After training",
                  body: "Digital Academy keeps the curriculum available so learning continues at the participant's own pace.",
                },
                {
                  icon: Briefcase,
                  title: "After a business session",
                  body: "AI Business Studio, startup resources and market intelligence turn advice into deliverable work.",
                },
                {
                  icon: UserPlus,
                  title: "After an event",
                  body: "Community and networking keep the connections alive, and mentoring continues through Mentor AI.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-5 rounded-[22px] border border-[#DADDE2] bg-white p-7"
                >
                  <span className="inline-flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[14px] bg-[#D7263D14] text-[#D7263D]">
                    <item.icon className="h-[20px] w-[20px]" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-[17.5px] font-semibold tracking-[-0.015em] text-[#001F3F]">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 font-open text-[14.5px] leading-[1.7] text-[#555555]">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>

          <Reveal delay={180} className="space-y-6 lg:pt-4">
            <div className="rounded-[26px] border border-[#DADDE2] bg-white p-8 sm:p-9">
              <div className="flex flex-wrap items-center gap-3">
                <Chip variant="confirmed">Live now</Chip>
                <Chip variant="pending">More coming</Chip>
              </div>

              <h3 className="mt-7 text-[21px] font-semibold tracking-[-0.02em] text-[#001F3F]">
                Platform status
              </h3>

              <p className="mt-4 font-open text-[15px] leading-[1.75] text-[#555555]">
                Community and networking are live for registered members today.
                The Academy, AI Business Studio, Mentor AI, business planning,
                market intelligence and Green Impact Toolkit are being brought
                across from the wider Black Tech Expo platform.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <ActionLink href="/dashboard/community" variant="outlineDark" size="sm" withArrow>
                  Visit the community
                </ActionLink>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        title="Join the platform"
        description="One free account opens the Digital Academy, business tools, market intelligence, mentoring and the regional community."
      >
        <ActionLink href="/signup" variant="gold" size="lg" withArrow>
          Create your account
        </ActionLink>
        <ModalButton modal="join" variant="outlineLight" size="lg">
          Join the community
        </ModalButton>
        <ActionLink href="/programmes" variant="outlineLight" size="lg">
          Browse programmes
        </ActionLink>
      </CtaBand>
    </>
  );
}
