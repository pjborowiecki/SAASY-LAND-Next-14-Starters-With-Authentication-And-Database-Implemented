"use server"

import crypto from "crypto"

import { AuthError } from "next-auth"
import { getUserByEmail, getUserByResetPasswordToken } from "@/actions/user"
import { signIn } from "@/auth"
import { env } from "@/env.mjs"
import {
  passwordResetSchema,
  passwordUpdateSchemaExtended,
  signInWithPasswordSchema,
  signUpWithPasswordSchema,
  type PasswordResetFormInput,
  type PasswordUpdateFormInputExtended,
  type SignInWithPasswordFormInput,
  type SignUpWithPasswordFormInput,
} from "@/validations/auth"
import bcryptjs from "bcryptjs"

import { prisma } from "@/config/db"
import { resend } from "@/config/email"
import { EmailVerificationEmail } from "@/components/emails/email-verification-email"
import { ResetPasswordEmail } from "@/components/emails/reset-password-email"

export async function signUpWithPassword(
  rawInput: SignUpWithPasswordFormInput
): Promise<"invalid-input" | "exists" | "success" | "error"> {
  const validatedInput = signUpWithPasswordSchema.safeParse(rawInput)
  if (!validatedInput.success) return "invalid-input"

  try {
    const user = await getUserByEmail(validatedInput.data.email)
    if (user) return "exists"

    const passwordHash = await bcryptjs.hash(validatedInput.data.password, 10)

    const newUser = await prisma.user.create({
      data: {
        email: validatedInput.data.email,
        passwordHash,
      },
    })
    if (!newUser) return "error"

    const emailVerificationToken = crypto.randomBytes(32).toString("base64url")

    const userUpdated = await prisma.user.update({
      where: {
        id: newUser.id,
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
    throw new Error("Error signing up with password")
  }
}

export async function signInWithPassword(
  rawInput: SignInWithPasswordFormInput
): Promise<
  | "invalid-input"
  | "invalid-credentials"
  | "not-registered"
  | "unverified-email"
  | "incorrect-provider"
  | "success"
> {
  const validatedInput = signInWithPasswordSchema.safeParse(rawInput)
  if (!validatedInput.success) return "invalid-input"

  const existingUser = await getUserByEmail(validatedInput.data.email)
  if (!existingUser) return "not-registered"

  if (!existingUser.email || !existingUser.passwordHash)
    return "incorrect-provider"

  if (!existingUser.emailVerified) return "unverified-email"

  try {
    await signIn("credentials", {
      email: validatedInput.data.email,
      password: validatedInput.data.password,
      redirect: false,
    })

    return "success"
  } catch (error) {
    console.error(error)
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "invalid-credentials"
        default:
          throw error
      }
    } else {
      throw new Error("Error signin in with password")
    }
  }
}

export async function resetPassword(
  rawInput: PasswordResetFormInput
): Promise<"invalid-input" | "not-found" | "success" | "error"> {
  const validatedInput = passwordResetSchema.safeParse(rawInput)
  if (!validatedInput.success) return "invalid-input"

  const user = await getUserByEmail(validatedInput.data.email)
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

    const emailSent = await resend.emails.send({
      from: env.RESEND_EMAIL_FROM,
      to: [validatedInput.data.email],
      subject: "Reset your password",
      react: ResetPasswordEmail({
        email: validatedInput.data.email,
        resetPasswordToken,
      }),
    })

    return userUpdated && emailSent ? "success" : "error"
  } catch (error) {
    console.error(error)
    return "error"
  }
}

export async function updatePassword(
  rawInput: PasswordUpdateFormInputExtended
): Promise<"invalid-input" | "not-found" | "expired" | "success" | "error"> {
  const validatedInput = passwordUpdateSchemaExtended.safeParse(rawInput)
  if (
    !validatedInput.success ||
    validatedInput.data.password !== validatedInput.data.confirmPassword
  )
    return "invalid-input"

  try {
    const user = await getUserByResetPasswordToken(
      validatedInput.data.resetPasswordToken
    )
    if (!user) return "not-found"

    const resetPasswordExpiry = user.resetPasswordTokenExpiry
    if (!resetPasswordExpiry || resetPasswordExpiry < new Date())
      return "expired"

    const passwordHash = await bcryptjs.hash(validatedInput.data.password, 10)

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

    return userUpdated ? "success" : "error"
  } catch (error) {
    console.error(error)
    throw new Error("Error updating password")
  }
}

export async function linkOAuthAccount(userId: string): Promise<void> {
  if (!userId) throw new Error("User ID is required")

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        emailVerified: new Date(),
      },
    })
  } catch (error) {
    console.error(error)
    throw new Error("Error linking OAuth account")
  }
}
