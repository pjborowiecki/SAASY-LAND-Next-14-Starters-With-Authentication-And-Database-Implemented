import Link from "next/link"
import Balancer from "react-wrap-balancer"

import { siteConfig } from "@/config/site"
import { cn, getGitHubStars } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export async function HeroSection() {
  const gitHubStars = await getGitHubStars()

  return (
    <section
      id="hero"
      aria-label="hero section"
      className="w-full pb-16 pt-24 md:pb-20 md:pt-32 lg:pb-28 lg:pt-48"
    >
      <div className="container flex flex-col items-center gap-6 text-center">
        {gitHubStars ? (
          <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
            <Badge
              variant="outline"
              aria-hidden="true"
              className="rounded-md px-3.5 py-1.5"
            >
              <Icons.gitHub className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
              {gitHubStars} stars on GitHub
            </Badge>
            <span className="sr-only">GitHub</span>
          </Link>
        ) : null}
        <h1
          className="animate-fade-up font-urbanist text-4xl font-extrabold tracking-tight opacity-0 sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <Balancer>
            Fast-Track Your Business Launch with{" "}
            <span className="relative bg-gradient-to-r from-indigo-500 to-purple-500/80 bg-clip-text font-extrabold text-transparent">
              SaaSy Land
            </span>
          </Balancer>
        </h1>

        <p
          className="max-w-[42rem] animate-fade-up leading-normal text-muted-foreground opacity-0 sm:text-xl sm:leading-8"
          style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
        >
          <Balancer>
            Your shortcut to startup success. The ultimate, modern, open-source
            Next.js template, with everything you need set up and ready to use.
          </Balancer>
        </p>

        <div
          className="flex animate-fade-up justify-center space-x-2 opacity-0 md:space-x-4"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
        >
          <Link href="/signup" className={cn(buttonVariants(), "")}>
            Get Started
          </Link>

          <Link
            href={siteConfig.links.github}
            className={cn(buttonVariants({ variant: "outline" }), "")}
          >
            See on GitHub
          </Link>
        </div>
      </div>
    </section>
  )
}
