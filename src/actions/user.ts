"use server"

import { prisma } from "@/db/prisma"

export async function getUserByEmailAction(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  return user
}

export async function getUserByTokenAction(token: string) {
  const user = await prisma.user.findUnique({
    where: {
      resetPasswordToken: token,
    },
  })
  return user
}
