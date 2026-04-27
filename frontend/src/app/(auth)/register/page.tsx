import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <RegisterForm />
    </main>
  );
}