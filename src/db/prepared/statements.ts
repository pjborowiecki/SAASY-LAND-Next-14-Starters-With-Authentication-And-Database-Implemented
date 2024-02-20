import { newsletterSubscribers, users } from "@/db/schema"
import { eq, sql } from "drizzle-orm"

import { db } from "@/config/db"

export const psGetUserById = db
  .select()
  .from(users)
  .where(eq(users.id, sql.placeholder("id")))
  .prepare("psGetUserById")

export const psGetUserByEmail = db
  .select()
  .from(users)
  .where(eq(users.email, sql.placeholder("email")))
  .prepare("psGetUserByEmail")

export const psGetUserByEmailVerificationToken = db
  .select()
  .from(users)
  .where(eq(users.emailVerificationToken, sql.placeholder("token")))
  .prepare("psGetUserByEmailVerificationToken")

export const psGetUserByResetPasswordToken = db
  .select()
  .from(users)
  .where(eq(users.resetPasswordToken, sql.placeholder("token")))
  .prepare("psGetUserByResetPasswordToken")

export const psGetNewsletterSubscriberByEmail = db
  .select()
  .from(newsletterSubscribers)
  .where(eq(newsletterSubscribers.email, sql.placeholder("email")))
  .prepare("psGetNewsletterSubscriberByEmail")

export const psLinkOAuthAccount = db
  .update(users)
  .set({ emailVerified: new Date() })
  .where(eq(users.id, sql.placeholder("userId")))
  .prepare("psLinkOAuthAccount")
