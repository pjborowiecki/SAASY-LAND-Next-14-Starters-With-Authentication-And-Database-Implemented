"use server"

import crypto from "crypto"
import { db } from "@/db"
import { users } from "@/db/schemas/auth.schema"
import { env } from "@/env.mjs"
import { eq } from "drizzle-orm"
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
  return await resend.emails.send(payload, options)
}

export async function resendEmailVerificationLinkAction(email: string) {
  const user = await getUserByEmailAction(email).then((res) => res[0])
  if (!user) return "not-found"

  const emailVerificationToken = crypto.randomBytes(32).toString("base64url")

  const userUpdatedResponse = await db
    .update(users)
    .set({ emailVerificationToken })
    .where(eq(users.email, email))

  const emailSent = await sendEmailAction({
    from: env.RESEND_EMAIL_FROM,
    to: [email],
    subject: "Verify your email address",
    react: EmailVerificationEmail({ email, emailVerificationToken }),
  })

  if (!userUpdatedResponse || !emailSent) return null

  return "success"
}

export async function checkIfEmailVerifiedAction(email: string) {
  const user = await getUserByEmailAction(email).then((res) => res[0])
  if (user?.emailVerified instanceof Date) {
    return true
  } else {
    return false
  }
}
