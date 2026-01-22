"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authService } from "@/api/services/auth.service";
import { useAuthStore } from "@/stores/auth.store";
import { useState } from "react";
import { cn } from "@/utils/cn";

const loginSchema = z.object({
  email: z.email({
    message: "Email is required",
  }),
  password: z.string({
    message: "Password is required",
  }).min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export default function LoginForm() {
  const [loading, setLoading] = useState(false)
  const { setUser, setToken } = useAuthStore();

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setLoading(true);
    const response = await authService.login(data.email, data.password);
    setUser(response.user);
    setToken(response.token);
    setLoading(false);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <input 
        {...register("email")}
        type="email" 
        placeholder="Email" 
        className={
          cn(
            "p-2 rounded-md border border-zinc-300",
            errors.email && "border-red-500",
          )
        }  
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <input 
        {...register("password")}
        type="password" 
        placeholder="Password" 
        className={
          cn(
            "p-2 rounded-md border border-zinc-300",
            errors.password && "border-red-500",
          )
        }  
      />
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}

      <button 
        type="submit" 
        disabled={loading} 
        className={
          cn(
            "p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 cursor-pointer",
            loading && "opacity-50 cursor-not-allowed",
          )
        }
      >
        {loading ? "Loading..." : "Login"}
      </button>
    </form>
  );
}
