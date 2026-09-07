"use client";

import Image from "next/image";

import { useSiteModal } from "./site/modal-context";

const involvementCards = [
  {
    title: "Join Us",
    description: "Register as an attendee, founder, student, or professional",
    image: "/involved/iv1.jpg",
    id: "join" as const,
  },
  {
    title: "Business Support",
    description: "Access funding, marketing and growth programmes",
    image: "/involved/iv2.jpg",
    id: "business" as const,
  },
  {
    title: "Become a Speaker",
    description: "Apply to speak at future SYBTE events and platform sessions",
    image: "/involved/iv3.jpg",
    id: "speaker" as const,
  },
  {
    title: "Nominate a Change Maker",
    description: "Recognize community leaders driving real impact in South Yorkshire",
    image: "/involved/iv4.jpg",
    id: "nominate" as const,
  },
  {
    title: "Cyber Security Training",
    description: "Free GDPR, data protection, risk & compliance training for all levels",
    image: "/involved/Iv5.jpg",
    id: "cyber" as const,
  },
  {
    title: "Volunteer",
    description: "Support the event team, guests, speakers, and community activities",
    image: "/involved/volunteer.jpeg",
    id: "volunteer" as const,
  },
];

export default function GetInvolvedSection() {
  const { openModal } = useSiteModal();

  return (
    <section className="w-full bg-[#FAF8F3]">
      <div className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:px-12 lg:py-24 xl:px-[78px] xl:py-[88px]">
        <div className="max-w-[860px]">
          <p className="mb-5 font-open text-[14px] font-semibold uppercase tracking-[0.28em] text-[#D7263D] sm:mb-6">
            TAKE ACTION
          </p>
          <h2 className="text-[35px] font-medium uppercase leading-[0.95] tracking-[-0.03em] text-[#001F3F] sm:text-[40px] md:text-[45px]">
            Get Involved
          </h2>
          <p className="mt-5 font-open max-w-[760px] text-[16px] leading-[1.6] text-[#444444] sm:text-[18px]">
            Six ways to be part of the South Yorkshire Black Tech Expo ecosystem.
          </p>
        </div>

<div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:mt-16 xl:grid-cols-6 xl:gap-5">
          {involvementCards.map((card) => (
            /* 2. Changed Link to a button and added onClick */
            <button
              key={card.id}
              onClick={() => openModal(card.id)}
              className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-[#DADDE2] bg-[#F3F3F2] text-left transition duration-200 hover:-translate-y-1 focus:outline-none"
            >
              <div className="flex flex-1 flex-col items-center px-6 pb-0 pt-8 text-center sm:px-7 sm:pt-9">
                <h3 className="max-w-[230px] text-[16px] font-semibold leading-[1.35] tracking-[-0.02em] text-[#001F3F] sm:text-[18px]">
                  {card.title}
                </h3>
                <p className="mt-4 max-w-[250px] font-open text-[14px] leading-[1.5] text-[#6B6B6B]">
                  {card.description}
                </p>
              </div>

              <div className="mt-8 px-0">
                <div className="relative h-[175px] w-full overflow-hidden rounded-t-[18px] sm:h-[180px] xl:h-[150px]">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}