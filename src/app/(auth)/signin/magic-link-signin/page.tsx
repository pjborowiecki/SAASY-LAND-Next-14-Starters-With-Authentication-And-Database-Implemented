import { type Metadata } from "next"
import Link from "next/link"
import { env } from "@/env.mjs"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Magic Link Sign In",
  description: "Check your email for the magic link to sign in",
}

export default function MagicLinkSignInPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Card className="bg-customLight-800 dark:bg-customDark-300 max-sm:flex max-sm:h-screen max-sm:w-full max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:rounded-none max-sm:border-none sm:min-w-[370px] sm:max-w-[368px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Magic Link Sign In</CardTitle>
          <CardDescription className="text-customDark-400 dark:text-customLight-400/70">
            Check your email for the magic link to sign in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            aria-label="Back to the sign in page"
            href="/signin"
            className={cn(buttonVariants(), "primary-gradient w-full")}
          >
            Go to Sign In page
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
