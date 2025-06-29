import { z } from "zod";
import { loginSchema } from "./login";

export const GradeEnum = z.enum(["third_secondary"]);
export type Grade = z.infer<typeof GradeEnum>;

export const GenderEnum = z.enum(["male", "female", "other"]);
export type Gender = z.infer<typeof GenderEnum>;

export const registerSchema = loginSchema.extend({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  confirmPassword: z.string(),
  birthdate: z.string().min(1, { message: "Birthdate is required" }), // ISO string, validated in UI
  grade: GradeEnum,
  gender: GenderEnum,
  phone: z.string().min(8, { message: "Phone must be at least 8 digits" }).optional().or(z.literal("")),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type RegisterSchema = z.infer<typeof registerSchema>; 