"use server"

import { sendEmail } from "@/actions/email"
import { prisma } from "@/db"
import { env } from "@/env.mjs"

import { NewsletterWelcomeEmail } from "@/components/emails/newsletter-welcome-email"

export async function checkIfSubscribedToNewsletter(
  email: string
): Promise<boolean> {
  try {
    const subscribed = await prisma.newsletterSubscriber.findUnique({
      where: {
        email,
      },
    })
    return subscribed ? true : false
  } catch (error) {
    console.error(error)
    throw new Error("Error checking if already subscribed to newsletter")
  }
}

export async function subscribeToNewsletter(
  email: string
): Promise<"exists" | "success" | null> {
  try {
    const alreadySubscribed = await checkIfSubscribedToNewsletter(email)
    if (alreadySubscribed) return "exists"

    const newSubscriber = await prisma.newsletterSubscriber.create({
      data: { email },
    })

    const emailSent = await sendEmail({
      from: env.RESEND_EMAIL_FROM,
      to: email,
      subject: "Welcome to our newsletter!",
      react: NewsletterWelcomeEmail(),
    })

    return newSubscriber && emailSent ? "success" : null
  } catch (error) {
    console.error(error)
    throw new Error("Error subscribing to the newsletter")
  }
}
