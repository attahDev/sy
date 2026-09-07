"use client";

import { useSiteModal } from "./site/modal-context";

const ctaBase =
  "inline-flex w-full items-center justify-center rounded-[14px] transition duration-200";

export default function HeroSection() {
  const { openModal } = useSiteModal();

  return (
    <section className="relative min-h-screen w-full overflow-hidden  ">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/Hero/herosection.jpg')",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(0, 31, 63, 0.95) 0%, rgba(0, 31, 63, 0.9) 50%, rgba(0, 31, 63, 0.8) 100%)",
        }}
      />

      <div className="absolute inset-0 bg-[#001f3f]/20" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col items-center px-4 pb-8 pt-[85px] text-center sm:px-6 sm:pb-10 sm:pt-[124px] md:px-8 md:pt-[126px] lg:px-10 lg:pt-[100px] xl:px-12">
        <div className="mb-2 inline-flex items-center rounded-full border-[0.67px] border-[#F5A62366] bg-[#F5A62326] px-4 py-2 backdrop-blur-sm sm:mb-8 sm:px-5 sm:py-2.5 md:mb-10 md:px-6 md:py-3">
          <span className=" font-open text-[11px] font-semibold uppercase tracking-[0.04em] text-[#FFD700] sm:text-[12px] md:text-[14px]">
            SHEFFIELD 
          </span>
        </div>

        <div className="mx-auto flex w-full max-w-[1180px] mb-6 flex-col items-center">
          <h1 className="text-center font-semibold uppercase leading-[0.9] text-[#FFFFFF]">
            <span className="block text-[42px] xs:text-[48px] sm:text-[66px] md:text-[88px] lg:text-[120px] xl:text-[120px]">
              SOUTH
            </span>

            <span className="mt-2 block text-[42px] xs:text-[48px] sm:text-[66px] md:text-[88px] lg:text-[120px] xl:text-[120px]">
              <span className="text-[#E8440A]">YORK</span>
              <span className="text-[#FFD700]">SHIRE</span>
            </span>

            <span className="mt-2 text-[#FFFFFF] block text-[42px] xs:text-[48px] sm:text-[66px] md:text-[88px] lg:text-[120px] xl:text-[120px]">
              BLACK TECH
            </span>

            <span className="mt-2 text-[#FFFFFF] block text-[42px] xs:text-[48px] sm:text-[66px] md:text-[88px] lg:text-[120px] xl:text-[120px]">
              EXPO
            </span>
          </h1>
        </div>

        <div className="mt-6 space-y-2 px-2 text-center sm:mt-2 sm:space-y-3">
          <p className="text-[16px] font-open font-normal leading-relaxed text-white/80 sm:text-[15px] md:text-[18px]">
          Sheffield Technology Park Cooper Buildings. <br className="hidden sm:block" />
          St Sheffield City Centre, Sheffield S12NS
          </p>

          {/* <p className="text-[20px] font-open font-semibold text-[#FFD700] sm:text-[24px] md:text-[28px]">
            10:00 AM – 2:00 PM
          </p> */}

          <p className="break-all font-open text-[13px] font-normal text-[#FFFFFF80] sm:break-normal sm:text-[15px] md:text-[18px]">
            info@gmblacktechexpo.co.uk
          </p>
        </div>

        <div className="mt-6 max-w-[1100px] px-2 sm:mt-4 md:mt-7">
          <p className="text-center text-[13px] font-semibold uppercase leading-[1.5] tracking-[0.12em] text-white/50 sm:text-[16px] md:text-[20px] lg:text-[26px]">
            POWERED BY COMMUNITY · DRIVEN BY INNOVATION
          </p>
        </div>

        <div className="mt-8 grid w-full max-w-[1400px] grid-cols-1 gap-3 sm:mt-6 sm:gap-6 md:grid-cols-2 lg:mt-10 lg:grid-cols-[auto_auto_auto_auto_auto] lg:justify-center lg:gap-5">
          <button
          onClick={() => openModal("join")}
            // href="#join"
            className={`${ctaBase} h-[40px] px-6 text-[14px] font-semibold text-[#0D1B3E] bg-[#FFD700] hover:opacity-90 sm:h-[54px] sm:px-8 sm:text-[16px] lg:h-[56px] lg:min-w-[132px] lg:text-[16px]`}
          >
            Join Us
          </button>

          <button
            onClick={() => openModal("business")}
            className={`${ctaBase} h-[40px] border-[1.33px] border-[#FFFFFF59]  px-6 text-[15px] font-medium text-white backdrop-blur-[2px] hover:bg-white/10 sm:h-[54px] sm:px-8 sm:text-[16px] lg:h-[56px] lg:min-w-[230px] lg:text-[18px]`}
          >
            Get Business Support
          </button>

          <button
          onClick={() => openModal("speaker")}
            // href="#speaker"
            className={`${ctaBase} h-[40px] border-[1.33px] border-[#FFFFFF59]  px-6 text-[15px] font-medium text-white backdrop-blur-[2px] hover:bg-white/10 sm:h-[54px] sm:px-8 sm:text-[16px] lg:h-[56px] lg:min-w-[230px] lg:text-[18px]`}
          >
            Become a Speaker
          </button>

          <button
          onClick={() => openModal("nominate")}
            // href="#nominate"
            className={`${ctaBase} h-[40px] border-[1.33px] border-[#FFFFFF59]  px-6 text-[15px] font-medium text-white backdrop-blur-[2px] hover:bg-white/10 sm:h-[54px] sm:px-8 sm:text-[16px] lg:h-[56px] lg:min-w-[280px] lg:text-[18px]`}
          >
            Nominate a Change Maker
          </button>

          <button
          onClick={() => openModal("cyber")}
            // href="#cyber-security"
            className={`${ctaBase} h-[40px] bg-[#D7263D] px-6 text-[14px] font-semibold text-white hover:opacity-90 sm:h-[54px] sm:px-8 sm:text-[16px] lg:h-[56px] lg:min-w-[300px] lg:text-[16px]`}
          >
            Free Cyber Security Training
          </button>
        </div>
      </div>
    </section>
  );
}