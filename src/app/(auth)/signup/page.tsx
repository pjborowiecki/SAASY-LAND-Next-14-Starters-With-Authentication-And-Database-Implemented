// import { env } from "@/env.mjs";
import { type Metadata } from "next"
import Link from "next/link"
import { env } from "@/env.mjs"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { OAuthButtons } from "@/components/auth/oauth-buttons"
import { SignUpForm } from "@/components/forms/signup-form"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Sign Up",
  description: "Sign up for an account",
}

// TODO: Might need to async this function
export default function SignUpPage() {
  // TODO: check if the user is already signed in and redirect somewhere when they are

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Card className="bg-customLight-800 dark:bg-customDark-300 max-sm:flex max-sm:h-screen max-sm:w-full max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:rounded-none max-sm:border-none sm:min-w-[370px] sm:max-w-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign up</CardTitle>
          <CardDescription className="text-customDark-400 dark:text-customLight-400">
            Choose your preferred sign up method
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OAuthButtons />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative mb-4 mt-6 flex justify-center text-xs uppercase">
              <span className="bg-customLight-800 px-2 text-customDark-400 dark:bg-customDark-300 dark:text-customLight-400">
                Or continue with
              </span>
            </div>
          </div>
          <SignUpForm />
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              aria-label="Sign in"
              href="/signin"
              className="text-primary underline-offset-4 transition-colors hover:underline"
            >
              Sign in
              <span className="sr-only">Sign in</span>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
