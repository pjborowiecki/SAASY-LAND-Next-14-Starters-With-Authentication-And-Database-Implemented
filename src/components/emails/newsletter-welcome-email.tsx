import { Body } from "@react-email/body"
import { Container } from "@react-email/container"
import { Head } from "@react-email/head"
import { Heading } from "@react-email/heading"
import { Hr } from "@react-email/hr"
import { Html } from "@react-email/html"
import { Link } from "@react-email/link"
import { Preview } from "@react-email/preview"
import { Section } from "@react-email/section"
import { Tailwind } from "@react-email/tailwind"
import { Text } from "@react-email/text"
import {env} from "@/env.mjs"

export function NewsletterWelcomeEmail(): JSX.Element {
  const previewText = "Hello and welcome to SaaSy Land!"

  return (
    <Html>
      <Head>
        <title>SaaSy Land Newsletter</title>
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto bg-zinc-50 font-sans">
          <Container className="mx-auto my-[40px] max-w-2xl rounded p-4">
            <Section className="mt-4">
              <Heading className="text-center text-2xl font-semibold text-zinc-950">
                SaaSy Land
              </Heading>
              <Hr className="my-4" />
              <Heading className="text-center text-3xl font-semibold text-zinc-800">
                Welcome to SaaSy Land!
              </Heading>
              <Text className="mb-0 mt-6 text-center text-base">
                {`We're`} so glad {`you're`} here. {`We're`} excited to share
                our passion for online startups with you.
              </Text>
              <Text className="m-0 text-center text-base">
                {`We'll`} be sending you a newsletter every month.
              </Text>
            </Section>

            <Section className="mt-4 text-center text-zinc-400">
              <Text className="my-4">
                {`We're`} looking forward to seeing you around! If you have any
                questions, please {`don't`} hesitate to reach out to us at{" "}
                <Link
                  href={`mailto:${env.RESEND_EMAIL_FROM}`}
                  className="text-blue-500 underline"
                >
                  {env.RESEND_EMAIL_FROM}
                </Link>
              </Text>
              <Text className="mb-0 mt-4">
                @ SaaSyLand.com {new Date().getFullYear()}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
