import nodemailer from "nodemailer";

export const mailer = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICE,
  auth: {
    user: process.env.NODEMAILER_SENDER_EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD
  }
});