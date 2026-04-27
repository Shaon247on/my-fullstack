import { z } from "zod";

export const createPostValidationSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    content: z.string().min(10, "Content must be at least 10 characters"),
    isPublished: z.boolean().optional(),
  }),
});

export const updatePostValidationSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters").optional(),
    content: z
      .string()
      .min(10, "Content must be at least 10 characters")
      .optional(),
    isPublished: z.boolean().optional(),
  }),
});