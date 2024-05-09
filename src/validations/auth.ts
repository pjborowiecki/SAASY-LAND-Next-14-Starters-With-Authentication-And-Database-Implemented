import * as z from "zod"

import { emailSchema } from "@/validations/email"

export const userIdSchema = z
  .string({
    required_error: "User Id is required",
    invalid_type_error: "User Id must be a string",
  })
  .min(1, {
    message: "User Id must be at least 1 character long",
  })
  .max(512, {
    message: "User Id must be at most 512 characters long",
  })

export const passwordSchema = z
  .string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  })
  .min(8, {
    message: "Password must at least 8 characters long",
  })
  .max(256, {
    message: "Password must be at most 256 characters long",
  })

export const signUpWithPasswordSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema.regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      {
        message:
          "Password must contain at least 8 characters, including one uppercase, one lowercase, one number and one special character",
      }
    ),
    confirmPassword: z.string(),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const signInWithEmailSchema = z.object({
  email: emailSchema,
})

export const signInWithPasswordSchema = z.object({
  email: emailSchema,
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }),
})

export const passwordResetSchema = z.object({
  email: emailSchema,
})

export const passwordUpdateSchema = z
  .object({
    password: passwordSchema.regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      {
        message:
          "Password must contain at least 8 characters, including one uppercase, one lowercase, one number and one special character",
      }
    ),
    confirmPassword: z.string(),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const passwordUpdateSchemaExtended = z
  .object({
    password: passwordSchema.regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      {
        message:
          "Password must contain at least 8 characters, including one uppercase, one lowercase, one number and one special character",
      }
    ),
    confirmPassword: z.string(),
    resetPasswordToken: z
      .string({
        required_error: "Reset password token is required",
        invalid_type_error: "Reset password token must be a string",
      })
      .min(16)
      .max(256),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const linkOAuthAccountSchema = z.object({
  userId: userIdSchema,
})

export type SignUpWithPasswordFormInput = z.infer<
  typeof signUpWithPasswordSchema
>

export type SignInWithPasswordFormInput = z.infer<
  typeof signInWithPasswordSchema
>

export type SignInWithEmailFormInput = z.infer<typeof signInWithEmailSchema>

export type PasswordResetFormInput = z.infer<typeof passwordResetSchema>

export type PasswordUpdateFormInput = z.infer<typeof passwordUpdateSchema>

export type PasswordUpdateFormInputExtended = z.infer<
  typeof passwordUpdateSchemaExtended
>

export type LinkOAuthAccountInput = z.infer<typeof linkOAuthAccountSchema>
