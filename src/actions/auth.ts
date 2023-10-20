"use server"

import crypto from "crypto"
import { checkIfEmailVerifiedAction, sendEmail } from "@/actions/email"
import {
  getUserByEmailAction,
  getUserByResetPasswordTokenAction,
} from "@/actions/user"
import { prisma } from "@/db/prisma"
import { env } from "@/env.mjs"
import bcrypt from "bcrypt"
import { signIn } from "next-auth/react"

import { EmailVerificationEmail } from "@/components/emails/email-verification-email"
import { ResetPasswordEmail } from "@/components/emails/reset-password-email"

export async function signUpWithPasswordAction(
  email: string,
  password: string
) {
  const user = await getUserByEmailAction(email)
  if (user) {
    return "exists"
  }
  const passwordHash = await bcrypt.hash(password, 10)
  const newUser = await prisma.user.create({
    data: {
      email,
      passwordHash,
    },
  })
  if (!newUser) {
    return null
  }
  const emailVerificationToken = crypto.randomBytes(32).toString("base64url")
  const updatedUser = await prisma.user.update({
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
  if (!updatedUser || !emailSent) {
    return null
  }
  return "success"
}

export async function signUpWithEmailAction(email: string) {
  const user = await getUserByEmailAction(email)
  // TODO: Complete this function
  return user
}

export async function resetPasswordAction(email: string) {
  const user = await getUserByEmailAction(email)
  if (!user) {
    return "not-found"
  }
  const today = new Date()
  const resetPasswordToken = crypto.randomBytes(32).toString("base64url")
  const resetPasswordTokenExpiry = new Date(today.setDate(today.getDate() + 1)) // 24 hours from now
  try {
    const updatedUser = await prisma.user.update({
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
    if (!updatedUser || !emailSent) {
      return null
    }
    return "success"
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function updatePasswordAction(
  resetPasswordToken: string,
  password: string
) {
  const user = await getUserByResetPasswordTokenAction(resetPasswordToken)
  if (!user) {
    return "not-found"
  }
  const resetPasswordExpiry = user.resetPasswordTokenExpiry
  if (!resetPasswordExpiry || resetPasswordExpiry < new Date()) {
    return "expired"
  }
  const passwordHash = await bcrypt.hash(password, 10)
  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      passwordHash,
      resetPasswordToken: null,
      resetPasswordTokenExpiry: null,
    },
  })
  if (!updatedUser) {
    return null
  }
  return "success"
}

export async function signInWithPasswordAction(
  email: string,
  password: string
) {
  const signInResponse = await signIn("credentials", {
    email,
    password,
    redirect: false,
  })
  if (signInResponse && signInResponse.ok) {
    const emailVerified = await checkIfEmailVerifiedAction(email)
    if (!emailVerified) {
      return "email-not-verified"
    }
    return "success"
  } else {
    return "invalid-credentials"
  }
}
