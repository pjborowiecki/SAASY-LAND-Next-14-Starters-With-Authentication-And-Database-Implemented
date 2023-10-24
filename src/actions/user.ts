"use server"

import {
  psGetUserByEmail,
  psGetUserByEmailVerificationToken,
  psGetUserByResetPasswordToken,
} from "@/db/prepared/statements"

export async function getUserByEmailAction(email: string) {
  return await psGetUserByEmail.execute({ email })
}

export async function getUserByResetPasswordTokenAction(
  resetPasswordToken: string
) {
  return await psGetUserByResetPasswordToken.execute({ resetPasswordToken })
}

export async function getUserByEmailVerificationTokenAction(
  emailVerificationToken: string
) {
  return await psGetUserByEmailVerificationToken.execute({
    emailVerificationToken,
  })
}
