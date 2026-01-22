import RegisterForm from "@/features/auth/components/register-form";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex flex-col gap-4 min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <RegisterForm />
      <p className="text-sm text-zinc-500">Already have an account? <Link href="/login" className="text-blue-500 hover:text-blue-600">Login</Link></p>
    </div>
  );
}