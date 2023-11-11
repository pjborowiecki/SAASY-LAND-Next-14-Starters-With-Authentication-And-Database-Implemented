"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { updatePassword } from "@/actions/auth"
import { passwordUpdateSchema } from "@/validations/auth"
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
import { Icons } from "@/components/icons"
import { PasswordInput } from "@/components/password-input"

type PasswordUpdateFormInputs = z.infer<typeof passwordUpdateSchema>

interface PasswordUpdateFormProps {
  resetPasswordToken: string
}

export function PasswordUpdateForm({
  resetPasswordToken,
}: PasswordUpdateFormProps): JSX.Element {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<PasswordUpdateFormInputs>({
    resolver: zodResolver(passwordUpdateSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  function onSubmit(formData: PasswordUpdateFormInputs): void {
    startTransition(async () => {
      try {
        const message = await updatePassword(
          resetPasswordToken,
          formData.password
        )

        switch (message) {
          case "expired":
            toast({
              title: "Token is missing or expired",
              description: "Please try again",
              variant: "destructive",
            })
            router.push("/signin")
            break
          case "success":
            toast({
              title: "Success!",
              description: "You can now sign in with new password",
            })
            router.push("/signin")
            break
          default:
            toast({
              title: "Error updating password",
              description: "Please try again",
              variant: "destructive",
            })
        }
      } catch (error) {
        toast({
          title: "Something went wrong",
          description: "Please try again",
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="**********" {...field} />
              </FormControl>
              <FormMessage className="pt-2 sm:text-sm" />
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
