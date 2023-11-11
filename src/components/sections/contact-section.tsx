import Balancer from "react-wrap-balancer"

import { ContactForm } from "@/components/forms/contact-form"

export function ContactSection(): JSX.Element {
  return (
    <section
      id="contact-section"
      aria-label="contact section"
      className="w-full pb-8 sm:pb-16 md:pb-32"
    >
      <div className="container grid max-w-4xl grid-cols-1 justify-center gap-8 md:gap-16">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-urbanist text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <Balancer>
              Let&apos;s{" "}
              <span className="bg-gradient-to-r from-pink-600 to-purple-400 bg-clip-text text-transparent">
                Get in Touch
              </span>
            </Balancer>
          </h2>
          <h3 className="max-w-[42rem] text-muted-foreground sm:text-xl sm:leading-8">
            <Balancer>
              Feel free to email us with any questions you might have. While we
              are always happy to help, please keep in mind that this is a free
              product and we cannot guarantee any response times. We would also
              love to know your feedback!
            </Balancer>
          </h3>
        </div>

        <ContactForm />
      </div>
    </section>
  )
}
