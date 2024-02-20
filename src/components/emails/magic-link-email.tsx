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

interface MagicLinkEmailProps {
  identifier: string
  url: string
}

export function MagicLinkEmail({
  identifier,
  url,
}: MagicLinkEmailProps): JSX.Element {
  const previewText = `${siteConfig.name} magic link sign in.`
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
              <Text>Hi,</Text>
              <Text>
                Someone just requested a Sign In magic link for {identifier}
              </Text>
              <Text>If this was you, you can sign in here:</Text>
              <Button href={url}>Sign in</Button>
            </Section>
            <Section>
              <Text>
                If you didn&apos;t try to login, you can safely ignore this
                email.
              </Text>
            </Section>
            <Section>
              <Text className="text-base font-medium">
                Enjoy{" "}
                <span className="font-semibold tracking-wide">
                  {siteConfig.name}
                </span>{" "}
                and have a nice day!
              </Text>
            </Section>
            <Section>
              <Text className="text-xs">
                Hint: You can set a permanent password in Dashboard → Settings
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
