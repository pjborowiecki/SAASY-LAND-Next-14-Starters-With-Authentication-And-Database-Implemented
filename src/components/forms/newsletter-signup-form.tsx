"use client"

import * as React from "react"
import { subscribeToNewsletter } from "@/actions/newsletter"
import { newsletterSignUpSchema } from "@/validations/email"
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

type NewsletterSignUpFormInputs = z.infer<typeof newsletterSignUpSchema>

export function NewsletterSignUpForm(): JSX.Element {
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<NewsletterSignUpFormInputs>({
    resolver: zodResolver(newsletterSignUpSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(formData: NewsletterSignUpFormInputs): void {
    startTransition(async () => {
      try {
        const message = await subscribeToNewsletter(formData.email)

        switch (message) {
          case "exists":
            toast.message("You are already subscribed")
            form.reset()
            break
          case "success":
            toast.success("Thank you for subscribing!")
            form.reset()
            break
          default:
            toast.error("Something went wrong. Please try again")
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again")
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="flex h-10 w-full  items-center justify-center md:h-12"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="relative h-10 w-full space-y-0 md:h-12">
              <FormLabel className="sr-only">Email</FormLabel>
              <FormControl className="rounded-r-none">
                <Input
                  placeholder="johnsmith@gmail.com"
                  className="h-10 placeholder:text-xs md:h-12 md:placeholder:text-sm"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="h-10 w-10 rounded-l-none md:h-12 md:w-12"
          disabled={isPending}
        >
          {isPending ? (
            <Icons.spinner
              className="h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          ) : (
            <Icons.paperPlane className="h-4 w-4" aria-hidden="true" />
          )}
          <span className="sr-only">Join newsletter</span>
        </Button>
      </form>
    </Form>
  )
}
