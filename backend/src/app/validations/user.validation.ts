import z from "zod";

export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2"),
    email: z.email("Invalid Email Address"),
    password: z.string().min(6, "passworrd must be at least 6 characters"),
  }),
});
