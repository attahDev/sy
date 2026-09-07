import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Sign in",
};

export default function LoginPage() {
  return (
    <section className="flex flex-1 items-center justify-center bg-[#FFFDF7] px-4 py-16">
      <LoginForm />
    </section>
  );
}
