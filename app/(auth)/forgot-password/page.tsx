"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { ForgotPasswordSchema } from "@/schemas"; // Import the new schema

import { useState, useTransition } from "react";
import { authClient } from "@/lib/auth-client";
import { APIError } from "better-auth/api";
import { FormStatus } from "@/components/form_status";
import Link from "next/link";
import { Loader2 } from "lucide-react"; // Example loading icon

export default function ForgotPassword() {
  const [isPending, startTransition] = useTransition();
  const [formStatus, setFormStatus] = useState({ message: "", isError: false });

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const { formState } = form; 
  const onSubmit = (input: z.infer<typeof ForgotPasswordSchema>) => {
    const validated = ForgotPasswordSchema.safeParse(input);
    if (!validated.success) {
      setFormStatus({ message: validated.error.message ?? "Something went wrong", isError: true });
      return;
    }

    setFormStatus({ message: "", isError: false });

    startTransition(async () => {
      try {
        await authClient.forgetPassword({
          email: input.email,
          redirectTo: "/reset-password",
        }, {
          onSuccess: () => {
            setFormStatus({
              message: "If an account with that email exists, a password reset link has been sent to your inbox. Please check your email.",
              isError: false,
            });
            form.reset(); // Clear the form after successful request
          },
          onError: (ctx) => {
            setFormStatus({
              message: ctx.error.message || "Failed to send password reset email. Please try again.",
              isError: true,
            });
            console.error("Forgot Password API Error: ", ctx.error.message, ctx.error.status);
          },
        });
      } catch (error) {
        if (error instanceof APIError) {
          console.error("During forgot password there was an API Error: ", error.message, error.status);
          setFormStatus({
            message: error.message || "An API error occurred. Please try again.",
            isError: true,
          });
        } else {
          console.error("During forgot password there was an unexpected error: ", error);
          setFormStatus({
            message: "An unexpected error occurred. Please try again.",
            isError: true,
          });
        }
      }
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Card className="w-100 max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Forgot Password</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
              <FormField
                disabled={isPending}
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" type="email" autoComplete="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormStatus message={formStatus.message} isError={formStatus.isError} />

              <Button type="submit" className="w-full" disabled={isPending || !formState.isValid}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center">
          <h3 className="text-sm flex gap-1">
            <p>Remember your password? </p>
            <Link href={'/signin'} className="text-blue-400 font-medium">
              Login
            </Link>
          </h3>
        </CardFooter>
      </Card>
    </main>
  );
}