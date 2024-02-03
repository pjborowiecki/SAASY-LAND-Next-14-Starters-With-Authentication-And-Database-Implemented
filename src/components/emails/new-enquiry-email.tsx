import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"

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
