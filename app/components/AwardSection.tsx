"use client";

import Image from "next/image";

import { useSiteModal } from "./site/modal-context";

const trainings = [
  {
    src: "/awards/cyber-training.jpeg",
    alt: "Cybersecurity Training",
    position: "object-top",
  },
  {
    src: "/awards/Ai-Training.jpeg",
    alt: "AI Training",
    position: "object-contain",
  },
  {
    src: "/awards/ai-business-training.jpg",
    alt: "Business Leaders Masterclass",
    position: "object-left",
  },
];

export default function AwardsSection() {
  const { openModal } = useSiteModal();

  return (
    <section className="w-full bg-[#0D1B3E]">
      <div className="mx-auto max-w-[1600px] px-0 py-14 sm:py-16 md:py-20 lg:py-24 xl:py-[92px]">
        <div className="mx-auto max-w-[1100px] px-5 text-center sm:px-8">
          <p className="mb-6 text-[13px] font-semibold uppercase tracking-[0.35em] text-[#FFD700]">
            RECOGNITION
          </p>

          <h2 className="text-[32px] font-medium uppercase leading-[1.22] tracking-[0.08em] text-white sm:text-[42px] md:text-[52px] lg:text-[58px] xl:text-[60px]">
            <span className="block">SOUTH YORKSHIRE BLACK</span>
            <span className="block">
              TECH EXPO <span className="text-[#FFD700]">TRAININGS</span>
            </span>
          </h2>
        </div>

        <div className="mt-14 w-full px-5 sm:px-8 md:px-0">
          <div className="mx-auto bg-transparent md:w-fit md:bg-white md:p-5">
            <div className="flex flex-col items-center gap-5 md:w-max md:flex-row md:items-start">
              {trainings.map((item) => (
                <div
                  key={item.src}
                  className="relative aspect-[415/450] w-full max-w-[415px] overflow-hidden bg-black md:h-[450px] md:w-[415px]"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className={`object-cover ${item.position}`}
                    sizes="(max-width: 768px) 90vw, 415px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-14 flex justify-center px-5">
          <button
            onClick={() => openModal("join")}
            className="inline-flex h-[70px] min-w-[252px] items-center justify-center rounded-[14px] bg-[#FFD700] px-10 text-[20px] font-medium text-[#0D1B3E] transition duration-200 hover:opacity-90"
          >
            Attend Event
          </button>
        </div>
      </div>
    </section>
  );
}