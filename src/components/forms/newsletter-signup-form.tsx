"use client"

import * as React from "react"
import { subscribeToNewsletter } from "@/actions/newsletter"
import { newsletterSignUpSchema } from "@/validations/email"
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

type NewsletterSignUpFormInputs = z.infer<typeof newsletterSignUpSchema>

export function NewsletterSignUpForm(): JSX.Element {
  const { toast } = useToast()
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
            toast({
              title: "You are subscribed already",
              variant: "destructive",
            })
            form.reset()
            break
          case "success":
            toast({
              title: "Thank you!",
              description: "You have successfully subscribed to our newsletter",
            })
            form.reset()
            break
          default:
            toast({
              title: "Something went wrong",
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
                  type="email"
                  placeholder="johnsmith@gmail.com"
                  className="h-10 placeholder:text-xs md:h-12 md:placeholder:text-sm"
                  {...field}
                />
              </FormControl>
              <FormMessage className="pt-2 sm:text-sm" />
            </FormItem>
          )}
        />

        <Button
          className="size-10 rounded-l-none md:size-12"
          disabled={isPending}
        >
          {isPending ? (
            <Icons.spinner className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <Icons.paperPlane className="size-4" aria-hidden="true" />
          )}
          <span className="sr-only">Join newsletter</span>
        </Button>
      </form>
    </Form>
  )
}
