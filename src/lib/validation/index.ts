import { z } from "zod";

export const SignUpValidation = z.object({
  name: z.string().min(1, {message: "Name must not be empty"}),
  username: z.string().min(1, {message: "Username must not be empty"}),
  email: z.string().email(),
  password: z.string().min(8, {message: "Password must be 8 characters long"})
});

export const SignInValidation = z.object({
  username: z.string().min(1, {message: "Username must not be empty"}),
  password: z.string().min(8, {message: "Password must be 8 characters long"})
})