"use server"

import crypto from "crypto"
import { sendEmail } from "@/actions/email"
import { getUserByEmail, getUserByResetPasswordToken } from "@/actions/user"
import { prisma } from "@/db"
import { env } from "@/env.mjs"
import bcrypt from "bcrypt"

import { EmailVerificationEmail } from "@/components/emails/email-verification-email"
import { ResetPasswordEmail } from "@/components/emails/reset-password-email"

export async function signUpWithPassword(
  email: string,
  password: string
): Promise<"exists" | "success" | null> {
  try {
    const user = await getUserByEmail(email)
    if (user) return "exists"

    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        email,
        passwordHash,
      },
    })
    if (!newUser) return null

    const emailVerificationToken = crypto.randomBytes(32).toString("base64url")

    const userUpdated = await prisma.user.update({
      where: {
        id: newUser.id,
      },
      data: {
        emailVerificationToken,
      },
    })

    const emailSent = await sendEmail({
      from: env.RESEND_EMAIL_FROM,
      to: [email],
      subject: "Verify your email address",
      react: EmailVerificationEmail({ email, emailVerificationToken }),
    })

    return userUpdated && emailSent ? "success" : null
  } catch (error) {
    console.error(error)
    throw new Error("Error signing up with password")
  }
}

export async function resetPassword(
  email: string
): Promise<"not-found" | "success" | null> {
  const user = await getUserByEmail(email)
  if (!user) return "not-found"

  const today = new Date()
  const resetPasswordToken = crypto.randomBytes(32).toString("base64url")
  const resetPasswordTokenExpiry = new Date(today.setDate(today.getDate() + 1)) // 24 hours from now

  try {
    const userUpdated = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        resetPasswordToken,
        resetPasswordTokenExpiry,
      },
    })
    const emailSent = await sendEmail({
      from: env.RESEND_EMAIL_FROM,
      to: [email],
      subject: "Reset your password",
      react: ResetPasswordEmail({ email, resetPasswordToken }),
    })

    return userUpdated && emailSent ? "success" : null
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function updatePassword(
  resetPasswordToken: string,
  password: string
): Promise<"not-found" | "expired" | "success" | null> {
  try {
    const user = await getUserByResetPasswordToken(resetPasswordToken)
    if (!user) return "not-found"

    const resetPasswordExpiry = user.resetPasswordTokenExpiry
    if (!resetPasswordExpiry || resetPasswordExpiry < new Date())
      return "expired"

    const passwordHash = await bcrypt.hash(password, 10)

    const userUpdated = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        passwordHash,
        resetPasswordToken: null,
        resetPasswordTokenExpiry: null,
      },
    })

    return userUpdated ? "success" : null
  } catch (error) {
    console.error(error)
    throw new Error("Error updating password")
  }
}
