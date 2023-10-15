import { siteConfig } from "@/config/site"

export default function PricingPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      Pricing Page
    </div>
  )
}

export const runtime = "edge"
export const preferredRegion = siteConfig.hostingRegion
