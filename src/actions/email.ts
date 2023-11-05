"use server"

import crypto from "crypto"
import { getUserByEmail } from "@/actions/user"
import { prisma } from "@/db"
import { env } from "@/env.mjs"
import { type User } from "@prisma/client"
import {
  type CreateEmailOptions,
  type CreateEmailRequestOptions,
} from "resend/build/src/emails/interfaces"

import { resend } from "@/config/email"
import { EmailVerificationEmail } from "@/components/emails/email-verification-email"

export async function sendEmail(
  payload: CreateEmailOptions,
  options?: CreateEmailRequestOptions | undefined
) {
  try {
    const data = await resend.emails.send(payload, options)
    console.log("Email sent successfully")
    return data
  } catch (error) {
    console.error(error)
    throw new Error("Error sending email")
  }
}

export async function resendEmailVerificationLink(
  email: string
): Promise<"not-found" | "success" | null> {
  try {
    const user = await getUserByEmail(email)
    if (!user) return "not-found"

    const emailVerificationToken = crypto.randomBytes(32).toString("base64url")
    const userUpdated = await prisma.user.update({
      where: {
        email,
      },
      data: {
        emailVerificationToken,
      },
    })
    const emailSent = await sendEmail({
      from: env.RESEND_EMAIL_FROM,
      to: [email],
      subject: "Verify your email address",
      react: EmailVerificationEmail({
        email,
        emailVerificationToken,
      }),
    })
    if (!userUpdated || !emailSent) return null
    return "success"
  } catch (error) {
    console.error(error)
    throw new Error("Error resending email verification link")
  }
}

export async function checkIfEmailVerified(email: string): Promise<boolean> {
  try {
    const user = await getUserByEmail(email)
    if (user?.emailVerified instanceof Date) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error(error)
    throw new Error("Error checking if email verified")
  }
}

export async function markEmailAsVerified(
  emailVerificationToken: string
): Promise<User> {
  try {
    return await prisma.user.update({
      where: {
        emailVerificationToken,
      },
      data: {
        emailVerified: new Date(),
        emailVerificationToken: null,
      },
    })
  } catch (error) {
    console.error(error)
    throw new Error("Error marking email as verified")
  }
}
