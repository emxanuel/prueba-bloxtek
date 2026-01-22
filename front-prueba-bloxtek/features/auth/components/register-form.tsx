"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authService } from "@/api/services/auth.service";
import { useAuthStore } from "@/stores/auth.store";
import { useState } from "react";
import { cn } from "@/utils/cn";

const registerSchema = z.object({
  name: z.string({
    message: "Name is required",
  }).min(3, {
    message: "Name must be at least 3 characters long",
  }),
  email: z.email({ message: "Invalid email" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters long" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function RegisterForm() {
  const [loading, setLoading] = useState(false)
  const { setUser, setToken } = useAuthStore();

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    setLoading(true);
    const response = await authService.register(data.name, data.email, data.password);
    setUser(response.user);
    setToken(response.token);
    setLoading(false);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <input 
        {...register("name")}
        type="text"
        placeholder="Name"
        className={
          cn(
            "p-2 rounded-md border border-zinc-300",
            errors.name && "border-red-500",
          )
        }  
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

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
      
      <input 
        {...register("confirmPassword")}
        type="password" 
        placeholder="Confirm Password" 
        className={
          cn(
            "p-2 rounded-md border border-zinc-300",
            errors.confirmPassword && "border-red-500",
          )
        }  
      />
      {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}


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
        {loading ? "Loading..." : "Register"}
      </button>
    </form>
  );
}
