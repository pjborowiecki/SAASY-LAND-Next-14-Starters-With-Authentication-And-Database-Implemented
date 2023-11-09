"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { resetPassword } from "@/actions/auth"
import { passwordResetSchema } from "@/validations/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"

import { useToast } from "@/hooks/use-toast"
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

export function PasswordResetForm(): JSX.Element {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<PasswordResetFormInputs>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(formData: PasswordResetFormInputs): void {
    startTransition(async () => {
      try {
        const message = await resetPassword(formData.email)

        switch (message) {
          case "not-found":
            toast({
              title: "User with this email address does not exist",
              variant: "destructive",
            })
            form.reset()
            break
          case "success":
            toast({
              title: "Success!",
              description: "Check your email for a password reset link",
            })
            router.push("/signin")
            break
          default:
            toast({
              title: "Error resetting password",
              description: "Please try again",
              variant: "destructive",
            })
            router.push("/signin")
        }
      } catch (error) {
        toast({
          title: "Something went wrong",
          description: "Try again",
          variant: "destructive",
        })
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
              <FormMessage className="pt-2 sm:text-sm" />
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
