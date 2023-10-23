"use server"

import {
  psGetUserByEmail,
  psGetUserByEmailVerificationToken,
  psGetUserByResetPasswordToken,
} from "@/db/prepared/statements"

export async function getUserByEmailAction(email: string) {
  return await psGetUserByEmail.execute({ email: email })
}

export async function getUserByResetPasswordTokenAction(
  resetPasswordToken: string
) {
  return await psGetUserByResetPasswordToken.execute({
    resetPasswordToken: resetPasswordToken,
  })
}

export async function getUserByEmailVerificationTokenAction(
  EmailVerificationToken: string
) {
  return await psGetUserByEmailVerificationToken.execute({
    EmailVerificationToken: EmailVerificationToken,
  })
}
