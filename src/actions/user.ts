"use server"

import { type User } from "@prisma/client"

import { prisma } from "@/config/db"

export async function getUserById(id: string): Promise<User | null> {
  try {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    })
  } catch (error) {
    console.error(error)
    throw new Error("Error getting user by Id")
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    })
  } catch (error) {
    console.error(error)
    throw new Error("Error getting user by email")
  }
}

export async function getUserByResetPasswordToken(
  resetPasswordToken: string
): Promise<User | null> {
  try {
    return await prisma.user.findUnique({
      where: {
        resetPasswordToken,
      },
    })
  } catch (error) {
    console.error(error)
    throw new Error("Error getting user by reset password token")
  }
}

export async function getUserByEmailVerificationToken(
  emailVerificationToken: string
): Promise<User | null> {
  try {
    return await prisma.user.findUnique({
      where: {
        emailVerificationToken,
      },
    })
  } catch (error) {
    console.error(error)
    throw new Error("Error getting user by email verification token")
  }
}
