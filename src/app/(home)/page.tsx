<<<<<<< HEAD
import { prisma } from "@/config/prisma"

export default function Home() {
  const myUser = prisma.user.findFirst()

  return <main>hello world</main>
=======
import { siteConfig } from "@/config/site"
import { AboutSection } from "@/components/sections/about-section"
import { FAQSection } from "@/components/sections/faq"
import { FeaturesSection } from "@/components/sections/features-section"
import { HeroSection } from "@/components/sections/hero-section"
import { NewsletterSection } from "@/components/sections/newsletter-section"
import { PricingSection } from "@/components/sections/pricing-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"

export default function LandingPage() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <NewsletterSection />
    </div>
  )
>>>>>>> fb7f8be752c8c9e879c926c55b442b13c2d8507a
}

export const runtime = "edge"
export const preferredRegion = siteConfig.hostingRegion
