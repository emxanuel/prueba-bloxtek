"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authService } from "@/api/services/auth.service";
import { useAuthStore } from "@/stores/auth.store";
import { useState } from "react";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/features/schemas/login.schema";


export default function LoginForm() {
  const [loading, setLoading] = useState(false)
  const { setUser, setToken } = useAuthStore();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setError(null);
    setLoading(true);
    const response = await authService.login(data.email, data.password);
    if ("error" in response) {
      setError(response.error);
      setLoading(false);
    } else {
      setUser(response.user);
      setToken(response.token);
      setLoading(false);
      router.push("/");
    }
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-1">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <input 
          {...register("email")}
          id="email"
          type="email" 
          placeholder="you@example.com" 
          className={
            cn(
              "w-full px-4 py-3 rounded-lg border transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
              "placeholder:text-gray-400 text-gray-900",
              errors.email 
                ? "border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500" 
                : "border-gray-300 bg-white hover:border-gray-400",
            )
          }  
        />
        {errors.email && (
          <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
            <span>•</span>
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input 
          {...register("password")}
          id="password"
          type="password" 
          placeholder="Enter your password" 
          className={
            cn(
              "w-full px-4 py-3 rounded-lg border transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
              "placeholder:text-gray-400 text-gray-900",
              errors.password 
                ? "border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500" 
                : "border-gray-300 bg-white hover:border-gray-400",
            )
          }  
        />
        {errors.password && (
          <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
            <span>•</span>
            {errors.password.message}
          </p>
        )}
      </div>

      <button 
        type="submit" 
        disabled={loading} 
        className={
          cn(
            "w-full py-3 px-4 rounded-lg font-semibold text-white",
            "bg-linear-to-r from-indigo-600 to-indigo-700",
            "hover:from-indigo-700 hover:to-indigo-800",
            "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
            "transition-all duration-200 shadow-md hover:shadow-lg",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md",
            loading && "opacity-50 cursor-not-allowed",
          )
        }
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Signing in...
          </span>
        ) : (
          "Sign in"
        )}
      </button>
      {error && (
        <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
          <span>•</span>
          {error}
        </p>
      )}
    </form>
  );
}
