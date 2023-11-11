"use server"

import { unstable_noStore as noStore } from "next/cache"
import { sendEmail } from "@/actions/email"
import { db } from "@/db"
import { psGetNewsletterSubscriberByEmail } from "@/db/prepared/statements"
import {
  newsletterSubscribers,
  type NewNewsletterSubscriber,
} from "@/db/schema"
import { env } from "@/env.mjs"

import { NewsletterWelcomeEmail } from "@/components/emails/newsletter-welcome-email"

export async function checkIfSubscribedToNewsletter(
  email: string
): Promise<boolean> {
  try {
    noStore()
    const [newsletterSubscriber] =
      await psGetNewsletterSubscriberByEmail.execute({ email })
    return newsletterSubscriber ? true : false
  } catch (error) {
    console.error(error)
    throw new Error("Error checking if already subscribed to newsletter")
  }
}

export async function subscribeToNewsletter(
  email: string
): Promise<"exists" | "success" | null> {
  try {
    noStore()
    const alreadySubscribed = await checkIfSubscribedToNewsletter(email)
    if (alreadySubscribed) return "exists"

    // TODO: Replace with prepared statement
    const newSubscriber = await db
      .insert(newsletterSubscribers)
      .values({ email } as NewNewsletterSubscriber)

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
