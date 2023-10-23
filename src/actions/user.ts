"use server"

import { db } from "@/db"
import { users } from "@/db/schemas/auth.schema"
import { eq } from "drizzle-orm"

export async function getUserByEmailAction(email: string) {
  const user = await db.query.users
    .findMany({
      where: (users, { eq }) => eq(users.email, email),
    })
    .then((res) => res[0])
  console.log("user from getUserByEmailAction", user)
  return user
}

export async function getUserByResetPasswordTokenAction(
  resetPasswordToken: string
) {
  return await db
    .select()
    .from(users)
    .where(eq(users.resetPasswordToken, resetPasswordToken))
    .then((res) => res[0])
}

export async function getUserByEmailVerificationTokenAction(
  emailVerificationToken: string
) {
  return await db
    .select()
    .from(users)
    .where(eq(users.emailVerificationToken, emailVerificationToken))
    .then((res) => res[0])
}
