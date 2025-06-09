"use client";

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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import { ResetPasswordSchema } from "@/schemas";

import { useState, useTransition } from "react";
import { authClient } from "@/lib/auth-client";
import { APIError } from "better-auth/api";
import { FormStatus } from "@/components/form_status";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import PasswordStrength from "@/components/password_strength";
import { Loader2 } from "lucide-react";

export default function ResetPassword() {
  const [isPending, startTransition] = useTransition();
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formStatus, setFormStatus] = useState({message: "", isError: false})
  const token = useSearchParams().get("token");
  const router = useRouter();
  
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      newPassword: "",
    },
  });

  const { formState } = form;

  const watchedPassword = form.watch("newPassword");
  
  const onSubmit = (input: z.infer<typeof ResetPasswordSchema>) => {
    const validated = ResetPasswordSchema.safeParse(input);
    if (!validated.success){
      setFormStatus({message: validated.error.message ?? "Something went wrong", isError: true});
      return;
    }
 
    startTransition(async () => {
      try {
        await authClient.resetPassword({
          newPassword: validated.data.newPassword,
          token: token ?? undefined,
        }, {
          onSuccess: () => {
            setFormStatus({ message: "Logged in successfully! Redirecting...", isError: false });
            router.push("/signin");
          },
          onError: (ctx) => {
            setFormStatus({message: ctx.error.message ?? "Something went wrong", isError: true});}
        });
      }
      catch (error) {
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
    <main className="flex flex-col justify-center items-center min-h-screen">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Reset Password</CardTitle>
        </CardHeader>
        <CardContent> 
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col justify-center item s-center gap-3">
              <FormField control={form.control} name="newPassword" render={({ field}) => (
                <FormItem>
                  <FormLabel>
                    New Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        placeholder="•••••••••" 
                        type={showPassword ? "text" : "password"} 
                        {...field} 
                        onFocus={() => {setIsPasswordFocused(true)}} 
                        onBlur={() => {setIsPasswordFocused(false)}}
                        onCopy={(e) => {if (!showPassword) e.preventDefault()}}
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
                  <FormStatus message={formStatus.message} isError={formStatus.isError}/>
                </FormItem>
              )}>
              </FormField>
              <Button type="submit" disabled={isPending || !formState.isValid}>
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
  );
}