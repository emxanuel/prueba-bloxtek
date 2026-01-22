import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({
    error: "Email is required",
  }),
  password: z.string({
    error: "Password is required",
  }).min(8, { error: "Password must be at least 8 characters long" }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;