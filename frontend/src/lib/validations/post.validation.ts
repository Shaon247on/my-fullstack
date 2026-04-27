import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  isPublished: z.boolean().optional(),
});

export type PostFormValues = z.infer<typeof postSchema>;