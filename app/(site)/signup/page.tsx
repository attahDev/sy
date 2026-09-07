import SignupForm from "@/components/auth/SignupForm";

export const metadata = {
  title: "Sign up",
};

export default function SignupPage() {
  return (
    <section className="flex flex-1 items-center justify-center bg-[#FFFDF7] px-4 py-16">
      <SignupForm />
    </section>
  );
}
