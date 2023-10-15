import { siteConfig } from "@/config/site"

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      Features Page
    </div>
  )
}

export const runtime = "edge"
export const preferredRegion = siteConfig.hostingRegion
