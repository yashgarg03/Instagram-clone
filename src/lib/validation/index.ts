import { z } from "zod";

export const SignUpValidation = z.object({
  name: z.string().min(1, {message: "Name must not be empty"}),
  username: z.string().min(1, {message: "Username must not be empty"}),
  email: z.string().email(),
  password: z.string().min(8, {message: "Password must be 8 characters long"})
});

export const SignInValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, {message: "Password must be 8 characters long"})
})

export const PostValidation = z.object({
  caption: z.string().min(5, {message: "Please enter atleast 5 characters"}).max(2200),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(100),
  tags: z.string()
});
