"use server"

import { unstable_noStore as noStore } from "next/cache"
import { psGetNewsletterSubscriberByEmail } from "@/db/prepared/statements"
import { newsletterSubscribers } from "@/db/schema"
import { env } from "@/env.mjs"
import {
  checkIfSubscribedToNewsletterSchema,
  newsletterSignUpSchema,
  type CheckIfSubscribedToNewsletterInput,
  type NewsletterSignUpFormInput,
} from "@/validations/newsletter"

import { db } from "@/config/db"
import { resend } from "@/config/email"
import { NewsletterWelcomeEmail } from "@/components/emails/newsletter-welcome-email"

export async function checkIfSubscribedToNewsletter(
  rawInput: CheckIfSubscribedToNewsletterInput
): Promise<boolean> {
  try {
    const validatedInput =
      checkIfSubscribedToNewsletterSchema.safeParse(rawInput)
    if (!validatedInput.success) return false

    noStore()
    const [newsletterSubscriber] =
      await psGetNewsletterSubscriberByEmail.execute({
        email: validatedInput.data.email,
      })
    return newsletterSubscriber ? true : false
  } catch (error) {
    console.error(error)
    throw new Error("Error checking if already subscribed to newsletter")
  }
}

export async function subscribeToNewsletter(
  rawInput: NewsletterSignUpFormInput
): Promise<"exists" | "error" | "success"> {
  try {
    const validatedInput = newsletterSignUpSchema.safeParse(rawInput)
    if (!validatedInput.success) return "error"

    noStore()
    const alreadySubscribed = await checkIfSubscribedToNewsletter({
      email: validatedInput.data.email,
    })
    if (alreadySubscribed) return "exists"

    const newSubscriber = await db
      .insert(newsletterSubscribers)
      .values({ email: validatedInput.data.email })

    const emailSent = await resend.emails.send({
      from: env.RESEND_EMAIL_FROM,
      to: validatedInput.data.email,
      subject: "Welcome to our newsletter!",
      react: NewsletterWelcomeEmail(),
    })

    return newSubscriber && emailSent ? "success" : "error"
  } catch (error) {
    console.error(error)
    throw new Error("Error subscribing to the newsletter")
  }
}
