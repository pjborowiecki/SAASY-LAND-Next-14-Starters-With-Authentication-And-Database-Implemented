import Balancer from "react-wrap-balancer"

import { NewsletterSignUpForm } from "@/components/forms/newsletter-signup-form"

export function NewsletterSection(): JSX.Element {
  return (
    <section
      id="newsletter-section"
      aria-label="newsletter section"
      className="w-full bg-background py-16"
    >
      <div className="container flex max-w-6xl flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-urbanist text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <Balancer>
              Sing Up to{" "}
              <span className="bg-gradient-to-r from-pink-600 to-purple-400 bg-clip-text text-transparent">
                Our Newsletter
              </span>
            </Balancer>
          </h2>
          <h3 className="max-w-[42rem] text-muted-foreground sm:text-xl sm:leading-8">
            <Balancer>
              Never miss a thing with our newsletter. We will send you updates
              on major released or changes to the product. We will never spam
              you.
            </Balancer>
          </h3>
        </div>

        <div className="w-full max-w-lg md:max-w-xl">
          <NewsletterSignUpForm />
        </div>
      </div>
    </section>
  )
}
