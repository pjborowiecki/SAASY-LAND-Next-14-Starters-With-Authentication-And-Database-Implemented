"use server"

import { prisma } from "@/db/prisma"
import bcrypt from "bcryptjs"

export async function signUpUserAction(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (user) {
    return "User already exists"
  }

  const passwordHash = bcrypt.hashSync(password, 10)

  const newUser = await prisma.user.create({
    data: {
      email,
      passwordHash,
    },
  })

  if (newUser) {
    return "User created successfully"
  }

  return null
}
