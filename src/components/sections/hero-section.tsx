import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/icons"

export function HeroSection() {
  return (
    <section
      id="hero"
      className="h-auto w-full pt-24 md:justify-center lg:pt-16"
    >
      <div className="container grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-2">
        <div className="flex flex-col justify-center">
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
          <div className="flex w-full flex-col gap-8">
            <h1 className="text-[10vw] font-black leading-[120%] tracking-normal md:leading-[110%] lg:text-[5.4vw] xl:text-[5.2vw] 2xl:text-[78px]">
              <span className="bg-gradient-to-br from-customOrange-500 to-customOrange-400 bg-clip-text text-transparent">
                Fast-Track Your Business Launch with
              </span>
              <span className="text-primary"> SaaSy Land</span>
            </h1>
            <p className="w-full pr-[3vw] text-[5.6vw] leading-[130%] tracking-normal text-customDark-400 dark:text-customLight-400 sm:mr-[4vw] sm:pr-[6vw] sm:text-[5vw] md:pr-[4vw] md:text-[3.6vw] lg:pr-0 lg:text-[2.2vw] xl:pr-[2vw] xl:text-[1.8vw] 2xl:text-[30px]">
              Your shortcut to startup success. The ultimate, modern,
              open-source NextJS template, with everything you need, set up and
              ready to use.
            </p>
          </div>
        </div>

        <div className="flex h-auto w-full items-center justify-center">
          <img
            src="/images/hero-illustration.png"
            alt="SaaSy Land illustration"
            className="h-full w-full scale-[120%] object-contain sm:scale-[110%] lg:scale-[90%]"
          />
        </div>
      </div>

      {/* Warning */}
      <div className="container w-full pb-16 pt-4">
        <Alert className="w-fit rounded-md bg-customDark-400 text-customLight-400">
          <AlertTitle className="ml-2 text-xl">Heads up!</AlertTitle>
          <AlertDescription className="ml-2 text-lg text-customLight-400/70">
            This template is currently under construction and not ready to use
            in production. Please check back soon.
          </AlertDescription>
        </Alert>
      </div>

      {/* Logos */}
      <div className="w-full bg-gradient-to-br from-customOrange-500 to-orange-300 p-8 text-customDark-200">
        <div className="container grid grid-cols-2 place-items-center items-center justify-center gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-6">
          <Icons.next className="h-9 w-40 transition-all duration-150 ease-in-out hover:opacity-80" />
          <Icons.drizzle className="h-12 w-12 scale-[190%] transition-all duration-150 ease-in-out hover:opacity-80" />
          <Icons.prisma className="h-12 w-40 transition-all duration-150 ease-in-out hover:opacity-80" />
          <Icons.planetScale className="h-12 w-12 transition-all duration-150 ease-in-out hover:opacity-80" />
          <Icons.neon className="h-9 w-32 transition-all duration-150 ease-in-out hover:opacity-80" />
          <Icons.stripe className="h-9 w-40 transition-all duration-150 ease-in-out hover:opacity-80" />
        </div>
      </div>
    </section>
  )
}
