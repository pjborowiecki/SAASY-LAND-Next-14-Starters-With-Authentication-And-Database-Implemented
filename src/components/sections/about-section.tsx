import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/icons"

export function AboutSection() {
  return (
    <section
      id="about"
      className="container flex flex-col gap-8 pt-16 lg:pt-32"
    >
      <div className="lg:max-w-[60vw] lg:pl-[1.6vw] xl:pl-[2vw] 2xl:pl-0">
        <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
          <Badge
            variant="secondary"
            aria-hidden="true"
            className="mb-2 rounded-full bg-customLight-700 px-3.5 py-1.5 hover:opacity-80 dark:bg-customDark-400"
          >
            <Icons.gitHub className="mr-2 h-3.5 w-3.5" />
            Get free from GitHub now
            <span className="sr-only">Get free from GitHub</span>
          </Badge>
        </Link>
        <h2 className="bg-gradient-to-br from-customOrange-500 to-customOrange-400 bg-clip-text text-[10vw] font-black leading-[120%] tracking-normal text-transparent md:leading-[110%] lg:text-[5.4vw] xl:text-[6vw] 2xl:text-[78px]">
          Build, launch, <br className="" /> and profit
          <span className="text-primary"> faster</span>
        </h2>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-8 pr-[12vw] text-[6vw] leading-[130%] tracking-normal text-customDark-400 dark:text-customLight-400 sm:pr-[20vw] md:gap-16 md:pr-[3vw] md:text-[4vw] lg:grid lg:grid-cols-2 lg:pr-0 lg:text-[2.4vw] xl:text-[2.2vw] 2xl:text-[32px]">
        <div className="lg:pl-[1.6vw] xl:pl-[2vw] 2xl:pl-0">
          <p>
            Stop reinventing the wheel and focus on what really matters - core
            functionality, unique to your business idea. Your competitors are
            already using SaaSy Land or similar products to gain competitive
            advantage.
          </p>
        </div>
        <div className="lg:pr-[1.6vw] xl:pl-[2vw] 2xl:pl-0">
          <p>
            <span className="font-bold text-primary">SaaSy Land</span> is a
            modern, open-source, full-stack boilerplate for building and
            launching SaaS products faster. Built with TypeScript, NextJS,
            NextAuth, Tailwind, Stripe, and several other technologies.
          </p>
        </div>
      </div>
    </section>
  )
}
