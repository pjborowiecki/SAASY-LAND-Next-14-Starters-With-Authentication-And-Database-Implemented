import { db } from "@/db"
import { sql } from "drizzle-orm"

export const psGetUserByEmail = db.query.users
  .findFirst({
    where: (users, { eq }) => eq(users.email, sql.placeholder("email")),
  })
  .prepare("psGetUserByEmail")

export const psGetUserByResetPasswordToken = db.query.users
  .findFirst({
    where: (users, { eq }) =>
      eq(users.resetPasswordToken, sql.placeholder("resetPasswordToken")),
  })
  .prepare("psGetUserByResetPasswordToken")

export const psGetUserByEmailVerificationToken = db.query.users
  .findFirst({
    where: (users, { eq }) =>
      eq(
        users.emailVerificationToken,
        sql.placeholder("emailVerificationToken")
      ),
  })
  .prepare("psGetUserByEmailVerificationToken")
