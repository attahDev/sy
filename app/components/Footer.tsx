"use client";

import Image from "next/image";
import Link from "next/link";

import { useSiteModal, type ModalKey } from "./site/modal-context";
import { contactDetails } from "../content/sybte";

const exploreLinks = [
  { label: "About SYBTE", href: "/about" },
  { label: "Programmes & Roadmap", href: "/programmes" },
  { label: "Events & Training", href: "/events" },
  { label: "Digital Platform", href: "/platform" },
  { label: "Digital Health", href: "/digital-health" },
];

const communityLinks = [
  { label: "Community Impact", href: "/impact" },
  { label: "Spotlight", href: "/spotlight" },
  { label: "Awards", href: "/awards" },
  { label: "Partners", href: "/partners" },
  { label: "Our Team", href: "/team" },
];

const actionLinks: { label: string; modal: ModalKey }[] = [
  { label: "Join Us", modal: "join" },
  { label: "Business Support", modal: "business" },
  { label: "Become a Speaker", modal: "speaker" },
  { label: "Nominate a Change Maker", modal: "nominate" },
  { label: "Free Cyber Training", modal: "cyber" },
  { label: "Volunteer", modal: "volunteer" },
];

const columnLabel =
  "mb-6 font-open text-[12px] font-semibold uppercase leading-none tracking-[0.28em] text-[#F5A623]";

const linkClass =
  "text-left font-open text-[15px] leading-[1.45] text-[#FFFFFF73] transition-colors duration-200 hover:text-white sm:text-[16px]";

export default function Footer() {
  const { openModal } = useSiteModal();

  return (
    <footer className="w-full bg-[#0A1328]">
      <div className="mx-auto max-w-[1600px] px-5 pb-12 pt-14 sm:px-8 sm:pb-14 sm:pt-16 md:px-10 md:pt-20 lg:px-12 xl:px-[80px]">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 xl:grid-cols-[1.32fr_0.72fr_0.72fr_0.85fr_0.7fr] xl:gap-[56px]">
          {/* Brand */}
          <div className="sm:col-span-2 xl:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/logo/sylogo.png"
                alt="South Yorkshire Black Tech Expo"
                width={165}
                height={72}
                className="h-auto w-[140px] sm:w-[155px] md:w-[165px]"
              />
            </Link>

            <p className="mt-8 max-w-[420px] font-open text-[14px] leading-[1.75] text-[#FFFFFF66] sm:text-[15px]">
              South Yorkshire Black Tech Expo is a regional gateway into the
              Black Tech Expo global platform — connecting talent, enterprise
              and opportunity across technology, innovation, business and
              community impact.
            </p>

            <a
              href={`mailto:${contactDetails.email}`}
              className="mt-7 inline-block font-open text-[15px] font-medium leading-none text-[#F5A623] transition-opacity duration-200 hover:opacity-80 sm:text-[16px]"
            >
              {contactDetails.email}
            </a>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => openModal("join")}
                className="inline-flex h-[44px] items-center justify-center rounded-full bg-[#FFD700] px-6 text-[14px] font-semibold text-[#0D1B3E] transition duration-200 hover:bg-[#FFE23F]"
              >
                Join Us
              </button>

              <Link
                href="/get-involved#contact"
                className="inline-flex h-[44px] items-center justify-center rounded-full border-[1.33px] border-[#FFFFFF33] px-6 text-[14px] font-semibold text-white transition duration-200 hover:border-white hover:bg-white/10"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Explore */}
          <div>
            <p className={columnLabel}>Explore</p>
            <div className="flex flex-col gap-4">
              {exploreLinks.map((link) => (
                <Link key={link.href} href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Community */}
          <div>
            <p className={columnLabel}>Community</p>
            <div className="flex flex-col gap-4">
              {communityLinks.map((link) => (
                <Link key={link.href} href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Take action */}
          <div>
            <p className={columnLabel}>Take Action</p>
            <div className="flex flex-col items-start gap-4">
              {actionLinks.map((link) => (
                <button
                  key={link.modal}
                  type="button"
                  onClick={() => openModal(link.modal)}
                  className={linkClass}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* QR + regional lead */}
          <div className="flex flex-col xl:items-start">
            <div className="relative h-[132px] w-[132px] overflow-hidden bg-white sm:h-[148px] sm:w-[148px]">
              <Image
                src="/footer/qrfooter.png"
                alt="QR code linking to the SYBTE platform"
                fill
                className="object-cover"
              />
            </div>

            <div className="mt-6 max-w-[320px] font-open">
              <p className="text-[15px] leading-[1.5] text-white sm:text-[16px]">
                Rose Gordon
              </p>
              <p className="mt-1 text-[15px] leading-[1.5] text-[#FFFFFFA6] sm:text-[16px]">
                Regional Head (South Yorkshire)
              </p>
              <p className="mt-1 text-[15px] leading-[1.5] text-[#FFFFFFA6] sm:text-[16px]">
                Black Tech Expo
              </p>
            </div>

            <Link
              href="/login"
              className="mt-6 font-open text-[14px] font-medium text-[#F5A623] transition-opacity duration-200 hover:opacity-80"
            >
              Member login
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-open text-[13px] leading-[1.6] text-[#FFFFFF59]">
            © {new Date().getFullYear()} South Yorkshire Black Tech Expo. Part of
            the Black Tech Expo platform.
          </p>

          <p className="font-open text-[13px] leading-[1.6] text-[#FFFFFF59]">
            {contactDetails.venue}, Sheffield
          </p>
        </div>
      </div>

      <div className="h-[12px] w-full bg-gradient-to-r from-[#D7263D] via-[#F5A623] to-[#FFD700]" />
    </footer>
  );
}
