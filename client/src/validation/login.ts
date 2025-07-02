import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export type EmailSchema = z.infer<typeof emailSchema>;

export const loginSchema = emailSchema.extend({
  password: z
    .string()
    .min(2, { message: "Password must be at least 2 characters" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, { message: "OTP must be 6 digits" })
    .regex(/^\d{6}$/, { message: "OTP must be 6 digits" }),
});

export type OtpSchema = z.infer<typeof otpSchema>;

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(2, { message: "Password must be at least 2 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
