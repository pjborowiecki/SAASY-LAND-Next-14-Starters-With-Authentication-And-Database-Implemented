"use server"

import { prisma } from "@/db/prisma"
import bcrypt from "bcrypt"

export async function signUpWithPasswordAction(
  email: string,
  password: string
) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (user) {
    return "exists"
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      email,
      passwordHash,
    },
  })

  return "success"
}

export async function signUpWithEmailAction(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  return user
}
