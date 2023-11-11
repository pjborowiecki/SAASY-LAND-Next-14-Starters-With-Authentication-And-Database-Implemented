"use server"

import { unstable_noStore as noStore } from "next/cache"
import {
  psGetUserByEmail,
  psGetUserByEmailVerificationToken,
  psGetUserByResetPasswordToken,
} from "@/db/prepared/statements"
import { type User } from "@/db/schema/index"

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    noStore()
    const [user] = await psGetUserByEmail.execute({ email })
    return user || null
  } catch (error) {
    console.error(error)
    throw new Error("Error getting user by email")
  }
}

export async function getUserByResetPasswordToken(
  resetPasswordToken: string
): Promise<User | null> {
  try {
    noStore()
    const [user] = await psGetUserByResetPasswordToken.execute({
      resetPasswordToken,
    })
    return user || null
  } catch (error) {
    console.error(error)
    throw new Error("Error getting user by reset password token")
  }
}

export async function getUserByEmailVerificationToken(
  emailVerificationToken: string
): Promise<User | null> {
  try {
    noStore()
    const [user] = await psGetUserByEmailVerificationToken.execute({
      emailVerificationToken,
    })
    return user || null
  } catch (error) {
    console.error(error)
    throw new Error("Error getting user by email verification token")
  }
}
