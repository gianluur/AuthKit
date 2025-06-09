"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox";

import { SignInSchema } from "@/schemas";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import { useState, useTransition } from "react";
import { FormStatus } from "@/components/form_status";

import { APIError }  from "better-auth/api";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { SocialWrapper } from "@/components/socials_wrapper";
import { Loader2 } from "lucide-react";
import { LuEye, LuEyeOff } from "react-icons/lu";

export default function Login() {
  const [isPending, startTransition] = useTransition();
  const [formStatus, setFormStatus] = useState({message: "", isError: false});
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    },
    mode: "onChange"
  })

  const { formState } = form;

  const onSubmit = (input: z.infer<typeof SignInSchema>) => {
    const validatedInput = SignInSchema.safeParse(input);
    if (!validatedInput.success) {
      setFormStatus({message: validatedInput.error.message ?? "Something went wrong", isError: true});
      return;
    }

    startTransition(async () => {
      try {
        await authClient.signIn.email({
          ...validatedInput.data,
          callbackURL: "/profile"
        }, 
        {
          onSuccess: () => {
            setFormStatus({ message: "Logged in successfully! Redirecting...", isError: false });
          },
          
          onError: (ctx) => {
            if (ctx.error.status === 403){
              setFormStatus({message: "Please verify your email address before logging in", isError: true});
            }
            else {
              setFormStatus({message: ctx.error.message ?? "Something went wrong", isError: true});
            }
          }
        })
      }
      catch (error){
        if (error instanceof APIError){
          console.error("During login there was an API Error: ", error.message, error.status);
        }
        else {
          console.error("During login there was an unexpected error: ", error);
        }
      }
    })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Card className="w-100">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Sign in</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
              <FormField disabled={isPending} control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@example.com" type="email" autoComplete="email" autoFocus {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>

              <FormField
                disabled={isPending}
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                    <div className="relative">
                      <Input placeholder="•••••••••" type={showPassword ? "text" : "password"} {...field}/>
                      <button 
                        type="button" 
                        onMouseDown={(e) => e.preventDefault()} // Prevent focus loss
                        onClick={() => {setShowPassword(prev => !prev)}} 
                        aria-label="Toggle password confirmation visibility"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer h-9"
                      >
                        {showPassword ? <LuEye/> : <LuEyeOff/>}
                      </button>
                    </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex items-center justify-between">
                <FormField control={form.control} name="rememberMe" render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} name="remember-me" id="remember-me"/>
                      </FormControl>
                      <FormLabel htmlFor="remember-me" className="text-sm font-normal">
                        Remember me
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <Link href="/forgot-password">
                  <p className="text-sm text-blue-400 font-medium">Forgot password?</p>
                </Link>
              </div>
            
              <FormStatus message={formStatus.message} isError={formStatus.isError} />
              
              <Button type="submit" className="w-full " disabled={isPending || !formState.isValid}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
          <CardFooter className="flex flex-col items-center justify-center">
            <div className="w-full flex items-center gap-4">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="text-sm">Or sign-in with</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>
          <div className="flex flex-col gap-1 my-1">
            <SocialWrapper/>
          </div>
          <h3 className="text-sm mt-1 flex gap-1">
            <p>Don&apos;t have an account? </p>
            <Link href={'/signup'} className="text-blue-400 font-medium"> 
              Signup
            </Link>
          </h3>
        </CardFooter>
      </Card>
    </main>
  );
}