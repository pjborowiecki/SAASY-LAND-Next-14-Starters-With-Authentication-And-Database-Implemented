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
}

export const runtime = "edge"
export const preferredRegion = siteConfig.hostingRegion
