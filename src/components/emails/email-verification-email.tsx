import * as React from "react"
import { env } from "@/env.mjs"
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"

import { siteConfig } from "@/config/site"

interface EmailVerificationEmailProps {
  email: string
  emailVerificationToken: string
}

export function EmailVerificationEmail({
  email,
  emailVerificationToken,
}: Readonly<EmailVerificationEmailProps>) {
  const previewText = `${siteConfig.name} email verification.`
  return (
    <Html lang="en">
      <Head>
        <title>{previewText}</title>
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body>
          <Container>
            <Section>
              <Text className="text-xl">Hi,</Text>
              <Text className="text-base">
                Your email address, {email}, was recently used to sign up at{" "}
                <span className="font-semibold tracking-wide">
                  {siteConfig.name}
                </span>
                .
              </Text>
              <Text className="text-base">
                Please verify this address by clicking the button below
              </Text>
              <Button
                href={`${env.NEXT_PUBLIC_APP_URL}/signup/verify-email?token=${emailVerificationToken}`}
                className="inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-r from-customOrange-500 to-customOrange-400 px-8 font-medium text-customLight-700 transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Verify email now
              </Button>
            </Section>

            <Section>
              <Text className="text-xs">
                If you didn&apos;t sign up at {siteConfig.name}, just ignore and
                delete this message.
              </Text>
              <Text className="text-base font-medium">
                Enjoy{" "}
                <span className="font-semibold tracking-wide">
                  {siteConfig.name}
                </span>{" "}
                and have a nice day!
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
