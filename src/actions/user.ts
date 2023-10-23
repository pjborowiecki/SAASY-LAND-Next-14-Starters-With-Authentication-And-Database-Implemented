"use server"

import {
  psGetUserByEmail,
  psGetUserByEmailVerificationToken,
  psGetUserByResetPasswordToken,
} from "@/db/prepared/statements"

export async function getUserByEmailAction(email: string) {
  return await psGetUserByEmail.execute({ email }).then((res) => res[0])
}

export async function getUserByResetPasswordTokenAction(
  resetPasswordToken: string
) {
  return await psGetUserByResetPasswordToken
    .execute({ resetPasswordToken })
    .then((res) => res[0])
}

export async function getUserByEmailVerificationTokenAction(
  emailVerificationToken: string
) {
  return await psGetUserByEmailVerificationToken
    .execute({ emailVerificationToken })
    .then((res) => res[0])
}
