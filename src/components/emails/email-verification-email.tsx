import * as React from "react"
import { env } from "@/env.mjs"

interface EmailVerificationEmailProps {
  email: string
  emailVerificationToken: string
}

export function EmailVerificationEmail({
  email,
  emailVerificationToken,
}: Readonly<EmailVerificationEmailProps>) {
  return (
    <div>
      <h1>Hi!</h1>
      <p>
        Please verify your email address ({email}) by clicking the link below.
      </p>
      <a
        href={`${env.NEXT_PUBLIC_APP_URL}/signup/verify-email?token=${emailVerificationToken}`}
      >
        Verify email now
      </a>
    </div>
  )
}
