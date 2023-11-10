"use client"

import { signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export function SignOutButton(): JSX.Element {
  return (
    <Button
      aria-label="Sign Out"
      variant="ghost"
      className="w-full justify-start text-sm"
      onClick={() =>
        void signOut({
          callbackUrl: "/",
          redirect: true,
        })
      }
    >
      <Icons.logout className="mr-2 h-4 w-4" aria-hidden="true" />
      Sign out
    </Button>
  )
}
