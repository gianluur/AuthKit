import * as z from "zod";

export const SignupCredentialsSchema = z.object({
  name: z.string().min(2).max(30),
  email: z.string().email(),
  password: z.string().min(3),
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

export const LoginSchema = z.object({
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
  newPassword: z.string().min(3)
})