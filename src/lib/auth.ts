import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import {
  PrismaClient,
  Role,
  UserStatus,
} from "./../../generated/prisma/client";
import { prisma } from "./prisma";
import nodemailer from "nodemailer"


 const transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
   port: 587,
   secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
   auth: {
     user: process.env.SMTP_USER,
     pass: process.env.SMTP_PASS,
   },
 });
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: [process.env.APP_URL!],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      console.log("verifying email");
      console.log(user, url, token);
      try {
        const verificationLink = url;

        const info = await transporter.sendMail({
          from: '"MediStore Support" <mediStore@gmail.com>',
          to: user.email,
          subject: "Verify Your MediStore Account 📧",
          text: `Welcome to MediStore! Please verify your email by clicking this link: ${verificationLink}`,
          html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 10px;">
      <div style="text-align: center;">
        <h1 style="color: #2c3e50;">Welcome to <span style="color: #27ae60;">MediStore</span></h1>
      </div>
      <p style="font-size: 16px; color: #34495e;">Hello ${user.name},</p>
      <p style="font-size: 16px; color: #34495e;">
        Thank you for joining MediStore! We're excited to have you. To start shopping or selling medicines, please verify your email address.
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${verificationLink}" 
           style="background-color: #27ae60; color: white; padding: 12px 25px; text-decoration: none; font-size: 18px; border-radius: 5px; font-weight: bold;">
          Verify Email Address
        </a>
      </div>
      <p style="font-size: 14px; color: #7f8c8d;">
        If the button above doesn't work, copy and paste this link into your browser: <br>
        <a href="${verificationLink}" style="color: #2980b9;">${verificationLink}</a>
      </p>
      <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
      <p style="font-size: 12px; color: #95a5a6; text-align: center;">
        If you didn't create an account with MediStore, you can safely ignore this email.
      </p>
    </div>
  `,
        });

        console.log("Message sent: %s", info.messageId);
        // Preview URL is only available when using an Ethereal test account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      } catch (err) {
        console.error("Error while sending mail:", err);
      }
    },
  },
  user: {
    additionalFields: {
      roles: {
        type: "string",
        defaultValue: Role.CUSTOMER,
        required: false,
      },
      status: {
        type: "string",
        defaultValue: UserStatus.ACTIVE,
        required: false,
      },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      accessType: "offline",
      prompt: "select_account consent",
    },
  },
});
