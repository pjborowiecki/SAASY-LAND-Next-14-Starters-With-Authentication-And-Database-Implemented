"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { resetPasswordAction } from "@/actions/auth"
import { passwordResetSchema } from "@/validations/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"

type PasswordResetFormInputs = z.infer<typeof passwordResetSchema>

export function PasswordResetForm() {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<PasswordResetFormInputs>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(formData: PasswordResetFormInputs) {
    startTransition(async () => {
      try {
        const message = await resetPasswordAction(formData.email)

        if (message === "success") {
          toast.message("Success!", {
            description: "Check your email for a password reset link",
          })
          router.push("/signin")
        } else if (message === "not-found") {
          toast.error("User with this email address does not exist")
          form.reset()
        } else {
          toast.error("Error resetting password. Please try again")
          router.push("/signin")
        }
      } catch (error) {
        toast.error("Something went wrong. Try again")
        console.error(error)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="johnsmith@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isPending}>
          {isPending ? (
            <>
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
              <span>Pending...</span>
            </>
          ) : (
            <span>Continue</span>
          )}
          <span className="sr-only">Continue resetting password</span>
        </Button>
      </form>
    </Form>
  )
}
