import { z } from "zod";

export const registerSchema = z.object({
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