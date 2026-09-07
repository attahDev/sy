import OtpForm from "@/components/auth/OtpForm";

export const metadata = {
  title: "Verify email",
};

export default function VerifyOtpPage() {
  return (
    <section className="flex flex-1 items-center justify-center bg-[#FFFDF7] px-4 py-16">
      <OtpForm />
    </section>
  );
}
