"use server"

import crypto from "crypto"
import { prisma } from "@/db/prisma"
import { env } from "@/env.mjs"
import {
  type CreateEmailOptions,
  type CreateEmailRequestOptions,
} from "resend/build/src/emails/interfaces"

import { resend } from "@/config/email"
import { EmailVerificationEmail } from "@/components/emails/email-verification-email"

import { getUserByEmailAction } from "./user"

export async function sendEmailAction(
  payload: CreateEmailOptions,
  options?: CreateEmailRequestOptions | undefined
) {
  const data = await resend.emails.send(payload, options)
  console.log("Email sent successfully")
  return data
}

export async function resendEmailVerificationLinkAction(email: string) {
  const user = await getUserByEmailAction(email)
  if (!user) {
    return "not-found"
  }
  const emailVerificationToken = crypto.randomBytes(32).toString("base64url")
  const updatedUser = await prisma.user.update({
    where: {
      email,
    },
    data: {
      emailVerificationToken,
    },
  })
  const emailSent = await sendEmailAction({
    from: env.RESEND_EMAIL_FROM,
    to: [email],
    subject: "Verify your email address",
    react: EmailVerificationEmail({ email, emailVerificationToken }),
  })
  if (!updatedUser || !emailSent) {
    return null
  }
  return "success"
}

export async function checkIfEmailVerifiedAction(email: string) {
  const user = await getUserByEmailAction(email)
  if (user?.emailVerified instanceof Date) {
    return true
  } else {
    return false
  }
}
