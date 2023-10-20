import * as React from "react"
import { env } from "@/env.mjs"

interface ResetPasswordEmailProps {
  email: string
  resetPasswordToken: string
}

export function ResetPasswordEmail({
  email,
  resetPasswordToken,
}: Readonly<ResetPasswordEmailProps>) {
  return (
    <div>
      <h1>Hi!</h1>
      <p>
        You recently requested to reset your password for the account associated
        with {email} email address.
      </p>

      <p>
        To reset your password, click on the link below and follow the
        instructions:
      </p>
      <a
        href={`${env.NEXT_PUBLIC_APP_URL}/signin/password-update?token=${resetPasswordToken}`}
      >
        Reset password now
      </a>

      <p>If you did not request a password reset, please ignore this email.</p>
    </div>
  )
}
