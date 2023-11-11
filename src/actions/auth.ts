"use server"

import crypto from "crypto"
import { sendEmail } from "@/actions/email"
import { getUserByEmail, getUserByResetPasswordToken } from "@/actions/user"
import { db } from "@/db"
import { users, type NewUser } from "@/db/schema"
import { env } from "@/env.mjs"
import bcrypt from "bcrypt"
import { eq } from "drizzle-orm"

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

    // TODO: Replace with prepared statement
    const newUserResponse = await db.insert(users).values({
      id: crypto.randomUUID(),
      email,
      passwordHash,
    } as NewUser)

    if (!newUserResponse) return null

    const emailVerificationToken = crypto.randomBytes(32).toString("base64url")

    // TODO: Replace with prepared statement
    const updatedUserResponse = await db
      .update(users)
      .set({ emailVerificationToken })
      .where(eq(users.email, email))

    const emailSent = await sendEmail({
      from: env.RESEND_EMAIL_FROM,
      to: [email],
      subject: "Verify your email address",
      react: EmailVerificationEmail({ email, emailVerificationToken }),
    })

    return updatedUserResponse && emailSent ? "success" : null
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
    // TODO: Replace with prepared statement
    const userUpdatedResponse = await db
      .update(users)
      .set({
        resetPasswordToken,
        resetPasswordTokenExpiry,
      })
      .where(eq(users.email, email))

    const emailSent = await sendEmail({
      from: env.RESEND_EMAIL_FROM,
      to: [email],
      subject: "Reset your password",
      react: ResetPasswordEmail({ email, resetPasswordToken }),
    })

    return userUpdatedResponse && emailSent ? "success" : null
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

    // TODO: Replace with prepared statement
    const userUpdatedResponse = await db
      .update(users)
      .set({
        passwordHash,
        resetPasswordToken: null,
        resetPasswordTokenExpiry: null,
      })
      .where(eq(users.id, user.id))

    return userUpdatedResponse ? "success" : null
  } catch (error) {
    console.error(error)
    throw new Error("Error updating password")
  }
}
