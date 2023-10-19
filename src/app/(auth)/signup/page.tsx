import { type Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { env } from "@/env.mjs"
import { getServerSession } from "next-auth/next"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { OAuthButtons } from "@/components/auth/oauth-buttons"
import { SignInWithEmailForm } from "@/components/forms/signin-with-email-form"
import { SignUpForm } from "@/components/forms/signup-form"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Sign Up",
  description: "Sign up for an account",
}

export default async function SignUpPage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Card className="bg-customLight-800 dark:bg-customDark-300 max-sm:flex max-sm:h-screen max-sm:w-full max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:rounded-none max-sm:border-none sm:min-w-[370px] sm:max-w-[368px]">
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
            <div className="relative mb-3 mt-6 flex justify-center text-xs uppercase">
              <span className="bg-customLight-800 px-2 text-customDark-400 dark:bg-customDark-300 dark:text-customLight-400/70">
                Or continue with magic link
              </span>
            </div>
          </div>
          <SignInWithEmailForm />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative mb-3 mt-6 flex justify-center text-xs uppercase">
              <span className="bg-customLight-800 px-2 text-customDark-400 dark:bg-customDark-300 dark:text-customLight-400/70">
                Or continue with password
              </span>
            </div>
          </div>
          <SignUpForm />
        </CardContent>
        <CardFooter className="grid gap-2">
          <div className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              aria-label="Sign in"
              href="/signin"
              className="text-primary underline-offset-4 transition-all hover:underline"
            >
              Sign in
              <span className="sr-only">Sign in</span>
            </Link>
          </div>
          <div className="text-xs text-muted-foreground">
            By continuing you agree to our{" "}
            <Link
              aria-label="Terms of Service"
              href="/tos"
              className="text-customDark-400 underline-offset-4 transition-all hover:underline dark:text-customLight-400"
            >
              ToS
            </Link>{" "}
            and
            <Link
              aria-label="Privacy Policy"
              href="/privacy"
              className="text-customDark-400 underline-offset-4 transition-all hover:underline dark:text-customLight-400"
            >
              {" "}
              Privacy Policy
            </Link>
            .
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
