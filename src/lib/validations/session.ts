import * as z from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string().optional().nullable(),
  email: z.string().email().optional().nullable(),
  role: z.enum(["guest", "user", "moderator", "admin"]).optional(),
  token: z.string().optional(),
  accessTokenExpires: z.number().optional(),
});

export const sessionSchema = z.object({
  user: userSchema.optional(),
});

export type SafeUser = z.infer<typeof userSchema>;
export type SafeSession = z.infer<typeof sessionSchema>;
