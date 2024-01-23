"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import {
  signInWithEmailSchema,
  type SignInWithEmailFormInput,
} from "@/validations/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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

export function SignInWithEmailForm(): JSX.Element {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<SignInWithEmailFormInput>({
    resolver: zodResolver(signInWithEmailSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(formData: SignInWithEmailFormInput): void {
    startTransition(async () => {
      try {
        await signIn("email", { email: formData.email })
      } catch (error) {
        console.error(error)

        searchParams.get("error") === "OAuthAccountNotLinked"
          ? toast({
              title: "Email already in use with another provider",
              description: "Perhaps you signed up with another method?",
              variant: "destructive",
            })
          : toast({
              title: "Something went wrong",
              description: "Please try again",
              variant: "destructive",
            })
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
                className="mr-2 size-4 animate-spin"
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
