import { getPasswordStrength } from "@/lib/utils";
import * as z from "zod";

const passwordValidation = z.string()
  .superRefine((password, ctx) => {
    // Re-use the getPasswordStrength logic here for validation
    const strength = getPasswordStrength(password);

    // If the calculated strength is 3 or less, add an issue
    if (strength <= 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password is too weak. It must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol.",
        path: ["password"], // Adjust path in specific schema if needed (e.g., ["newPassword"])
      });
    }
  });

export const SignupCredentialsSchema = z.object({
  name: z.string().min(2).max(30),
  email: z.string().email(),
  password: passwordValidation,
  passwordConfirm: z.string()
}).refine((data) => {
  return data.password === data.passwordConfirm
}, {
  message: "Passwords don't match",
  path: ["passwordConfirm"]
});

export const SignupUserInfoSchema = z.object({
  surname: z.string().min(2).max(30),
  username: z.string().min(2).max(30),
  image: z.string().url()
})

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  rememberMe: z.boolean().optional()
});

export const ChangePasswordSchema = z.object({
  oldPassword: z.string().min(3),
  newPassword: z.string().min(3),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email()
});

export const ResetPasswordSchema = z.object({
  newPassword: passwordValidation
})