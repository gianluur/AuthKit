import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getPasswordStrength = (password: string): number => {
  let strength = 0;
  const criterias = {
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSymbol: false
  }

  if (!password)
    return 0;

  criterias.minLength = password.length >= 8;
  criterias.hasUppercase = /[A-Z]/.test(password);
  criterias.hasLowercase = /[a-z]/.test(password);
  criterias.hasNumber = /[0-9]/.test(password);
  criterias.hasSymbol = /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]/.test(password);

  for (const criteria in criterias) {
    if (criterias[criteria as keyof typeof criterias]) {
      strength++;
    }
  }

  if (strength === 5)
    strength++;

  return strength;
}

// export const sendForgotPasswordEmail = async (email: string, token: string) => {
//   const resetUrl = `http://localhost:3000/reset-password?token=${token}`;

//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "gianluca.rssu@gmail.com",
//         pass: process.env.GOOGLE_APP_PASSWORD
//       }
//     });

//     const mail = {
//       from: "Authkit <gianluca.rssu@gmail.com>",
//       to: email,
//       subject: "Password Reset Request",
//       html: 
//         `
//         <h1>Hello there</h1>
//         <p>We received a request to reset the password for your AuthKit account.</p>
//         <p>Please click the link below to set a new password:</p>
//         <p><a href="${resetUrl}">Reset Password</a></p>
//         <p>This link will expire in 1 hour.</p>
//         <p>If you did not request a password reset, you can safely ignore this email.</p>
//         `
//     };

//     await transporter.sendMail(mail);
//     console.log(`Password reset email sent to ${email}`);
//   }
//   catch (error) {
//     console.error("Error sending password reset email:", error);
//   }
// }

// export const sendVerificationEmail = async (email: string, name: string, token: string) => {
//   const verificationUrl = `http://localhost:3000/verify-email?token=${token}`;

//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "gianluca.rssu@gmail.com",
//         pass: process.env.GOOGLE_APP_PASSWORD
//       }
//     });

//     const mail = {
//       from: `Hello ${name || "there!"} <gianluca.rssu@gmail.com>`,
//       to: email,
//       subject: "Confirm Your Email Address to Complete Registration",
//       html: 
//         `
//         <h1>Hello ${name || 'there'},</h1>
//         <p>Thank you for signing up with AuthKit!</p>
//         <p>To complete your registration and start using your account, please verify your email address by clicking the button below:</p>
//         <p><a href="${verificationUrl}">Verify Email Address</a></p>
//         <p>If the button above doesn't work, you can also copy and paste the following link into your browser:</p>
//         <p>${verificationUrl}</p>
//         <p>This link will expire in ${1} hours for security reasons.</p>
//         <p>If you did not create an account, no further action is required.</p>
//         <p>Best regards</p>
//         <p>The AuthKit Team</p>
//         <p>gianluca.rssu@gmail.com</p>
//         `
//     };

//     await transporter.sendMail(mail);
//     console.log(`Verification email sent to ${email}`);
//   }
//   catch (error) {
//     console.error("Error sending verification email:", error);
//   }
// }