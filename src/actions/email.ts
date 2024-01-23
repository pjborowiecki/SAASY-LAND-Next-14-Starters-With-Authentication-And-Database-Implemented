"use server"

import crypto from "crypto"

import { getUserByEmail } from "@/actions/user"
import { env } from "@/env.mjs"
import { type User } from "@prisma/client"

import { prisma } from "@/config/db"
import { resend } from "@/config/email"
import { EmailVerificationEmail } from "@/components/emails/email-verification-email"
import { NewEnquiryEmail } from "@/components/emails/new-enquiry-email"

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

    const emailSent = await resend.emails.send({
      from: env.RESEND_EMAIL_FROM,
      to: [email],
      subject: "Verify your email address",
      react: EmailVerificationEmail({
        email,
        emailVerificationToken,
      }),
    })

    return userUpdated && emailSent ? "success" : null
  } catch (error) {
    console.error(error)
    throw new Error("Error resending email verification link")
  }
}

export async function checkIfEmailVerified(email: string): Promise<boolean> {
  try {
    const user = await getUserByEmail(email)
    return user?.emailVerified instanceof Date ? true : false
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

export async function submitContactForm(formData: {
  email: string
  name: string
  message: string
}): Promise<"success" | null> {
  try {
    const emailSent = await resend.emails.send({
      from: env.RESEND_EMAIL_FROM,
      to: env.RESEND_EMAIL_TO,
      subject: "Exciting news! New enquiry awaits",
      react: NewEnquiryEmail({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      }),
    })

    return emailSent ? "success" : null
  } catch (error) {
    console.error(error)
    throw new Error("Error submitting contact form")
  }
}
