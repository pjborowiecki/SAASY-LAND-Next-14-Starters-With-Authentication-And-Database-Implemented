"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { signInWithEmailSchema } from "@/validations/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
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

type SignInWithEmailFormInputs = z.infer<typeof signInWithEmailSchema>

export function SignInWithEmailForm(): JSX.Element {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<SignInWithEmailFormInputs>({
    resolver: zodResolver(signInWithEmailSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(formData: SignInWithEmailFormInputs): void {
    startTransition(async () => {
      try {
        await signIn("email", {
          email: formData.email,
          callbackUrl: searchParams.get("callbackUrl") || "/",
        })
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
              <FormMessage className="pt-2 sm:text-sm" />
            </FormItem>
          )}
        />

        <Button>
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
          <span className="sr-only">Continue with magic link</span>
        </Button>
      </form>
    </Form>
  )
}
