"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export function OAuthButtons() {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
      <Button
        aria-label="Sign in with Google"
        variant="outline"
        // disabled={}
        // onClick={}
        className="w-full bg-customLight-900 hover:opacity-70 dark:bg-customDark-200 sm:w-auto"
      >
        <Icons.google className="mr-2 h-4 w-4" />
        Google
      </Button>

      <Button
        aria-label="Sign in with gitHub"
        variant="outline"
        // disabled={}
        // onClick={}
        className="w-full bg-customLight-900 hover:opacity-70 dark:bg-customDark-200 sm:w-auto"
      >
        <Icons.gitHub className="mr-2 h-4 w-4" />
        GitHub
      </Button>
    </div>
  )
}
