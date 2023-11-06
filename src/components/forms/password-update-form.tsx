"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { updatePassword } from "@/actions/auth"
import { passwordUpdateSchema } from "@/validations/auth"
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
import { Icons } from "@/components/icons"
import { PasswordInput } from "@/components/password-input"

type PasswordUpdateFormInputs = z.infer<typeof passwordUpdateSchema>

interface PasswordUpdateFormProps {
  resetPasswordToken: string
}

export function PasswordUpdateForm({
  resetPasswordToken,
}: PasswordUpdateFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<PasswordUpdateFormInputs>({
    resolver: zodResolver(passwordUpdateSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  function onSubmit(formData: PasswordUpdateFormInputs) {
    startTransition(async () => {
      try {
        const message = await updatePassword(
          resetPasswordToken,
          formData.password
        )

        if (message === "success") {
          toast.message("Success!", {
            description: "You can now sign in with new password",
          })
        } else if (message === "expired") {
          toast.error("Token is missing or expired. Please try again")
        } else {
          toast.error("Error updating password. Please try again")
        }

        router.push("/signin")
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="**********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="**********" {...field} />
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
              <span>Updating...</span>
            </>
          ) : (
            <span>Update password</span>
          )}
          <span className="sr-only">Update password</span>
        </Button>
      </form>
    </Form>
  )
}
