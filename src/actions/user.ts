"use server"

import { prisma } from "@/db/drizzle"

export async function getUserByEmailAction(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  return user
}

export async function getUserByResetPasswordTokenAction(
  resetPasswordToken: string
) {
  const user = await prisma.user.findUnique({
    where: {
      resetPasswordToken,
    },
  })
  return user
}

export async function getUserByEmailVerificationTokenAction(
  emailVerificationToken: string
) {
  const user = await prisma.user.findUnique({
    where: {
      emailVerificationToken,
    },
  })
  return user
}
