import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";

import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/prisma/prisma";
import { mailer } from "./email-service";
 
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({user, url, token}) => {
      await mailer.sendMail({
        from: "Authkit <gianluca.rssu@gmail.com>",
        to: user.email,
        subject: "Password Reset Request",
        html: 
          `
          <h1>Hello there</h1>
          <p>We received a request to reset the password for your AuthKit account.</p>
          <p>Please click the link below to set a new password:</p>
          <p><a href="${url}?token=${token}">Reset Password</a></p>
          <p>This link will expire in 1 hour.</p>
          <p>If you did not request a password reset, you can safely ignore this email.</p>
          `
      })
    }
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }) => {
      await mailer.sendMail({
        from: "Authkit <gianluca.rssu@gmail.com>",
        to: user.email,
        subject: "Confirm Your Email Address to Complete Registration",
        html: 
          `
          <h1>Hello ${user.name || 'there'},</h1>
          <p>Thank you for signing up with AuthKit!</p>
          <p>To complete your registration and start using your account, please verify your email address by clicking the button below:</p>
          <p><a href="${url}?token=${token}">Verify Email Address</a></p>
          <p>If the button above doesn't work, you can also copy and paste the following link into your browser:</p>
          <p>${url}?token=${token}</p>
          <p>This link will expire in ${1} hours for security reasons.</p>
          <p>If you did not create an account, no further action is required.</p>
          <p>Best regards</p>
          <p>The AuthKit Team</p>
          <p>gianluca.rssu@gmail.com</p>
          `
      });
    },
    autoSignInAfterVerification: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      redirectURI: process.env.GOOGLE_REDIRECT_URI as string, 
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      redirectURI: process.env.GITHUB_REDIRECT_URI as string,
    }
  },
  plugins: [
    nextCookies(),
  ],
  secret: process.env.BETTER_AUTH_SECRET
});