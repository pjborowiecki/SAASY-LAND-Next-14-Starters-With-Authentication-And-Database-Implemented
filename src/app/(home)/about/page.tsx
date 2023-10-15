import { siteConfig } from "@/config/site"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      About Page
    </div>
  )
}

export const runtime = "edge"
export const preferredRegion = siteConfig.hostingRegion
