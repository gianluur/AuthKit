"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { ChangePasswordSchema, ForgotPasswordSchema } from "@/schemas"; // Import the new schema

import { useEffect, useState, useTransition } from "react";
import { authClient } from "@/lib/auth-client";
import { APIError } from "better-auth/api";
import { FormStatus } from "@/components/form_status";
import Link from "next/link";
import { Loader2 } from "lucide-react"; // Example loading icon
import { getPasswordStrength } from "@/lib/utils";
import { LuEye, LuEyeOff } from "react-icons/lu";
import PasswordStrength from "@/components/password_strength";

export default function ChangePassword(){
  const [isPending, startTransition] = useTransition();
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formStatus, setFormStatus] = useState({message: "", isError: false});
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const { formState } = form;

  const watchedPassword = form.watch("newPassword");
  // useEffect(() => {
  //   setPasswordStrength(getPasswordStrength(watchedPassword));
  // }, [watchedPassword])

  const onSubmit = (input: z.infer<typeof ChangePasswordSchema>) => {
    const validated = ChangePasswordSchema.safeParse(input);
    if (!validated.success){
      setFormStatus({message: validated.error.message ?? "Something went wrong", isError: true});
      return;
    }


  }

  return(
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Card className="w-100">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Change Password</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
              <FormField
                disabled={isPending}
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Old Password</FormLabel>
                    <FormControl>
                    <div className="relative">
                      <Input placeholder="•••••••••" type={showOldPassword ? "text" : "password"} {...field}/>
                      <button 
                        type="button" 
                        onMouseDown={(e) => e.preventDefault()} // Prevent focus loss
                        onClick={() => {setShowOldPassword(prev => !prev)}} 
                        aria-label="Toggle password confirmation visibility"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer h-9"
                      >
                        {showOldPassword ? <LuEye/> : <LuEyeOff/>}
                      </button>
                    </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField disabled={isPending}  control={form.control} name="newPassword" render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        placeholder="•••••••••" 
                        type={showNewPassword ? "text" : "password"} 
                        {...field} 
                        onFocus={() => {setIsPasswordFocused(true)}} 
                        onBlur={() => {setIsPasswordFocused(false)}}
                        onCopy={(e) => {if (!showNewPassword) e.preventDefault()}}
                      />
                      
                      <button 
                        type="button" 
                        onClick={() => {setShowNewPassword(prev => !prev)}} 
                        aria-label="Toggle password visibility"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer h-9"
                      >
                        {showNewPassword ? <LuEye/> : <LuEyeOff/>}
                      </button>
                    </div>
                  </FormControl>
                  {isPasswordFocused && <PasswordStrength password={watchedPassword}/>}
                  <FormMessage/>
                </FormItem>
              )}/>
              <FormStatus message={formStatus.message} isError={formStatus.isError} />

              <Button type="submit" className="w-full" disabled={isPending || !formState.isValid}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Change Password"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  )
}