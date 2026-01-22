import LoginForm from "@/features/auth/components/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-4 min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <LoginForm />
      <p className="text-sm text-zinc-500">Don&apos;t have an account? <Link href="/register" className="text-blue-500 hover:text-blue-600">Create one</Link></p>
    </div>
  );
}