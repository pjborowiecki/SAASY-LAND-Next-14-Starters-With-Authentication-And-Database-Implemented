"use server"

import { prisma } from "@/db/prisma"

export async function getUserByEmailAction(email: string) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  })
}

export async function getUserByResetPasswordTokenAction(
  resetPasswordToken: string
) {
  return await prisma.user.findUnique({
    where: {
      resetPasswordToken,
    },
  })
}

export async function getUserByEmailVerificationTokenAction(
  emailVerificationToken: string
) {
  return await prisma.user.findUnique({
    where: {
      emailVerificationToken,
    },
  })
}
