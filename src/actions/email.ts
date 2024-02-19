"use server"

import crypto from "crypto"

import { getUserByEmail } from "@/actions/user"
import { env } from "@/env.mjs"
import {
  checkIfEmailVerifiedSchema,
  contactFormSchema,
  emailVerificationSchema,
  markEmailAsVerifiedSchema,
  type CheckIfEmailVerifiedInput,
  type ContactFormInput,
  type EmailVerificationFormInput,
  type MarkEmailAsVerifiedInput,
} from "@/validations/email"

import { prisma } from "@/config/db"
import { resend } from "@/config/email"
import { EmailVerificationEmail } from "@/components/emails/email-verification-email"
import { NewEnquiryEmail } from "@/components/emails/new-enquiry-email"

export async function resendEmailVerificationLink(
  rawInput: EmailVerificationFormInput
): Promise<"invalid-input" | "not-found" | "error" | "success"> {
  try {
    const validatedInput = emailVerificationSchema.safeParse(rawInput)
    if (!validatedInput.success) return "invalid-input"

    const user = await getUserByEmail({ email: validatedInput.data.email })
    if (!user) return "not-found"

    const emailVerificationToken = crypto.randomBytes(32).toString("base64url")

    const userUpdated = await prisma.user.update({
      where: {
        email: validatedInput.data.email,
      },
      data: {
        emailVerificationToken,
      },
    })

    const emailSent = await resend.emails.send({
      from: env.RESEND_EMAIL_FROM,
      to: [validatedInput.data.email],
      subject: "Verify your email address",
      react: EmailVerificationEmail({
        email: validatedInput.data.email,
        emailVerificationToken,
      }),
    })

    return userUpdated && emailSent ? "success" : "error"
  } catch (error) {
    console.error(error)
    throw new Error("Error resending email verification link")
  }
}

export async function checkIfEmailVerified(
  rawInput: CheckIfEmailVerifiedInput
): Promise<boolean> {
  try {
    const validatedInput = checkIfEmailVerifiedSchema.safeParse(rawInput)
    if (!validatedInput.success) return false

    const user = await getUserByEmail({ email: validatedInput.data.email })
    return user?.emailVerified instanceof Date ? true : false
  } catch (error) {
    console.error(error)
    throw new Error("Error checking if email verified")
  }
}

export async function markEmailAsVerified(
  rawInput: MarkEmailAsVerifiedInput
): Promise<"invalid-input" | "error" | "success"> {
  try {
    const validatedInput = markEmailAsVerifiedSchema.safeParse(rawInput)
    if (!validatedInput.success) return "invalid-input"

    const userUpdated = await prisma.user.update({
      where: {
        emailVerificationToken: validatedInput.data.token,
      },
      data: {
        emailVerified: new Date(),
        emailVerificationToken: null,
      },
    })

    return userUpdated ? "success" : "error"
  } catch (error) {
    console.error(error)
    throw new Error("Error marking email as verified")
  }
}

export async function submitContactForm(
  rawInput: ContactFormInput
): Promise<"error" | "success"> {
  try {
    const validatedInput = contactFormSchema.safeParse(rawInput)
    if (!validatedInput.success) return "error"

    const emailSent = await resend.emails.send({
      from: env.RESEND_EMAIL_FROM,
      to: env.RESEND_EMAIL_TO,
      subject: "Exciting news! New enquiry awaits",
      react: NewEnquiryEmail({
        name: validatedInput.data.name,
        email: validatedInput.data.email,
        message: validatedInput.data.message,
      }),
    })

    return emailSent ? "success" : "error"
  } catch (error) {
    console.error(error)
    throw new Error("Error submitting contact form")
  }
}
