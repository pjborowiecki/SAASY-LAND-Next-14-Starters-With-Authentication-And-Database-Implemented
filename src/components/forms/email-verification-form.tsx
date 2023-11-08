"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { resendEmailVerificationLink } from "@/actions/email"
import { emailVerificationSchema } from "@/validations/auth"
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

type EmailVerificationFormInputs = z.infer<typeof emailVerificationSchema>

export function EmailVerificationForm(): JSX.Element {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<EmailVerificationFormInputs>({
    resolver: zodResolver(emailVerificationSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(formData: EmailVerificationFormInputs): void {
    startTransition(async () => {
      try {
        const message = await resendEmailVerificationLink(formData.email)

        switch (message) {
          case "not-found":
            toast.error("User with this email address does not exist")
            form.reset()
            break
          case "success":
            toast.message("Success!", {
              description: "Check your inbox and verify your email address",
            })
            router.push("/signin")
            break
          default:
            toast.error("Error sending verification link. Please try again")
            router.push("/signup")
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again")
        console.error(error)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4 "
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
            <span>Get verification link</span>
          )}
          <span className="sr-only">Resend email verification link</span>
        </Button>
      </form>
    </Form>
  )
}
