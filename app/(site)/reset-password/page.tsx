import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata = {
  title: "Reset password",
};

export default function ResetPasswordPage() {
  return (
    <section className="flex flex-1 items-center justify-center bg-[#FFFDF7] px-4 py-16">
      <ForgotPasswordForm />
    </section>
  );
}
