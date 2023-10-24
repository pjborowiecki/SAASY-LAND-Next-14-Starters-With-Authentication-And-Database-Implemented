import { db } from "@/db"
import { eq, sql } from "drizzle-orm"

import { users } from "../schemas/auth.schema"

export const psGetUserByEmail = db
  .select()
  .from(users)
  .where(eq(users.email, sql.placeholder("email")))
  .prepare()

export const psGetUserByEmailVerificationToken = db
  .select()
  .from(users)
  .where(
    eq(users.emailVerificationToken, sql.placeholder("emailVerificationToken"))
  )
  .prepare()

export const psGetUserByResetPasswordToken = db
  .select()
  .from(users)
  .where(eq(users.resetPasswordToken, sql.placeholder("resetPasswordToken")))
  .prepare()
