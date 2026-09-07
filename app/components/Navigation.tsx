"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

import { navigation } from "../content/sybte";
import { useSiteModal } from "./site/modal-context";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { openModal } = useSiteModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything on navigation.
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
    setMobileGroup(null);
  }, [pathname]);

  // Lock background scrolling while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenMenu(null);
      setMobileOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const isActive = (href: string) => {
    const base = href.split("#")[0];
    if (base === "/") return pathname === "/";
    return pathname === base || pathname.startsWith(`${base}/`);
  };

  const isGroupActive = (item: (typeof navigation)[number]) =>
    isActive(item.href) || (item.children ?? []).some((child) => isActive(child.href));

  const hoverOpen = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };

  const hoverClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full transition-[background-color,box-shadow,backdrop-filter] duration-300",
        scrolled
          ? "bg-[#0A1328]/95 shadow-[0_18px_44px_-28px_rgba(0,0,0,0.85)] backdrop-blur-md"
          : "bg-[#0D1B3EF7]",
      ].join(" ")}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[76px] w-full max-w-[1600px] items-center justify-between gap-6 px-5 sm:px-8 md:px-10 lg:h-[86px] lg:px-12 xl:px-[78px]"
      >
        <Link href="/" className="flex shrink-0 items-center" aria-label="SYBTE home">
          <Image
            src="/logo/sylogo.png"
            alt="South Yorkshire Black Tech Expo"
            width={160}
            height={46}
            priority
            className="h-auto w-[78px] sm:w-[92px] md:w-[104px] lg:w-[112px]"
          />
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-0.5 xl:flex">
          {navigation.map((item) => {
            const active = isGroupActive(item);

            if (!item.children) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={[
                    "relative rounded-[10px] px-3.5 py-2 font-dm text-[15px] font-medium tracking-[0.01em] transition-colors duration-200",
                    active ? "text-white" : "text-[#FFFFFFBF] hover:text-white",
                  ].join(" ")}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={[
                      "absolute inset-x-3.5 -bottom-0.5 h-[2px] rounded-full bg-[#FFD700] transition-transform duration-300",
                      active ? "scale-x-100" : "scale-x-0",
                    ].join(" ")}
                  />
                </Link>
              );
            }

            const expanded = openMenu === item.label;

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => hoverOpen(item.label)}
                onMouseLeave={hoverClose}
              >
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-haspopup="true"
                  onClick={() => setOpenMenu(expanded ? null : item.label)}
                  className={[
                    "relative flex items-center gap-1.5 rounded-[10px] px-3.5 py-2 font-dm text-[15px] font-medium tracking-[0.01em] transition-colors duration-200",
                    active || expanded
                      ? "text-white"
                      : "text-[#FFFFFFBF] hover:text-white",
                  ].join(" ")}
                >
                  {item.label}
                  <ChevronDown
                    className={[
                      "h-[15px] w-[15px] transition-transform duration-300",
                      expanded ? "rotate-180" : "",
                    ].join(" ")}
                    aria-hidden
                  />
                  <span
                    aria-hidden
                    className={[
                      "absolute inset-x-3.5 -bottom-0.5 h-[2px] rounded-full bg-[#FFD700] transition-transform duration-300",
                      active ? "scale-x-100" : "scale-x-0",
                    ].join(" ")}
                  />
                </button>

                <div
                  className={[
                    "absolute left-0 top-full w-[366px] pt-3 transition duration-200",
                    expanded
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-1.5 opacity-0",
                  ].join(" ")}
                >
                  <div className="overflow-hidden rounded-[20px] border border-[#0D1B3E14] bg-white p-2.5 shadow-[0_36px_80px_-32px_rgba(10,19,40,0.55)]">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpenMenu(null)}
                        className="group flex flex-col rounded-[14px] px-4 py-3.5 transition-colors duration-200 hover:bg-[#FAF8F3]"
                      >
                        <span className="flex items-center gap-2 text-[15px] font-semibold tracking-[-0.01em] text-[#0D1B3E]">
                          {child.label}
                          <span
                            aria-hidden
                            className="h-[6px] w-[6px] rounded-full bg-[#D7263D] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                          />
                        </span>
                        <span className="mt-1.5 font-open text-[13px] leading-[1.55] text-[#6B6B6B]">
                          {child.description}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop actions */}
        <div className="hidden shrink-0 items-center gap-3 xl:flex">
          <Link
            href="/login"
            className="rounded-full px-3 py-2 font-dm text-[14px] font-medium text-[#FFFFFFBF] transition-colors duration-200 hover:text-white"
          >
            Member login
          </Link>

          <button
            type="button"
            onClick={() => openModal("join")}
            className="inline-flex h-[44px] items-center justify-center rounded-full bg-[#FFD700] px-6 text-[14px] font-semibold text-[#0D1B3E] shadow-[0_10px_28px_-14px_rgba(245,166,35,0.8)] transition duration-200 hover:bg-[#FFE23F]"
          >
            Join Us
          </button>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-[12px] border border-white/15 text-white transition-colors duration-200 hover:bg-white/10 xl:hidden"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={[
          "fixed inset-x-0 bottom-0 top-[76px] z-40 overflow-y-auto overscroll-contain border-t border-white/10 bg-[#0A1328] transition duration-300 lg:top-[86px] xl:hidden",
          mobileOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
        ].join(" ")}
      >
        <div className="px-5 pb-16 pt-4 sm:px-8">
          <Link
            href="/"
            className="block border-b border-white/10 py-4 font-dm text-[16px] font-medium text-[#FFFFFFBF]"
          >
            Home
          </Link>

          {navigation.map((item) => {
            if (!item.children) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={[
                    "block border-b border-white/10 py-4 font-dm text-[16px] font-medium",
                    isActive(item.href) ? "text-[#FFD700]" : "text-[#FFFFFFBF]",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            }

            const expanded = mobileGroup === item.label;

            return (
              <div key={item.label} className="border-b border-white/10">
                <button
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => setMobileGroup(expanded ? null : item.label)}
                  className={[
                    "flex w-full items-center justify-between py-4 text-left font-dm text-[16px] font-medium",
                    isGroupActive(item) ? "text-[#FFD700]" : "text-[#FFFFFFBF]",
                  ].join(" ")}
                >
                  {item.label}
                  <ChevronDown
                    className={[
                      "h-[18px] w-[18px] transition-transform duration-300",
                      expanded ? "rotate-180" : "",
                    ].join(" ")}
                    aria-hidden
                  />
                </button>

                <div
                  className={[
                    "grid transition-all duration-300",
                    expanded
                      ? "grid-rows-[1fr] pb-3 opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  ].join(" ")}
                >
                  <div className="overflow-hidden">
                    <div className="ml-1 flex flex-col gap-1 border-l border-white/10 pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="py-2.5 font-open text-[15px] text-[#FFFFFF99] transition-colors duration-200 hover:text-white"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="mt-7 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                openModal("join");
              }}
              className="inline-flex h-[52px] items-center justify-center rounded-[14px] bg-[#FFD700] px-6 text-[15px] font-semibold text-[#0D1B3E]"
            >
              Join Us
            </button>

            <Link
              href="/login"
              className="inline-flex h-[52px] items-center justify-center rounded-[14px] border-[1.33px] border-[#FFFFFF33] px-6 text-[15px] font-semibold text-white"
            >
              Member login
            </Link>
          </div>

          <a
            href="mailto:info@gmblacktechexpo.co.uk"
            className="mt-8 block font-open text-[14px] font-medium text-[#F5A623]"
          >
            info@gmblacktechexpo.co.uk
          </a>
        </div>
      </div>
    </header>
  );
}
