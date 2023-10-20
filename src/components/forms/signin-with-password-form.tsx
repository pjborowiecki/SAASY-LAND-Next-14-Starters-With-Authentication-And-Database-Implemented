"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  checkIfEmailVerifiedAction,
  signInWithPasswordAction,
} from "@/actions/auth"
import { getUserByEmailAction } from "@/actions/user"
import { signInWithPasswordSchema } from "@/validations/auth"
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
import { PasswordInput } from "@/components/password-input"

type SignInWithPasswordFormInputs = z.infer<typeof signInWithPasswordSchema>

export function SignInWithPasswordForm() {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<SignInWithPasswordFormInputs>({
    resolver: zodResolver(signInWithPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(formData: SignInWithPasswordFormInputs) {
    startTransition(async () => {
      try {
        const message = await signInWithPasswordAction(
          formData.email,
          formData.password
        )

        if (message === "success") {
          toast.success("Success! You are now signed in")
          router.push("/")
        } else if (message === "email-not-verified") {
          toast.error("Please verify your email address before signing in")
        } else if (message === "invalid-credentials") {
          toast.error("Invalid email or password")
        } else {
          toast.error("Error signing in. Try again")
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
        className="grid w-full gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="johnsmith@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="primary-gradient" disabled={isPending}>
          {isPending ? (
            <>
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
              <span>Signing in...</span>
            </>
          ) : (
            <span>Sign in</span>
          )}
          <span className="sr-only">Sign in with email and password</span>
        </Button>
      </form>
    </Form>
  )
}
