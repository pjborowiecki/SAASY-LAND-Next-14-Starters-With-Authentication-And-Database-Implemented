import { siteConfig } from "@/config/site"

export default function FAQPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      FAQ Page
    </div>
  )
}

export const runtime = "edge"
export const preferredRegion = siteConfig.hostingRegion
