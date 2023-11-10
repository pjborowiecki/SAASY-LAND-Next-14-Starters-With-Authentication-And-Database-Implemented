import * as z from "zod"

export const ogImageSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .max(60, "Title must be 60 characters or less"),
  description: z
    .string({
      invalid_type_error: "Description must be a string",
    })
    .max(1024, "Description must be 160 characters or less")
    .optional(),
  type: z
    .string({
      invalid_type_error: "Type must be a string",
    })
    .max(128, {
      message: "Type must be 128 characters or less",
    })
    .optional(),
  mode: z.enum(["light", "dark"]).default("dark"),
})
