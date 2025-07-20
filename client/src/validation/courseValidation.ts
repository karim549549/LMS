import { z } from "zod";

export const courseInfoSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(100, "Title must be less than 100 characters"),
  description: z.string().min(2, "Description must be at least 2 characters").max(1000, "Description must be less than 1000 characters"),
  grade: z.string().min(1, "Please select a grade"),
  price: z.number().min(0, "Price must be 0 or greater"),
});

export type CourseInfoFormData = z.infer<typeof courseInfoSchema>; 