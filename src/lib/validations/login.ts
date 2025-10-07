import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .and(z.email("Email must be a valid email")),

  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must be at most 50 characters"),

  rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
