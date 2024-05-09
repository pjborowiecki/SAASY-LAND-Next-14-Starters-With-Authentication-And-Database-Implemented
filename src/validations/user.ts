import * as z from "zod"

import { passwordSchema, userIdSchema } from "@/validations/auth"
import { emailSchema } from "@/validations/email"

export const userSchema = z.object({
  role: z
    .enum(["USER", "ADMIN"], {
      required_error: "Role is required",
      invalid_type_error: "Role must be one of the following: user, admin",
    })
    .default("USER"),
  email: emailSchema,
  password: passwordSchema,
})

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

export const addUserAsAdminSchema = userSchema
  .extend({
    confirmPassword: passwordSchema,
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const updateUserAsAdminSchema = userSchema
  .omit({
    password: true,
  })
  .extend({
    id: userIdSchema,
    createdAt: z.date(),
  })

export const updateUserSchema = userSchema
  .omit({
    role: true,
  })
  .extend({
    confirmPassword: passwordSchema,
  })

export const deleteUserSchema = z.object({
  id: userIdSchema,
})

export const checkIfUserExistsSchema = z.object({
  id: userIdSchema,
})

export type GetUserByEmailInput = z.infer<typeof getUserByEmailSchema>

export type GetUserByIdInput = z.infer<typeof getUserByIdSchema>

export type GetUserByResetPasswordTokenInput = z.infer<
  typeof getUserByResetPasswordTokenSchema
>

export type GetUserByEmailVerificationTokenInput = z.infer<
  typeof getUserByEmailVerificationTokenSchema
>

export type UpdateUserInput = z.infer<typeof updateUserSchema>

export type DeleteUserInput = z.infer<typeof deleteUserSchema>

export type CheckIfUserExistsInput = z.infer<typeof checkIfUserExistsSchema>
