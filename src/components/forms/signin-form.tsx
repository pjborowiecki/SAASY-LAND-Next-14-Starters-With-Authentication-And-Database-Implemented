"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { signInSchema } from "@/validations/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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

type SignInFormInputs = z.infer<typeof signInSchema>

export function SignInForm() {
  // const router = useRouter()
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<SignInFormInputs>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(formData: SignInFormInputs) {
    startTransition(async () => {
      try {
        // TODO: await db call (ensure the function is async!)

        form.reset()
        // TODO: ensure the correct route is pushed
        // router.push("/")
        // TODO: display a toast message
      } catch (error) {
        console.log(error)
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
        <Button>
          {isPending && (
            <>
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
              Signing in
            </>
          )}
          Sign in
          <span className="sr-only">Sign in with email and password</span>
        </Button>
      </form>
    </Form>
  )
}
