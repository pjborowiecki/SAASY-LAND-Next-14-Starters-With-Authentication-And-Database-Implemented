import { BenefitsSection } from "@/components/sections/benefits-section"
import { ContactSection } from "@/components/sections/contact-section"
import { FAQSection } from "@/components/sections/faq-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { HeroSection } from "@/components/sections/hero-section"
import { NewsletterSection } from "@/components/sections/newsletter-section"
import { PricingSection } from "@/components/sections/pricing-section"
import { TechSection } from "@/components/sections/tech-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"

export default function LandingPage(): JSX.Element {
  return (
    <div className="grid w-full grid-cols-1 items-center justify-center gap-16 md:gap-32">
      <HeroSection />
      <TechSection />
      <BenefitsSection />
      <FeaturesSection />
      <NewsletterSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <ContactSection />
    </div>
  )
}
