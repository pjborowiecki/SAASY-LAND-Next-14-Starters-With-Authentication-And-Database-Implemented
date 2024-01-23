import Link from "next/link"
import Balancer from "react-wrap-balancer"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { NewsletterSignUpForm } from "@/components/forms/newsletter-signup-form"
import { Icons } from "@/components/icons"
import { ThemeToggle } from "@/components/theme-toggle"

export function Footer(): JSX.Element {
  return (
    <footer
      id="footer"
      aria-label="footer"
      className="grid gap-8 bg-background pb-8 pt-16"
    >
      <div className="container flex flex-col gap-8 sm:flex-row">
        <div className="grid flex-1 grid-cols-3 gap-4 md:gap-8">
          {siteConfig.navItemsFooter.map((item) => (
            <div
              key={item.title}
              className="space-y-1 text-center sm:text-start md:space-y-2 md:text-start"
            >
              <h4 className="text-sm font-semibold md:text-base lg:text-lg">
                <Balancer>{item.title}</Balancer>
              </h4>
              <ul className="space-y-1 md:space-y-2">
                {item.items.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      target={link?.external ? "_blank" : undefined}
                      rel={link?.external ? "noreferrer" : undefined}
                      className="text-xs text-muted-foreground underline-offset-8 transition-all hover:underline hover:opacity-70 md:text-sm lg:text-lg"
                    >
                      {link.title}
                      <span className="sr-only">{link.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hidden flex-col gap-4 sm:flex sm:w-1/3 xl:pl-24">
          <p className="text-sm font-medium leading-5 tracking-wide lg:text-base 2xl:text-lg">
            <Balancer>
              Join our newsletter today to stay up to date on features and
              important releases
            </Balancer>
          </p>

          <NewsletterSignUpForm />
        </div>
      </div>

      <div className="container flex items-center justify-between">
        <p className="text-sm text-muted-foreground xl:text-base">
          <Balancer>
            Built in public by{" "}
            <Link
              href={siteConfig.links.authorsGitHub}
              target="_blank"
              rel="noreferrer"
              className="font-semibold underline-offset-8 transition-all hover:underline hover:opacity-70"
            >
              Piotr Borowiecki.
            </Link>{" "}
            <span className="hidden md:inline-flex">
              Freely available under the MIT license. Enjoy :)
            </span>
          </Balancer>
        </p>
        <div className="flex items-center justify-center">
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ size: "icon", variant: "ghost" }),
              "rounded-full"
            )}
          >
            <Icons.gitHub className="size-[18px]" />
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  )
}
