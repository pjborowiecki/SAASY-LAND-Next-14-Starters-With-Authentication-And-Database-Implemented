import { AboutSection } from "@/components/sections/about-section"
import { FAQSection } from "@/components/sections/faq-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { HeroSection } from "@/components/sections/hero-section"
import { NewsletterSection } from "@/components/sections/newsletter-section"
import { PricingSection } from "@/components/sections/pricing-section"
import { TechSection } from "@/components/sections/tech-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"

export default function LandingPage() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <HeroSection />
      <TechSection />
      <AboutSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <NewsletterSection />
    </div>
  )
}
