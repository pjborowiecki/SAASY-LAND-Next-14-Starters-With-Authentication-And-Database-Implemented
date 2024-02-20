import { emailSchema } from "@/validations/email"
import * as z from "zod"

export const newsletterSignUpSchema = z.object({
  email: emailSchema,
})

export const checkIfSubscribedToNewsletterSchema = z.object({
  email: emailSchema,
})

export type CheckIfSubscribedToNewsletterInput = z.infer<
  typeof checkIfSubscribedToNewsletterSchema
>

export type NewsletterSignUpFormInput = z.infer<typeof newsletterSignUpSchema>
