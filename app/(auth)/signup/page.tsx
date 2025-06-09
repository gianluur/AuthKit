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
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import { SignupCredentialsSchema } from "@/schemas"
import { useState, useTransition } from "react";
import PasswordStrength from "@/components/password_strength";
import { FormStatus } from "@/components/form_status";

import { APIError }  from "better-auth/api";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { SocialWrapper } from "@/components/socials_wrapper";
import { Loader2 } from "lucide-react";

export default function Signup() {
  const [isPending, startTransition] = useTransition();
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [formStatus, setFormStatus] = useState({message: "", isError: false});

  const form = useForm<z.infer<typeof SignupCredentialsSchema>>({
    resolver: zodResolver(SignupCredentialsSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const { formState } = form;
  const watchedPassword = form.watch("password");

  const onSubmit = (input: z.infer<typeof SignupCredentialsSchema>) => {    
    const validatedInput = SignupCredentialsSchema.safeParse(input);
    if (!validatedInput.success) {
      setFormStatus({message: validatedInput.error.message ?? "Something went wrong", isError: true});
      return;
    }

    startTransition(async () => {
      try {
        await authClient.signUp.email({
          ...validatedInput.data,
          callbackURL: "/profile"
        },
        {
          onSuccess: () => {
            setFormStatus({message: "Verification email sent! Please check your inbox", isError: false});
          },
          
          onError: (ctx) => {
            setFormStatus({message: ctx.error.message ?? "Something went wrong", isError: true});
          }
        }
      )
      }
      catch (error){
        if (error instanceof APIError){
          console.error("During signup there was an API Error: ", error.message, error.status);
        }
        else {
          console.error("During signup there was an unexpected error: ", error);
        }
      }
    })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Card className="w-100">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Create an account</CardTitle>
        </CardHeader>
        <CardContent >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
              <FormField disabled={isPending} control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" type="text" autoComplete="name" autoFocus {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>

              <FormField disabled={isPending} control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@example.com" type="email" autoComplete="email" {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>

              <FormField disabled={isPending} control={form.control} name="password" render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        placeholder="•••••••••" 
                        type={showPassword ? "text" : "password"} 
                        {...field} 
                        onFocus={() => {setIsPasswordFocused(true)}} 
                        onBlur={() => {setIsPasswordFocused(false)}}
                        onCopy={(e) => {if (!showPassword) e.preventDefault()}}
                        id="password"
                      />
                      
                      <button 
                        type="button" 
                        onClick={() => {setShowPassword(prev => !prev)}} 
                        onFocus={() => {setIsPasswordFocused(true)}}
                        aria-label="Toggle password visibility"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer h-9"
                      >
                        {showPassword ? <LuEye/> : <LuEyeOff/>}
                      </button>
                    </div>
                  </FormControl>
                  {isPasswordFocused && <PasswordStrength password={watchedPassword}/>}
                  <FormMessage/>
                </FormItem>
              )}/>

              <FormField disabled={isPending} control={form.control} name="passwordConfirm" render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input placeholder="•••••••••" type={showPasswordConfirm ? "text" : "password"} {...field}/>
                      <button 
                        type="button" 
                        onMouseDown={(e) => e.preventDefault()} // Prevent focus loss
                        onClick={() => {setShowPasswordConfirm(prev => !prev)}} 
                        aria-label="Toggle password confirmation visibility"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer h-9"
                        id="confirmPassword"
                      >
                        {showPasswordConfirm ? <LuEye/> : <LuEyeOff/>}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>

              <FormStatus message={formStatus.message} isError={formStatus.isError} />
              
              <Button type="submit" className="w-full" disabled={isPending || !formState.isValid}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating your account...
                  </>
                ) : (
                  "Sign up"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
          <CardFooter className="flex flex-col items-center justify-center">
            <div className="w-full flex items-center gap-4">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="text-sm font-semibold">Or</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>
          <div className="flex flex-col gap-1 my-1">
            <SocialWrapper/>
          </div>
          <h3 className="text-sm mt-1 flex gap-1">
            <p>Already have an account? </p>
            <Link href={'/signin'} className="text-blue-400 font-medium"> 
              Login 
            </Link>
          </h3>
        </CardFooter>
      </Card>
    </main>
  );
}