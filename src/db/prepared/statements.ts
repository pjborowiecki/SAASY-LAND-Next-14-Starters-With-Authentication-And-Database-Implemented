import { db } from "@/db"
import { users } from "@/db/schemas/auth.schema"
import { newsletterSubscribers } from "@/db/schemas/newsletter.schema"
import { eq, sql } from "drizzle-orm"

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

export const psGetNewsletterSubscriberByEmail = db
  .select()
  .from(newsletterSubscribers)
  .where(eq(newsletterSubscribers.email, sql.placeholder("email")))
  .prepare()
