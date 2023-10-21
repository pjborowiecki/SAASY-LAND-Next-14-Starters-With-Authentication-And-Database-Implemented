"use client"

import * as React from "react"
import { signIn } from "next-auth/react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

async function handleOAuthSignIn(provider: string) {
  try {
    await signIn(provider, {
      callbackUrl: `${window.location.origin}/`,
    })
  } catch (error) {
    toast.error("Something went wrong. Try again")
    console.error(error)
  }
}

export function OAuthButtons() {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
      <Button
        aria-label="Sign in with Google"
        variant="outline"
        onClick={() => void handleOAuthSignIn("google")}
        className="w-full bg-customLight-900 hover:opacity-70 dark:bg-customDark-200 sm:w-auto"
      >
        <Icons.google className="mr-2 h-4 w-4" />
        Google
      </Button>

      <Button
        aria-label="Sign in with gitHub"
        variant="outline"
        onClick={() => void handleOAuthSignIn("github")}
        className="w-full bg-customLight-900 hover:opacity-70 dark:bg-customDark-200 sm:w-auto"
      >
        <Icons.gitHub className="mr-2 h-4 w-4" />
        GitHub
      </Button>
    </div>
  )
}
