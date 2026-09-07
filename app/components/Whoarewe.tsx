"use client";

const audience = [
  { label: "Students", className: "bg-[#0D1B3E] text-[#FFFFFF]" },
  { label: "Founders", className: "bg-[#D7263D] text-[#FFFFFF]" },
  { label: "Professionals", className: "bg-[#E17100] text-[#FFFFFF]" },
  { label: "Organization", className: "bg-[#F5A623] text-[#FFFFFF]" },
  { label: "Local Authorities", className: "bg-[#1A2F5E] text-[#FFFFFF]" },
];

export default function WhoWeAreSection() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8 md:px-10 lg:px-14 xl:px-[78px] xl:py-[92px]">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center xl:gap-[86px]">
          {/* Left content */}
          <div className="max-w-[760px]">
            <p className="mb-6 font-open text-[14px] font-semibold uppercase tracking-[0.34em] text-[#D7263D]">
              Who We Are
            </p>

            <h2 className="font-beb text-[48px] font-medium uppercase leading-[1.03] tracking-[0.04em] text-[#101E44] sm:text-[60px] md:text-[70px] lg:text-[72px] xl:text-[78px]">
              <span className="block">Innovation</span>
              <span className="block">Infrastructure</span>
            </h2>

            <div className="mt-8 space-y-8">
              <p className="max-w-[760px] font-open text-[18px] leading-[1.75] text-[#555555] md:text-[20px]">
                South Yorkshire Black Tech Expo is a regional gateway into the
                Black Tech Expo Global Platform connecting talent, enterprise,
                and opportunity across innovation, business, and community
                impact.
              </p>

              <p className="max-w-[850px] font-open text-[18px] leading-[1.75] text-[#555555] md:text-[20px]">
                We are not just an event. We are a movement building an
                ecosystem where professionals, founders, and communities access
                the tools, networks, and stages they deserve.
              </p>
            </div>
          </div>

          {/* Right content */}
          <div className="mt-2 lg:mt-0 lg:pt-[150px] xl:pt-[165px]">
            <h3 className="mb-6 text-[24px] font-semibold uppercase leading-[1.1] tracking-[0.04em] text-[#101E44] sm:text-[30px] md:text-[38px] lg:text-[44px]">
              Who is this for?
            </h3>

            <div className="flex max-w-[720px] font-dm flex-wrap gap-3 sm:gap-4 lg:gap-5">
              {audience.map((item) => (
                <div
                  key={item.label}
                  className={`${item.className} flex h-[50px] items-center justify-center rounded-[16px] px-5 text-center font-open text-[14px] font-medium sm:h-[58px] sm:rounded-[18px] sm:px-7 sm:text-[16px] md:h-[64px] md:px-10 md:text-[18px]`}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}