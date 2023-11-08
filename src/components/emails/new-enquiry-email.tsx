import { Body } from "@react-email/body"
import { Container } from "@react-email/container"
import { Head } from "@react-email/head"
import { Heading } from "@react-email/heading"
import { Hr } from "@react-email/hr"
import { Html } from "@react-email/html"
import { Preview } from "@react-email/preview"
import { Section } from "@react-email/section"
import { Tailwind } from "@react-email/tailwind"
import { Text } from "@react-email/text"

interface NewEnquiryEmailProps {
  name: string
  email: string
  message: string
}

export function NewEnquiryEmail({
  name,
  email,
  message,
}: NewEnquiryEmailProps): JSX.Element {
  const previewText = `Piotr, you have a new enquiry from ${email}!`
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
              <Heading>Exciting times!</Heading>
              <Hr className="my-2" />
              <Heading>New enquiry from {email}</Heading>
              <Text>
                {name} has sent you a message from your website. Their email is{" "}
                <span className="font-bold">{email}</span> and this is what they
                said:
              </Text>
            </Section>
            <Section>
              <Text>{message}</Text>
            </Section>
            <Section></Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
