import { siteConfig } from "@/config/site"

export default function BlogPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      Blog Page
    </div>
  )
}

export const runtime = "edge"
export const preferredRegion = siteConfig.hostingRegion
