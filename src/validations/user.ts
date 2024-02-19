import { emailSchema } from "@/validations/email"
import * as z from "zod"

export const getUserByEmailSchema = z.object({
  email: emailSchema,
})

export const getUserByIdSchema = z.object({
  id: z.string(),
})

export const getUserByResetPasswordTokenSchema = z.object({
  token: z.string(),
})

export const getUserByEmailVerificationTokenSchema = z.object({
  token: z.string(),
})

export type GetUserByEmailInput = z.infer<typeof getUserByEmailSchema>

export type GetUserByIdInput = z.infer<typeof getUserByIdSchema>

export type GetUserByResetPasswordTokenInput = z.infer<
  typeof getUserByResetPasswordTokenSchema
>

export type GetUserByEmailVerificationTokenInput = z.infer<
  typeof getUserByEmailVerificationTokenSchema
>
