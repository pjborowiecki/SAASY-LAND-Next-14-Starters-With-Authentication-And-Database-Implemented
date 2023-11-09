import * as z from "zod"

export const emailSchema = z
  .string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  })
  .min(5, {
    message: "Email must be made of at least 5 characters",
  })
  .max(64, {
    message: "Email must be made of at most 64 characters",
  })
  .email({
    message: "Please enter a valid email address",
  })

export const newsletterSignUpSchema = z.object({
  email: emailSchema,
})

export const contactFormSchema = z.object({
  email: emailSchema,
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .max(128, {
      message: "Name must be made of at most 128 characters",
    }),
  message: z
    .string({
      required_error: "Message is required",
      invalid_type_error: "Message must be a string",
    })
    .max(10240, {
      message: "Message must be made of at most 10240 characters",
    }),
})
