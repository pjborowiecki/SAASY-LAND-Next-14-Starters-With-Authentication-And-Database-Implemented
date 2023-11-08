"use server"

import { sendEmail } from "@/actions/email"
import { getUserByEmail } from "@/actions/user"
import { prisma } from "@/db"
import { env } from "@/env.mjs"

import { NewsletterWelcomeEmail } from "@/components/emails/newsletter-welcome-email"

export async function subscribeToNewsletter(
  email: string
): Promise<"exists" | "success" | null> {
  const alreadySubscribed = await getUserByEmail(email)
  if (alreadySubscribed) return "exists"

  const newSubscriber = await prisma.newsletterSubscriber.create({
    data: {
      email,
    },
  })

  const emailSent = await sendEmail({
    from: env.RESEND_EMAIL_FROM,
    to: email,
    subject: "Welcome to our newsletter!",
    react: NewsletterWelcomeEmail({ emailFrom: email }),
  })

  if (newSubscriber && emailSent) return "success"
  return null
}
