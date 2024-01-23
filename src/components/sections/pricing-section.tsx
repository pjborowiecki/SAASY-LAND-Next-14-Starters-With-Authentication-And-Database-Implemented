"use client"

import * as React from "react"
import Balancer from "react-wrap-balancer"

import { siteConfig } from "@/config/site"
import { pricingPlans } from "@/data/pricing-plans"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Icons } from "@/components/icons"

export function PricingSection(): JSX.Element {
  const [yearlyBilling, setYearlyBilling] = React.useState<boolean>(false)
  return (
    <section
      id="pricing-section"
      aria-label="pricing section"
      className="w-full"
    >
      <div className="container grid max-w-6xl gap-4 md:gap-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-urbanist text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <Balancer>
              It&apos;s{" "}
              <span className="bg-gradient-to-r from-pink-600 to-purple-400 bg-clip-text text-transparent">
                Free Forever!
              </span>
            </Balancer>
          </h2>
          <h3 className="max-w-[42rem] text-muted-foreground sm:text-xl sm:leading-8">
            <Balancer>
              {siteConfig.name} is completely free and open source. The pricing
              section is there to serve as an example of how you could set it up
              for your own SaaS product. We have no plans and no intentions to
              make this a paid product.
            </Balancer>
          </h3>
        </div>

        <div className="my-4 flex items-center justify-center gap-4 text-lg">
          <span>Monthly</span>
          <Switch
            checked={yearlyBilling}
            onCheckedChange={() => setYearlyBilling((prev) => !prev)}
            role="switch"
            aria-label="switch-year"
          />
          <span>Annual</span>
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:gap-6">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "flex flex-col transition-all duration-1000 ease-out hover:opacity-80 md:hover:-translate-y-3",
                plan.name === "Standard" &&
                  "border-pink-600/60 bg-gradient-to-r from-pink-600/10 to-purple-400/10"
              )}
            >
              <CardHeader className="overflow-hidden rounded-t-lg bg-gradient-to-r from-pink-600/10 to-purple-400/10">
                <CardTitle className="font-urbanist text-2xl tracking-wide">
                  <Balancer>{plan.name}</Balancer>
                </CardTitle>

                <CardDescription className="text-sm">
                  <Balancer>{plan.description}</Balancer>
                </CardDescription>

                <div className="flex flex-col gap-4 py-2">
                  <div className="flex gap-2 text-4xl font-semibold md:gap-1 md:text-2xl lg:gap-2 lg:text-4xl">
                    <span className="flex items-center justify-center text-3xl font-normal md:text-2xl lg:text-3xl">
                      $
                    </span>
                    <span
                      className={cn(
                        yearlyBilling && "text-muted-foreground/60 line-through"
                      )}
                    >
                      {plan.prices.monthly}
                    </span>

                    {yearlyBilling && <span>{plan.prices.yearly / 12}</span>}

                    <span className="flex items-end text-lg font-semibold md:items-center md:text-base lg:items-end lg:text-lg">
                      / month
                    </span>
                  </div>

                  {yearlyBilling && plan.prices.monthly > 0 && (
                    <p className="text-xs font-bold text-muted-foreground">
                      <Balancer>
                        You will be charged{" "}
                        <span className="text-foreground">
                          ${plan.prices.yearly}
                        </span>{" "}
                        once a year, starting today
                      </Balancer>
                    </p>
                  )}
                </div>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col justify-between text-sm lg:text-base">
                <div className="grid gap-3 py-8">
                  <ul className="flex flex-col gap-3">
                    {plan.features.map((item) => (
                      <li className="flex items-center gap-2" key={item}>
                        <Icons.check className="size-4" />
                        <Balancer>{item}</Balancer>
                      </li>
                    ))}
                  </ul>

                  <ul className="flex flex-col gap-2">
                    {plan.limitations.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-muted-foreground"
                      >
                        <Icons.close className="size-4" />
                        <Balancer>{item}</Balancer>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button
                  variant="outline"
                  className="h-10 w-full border bg-gradient-to-br from-pink-600/20 to-purple-400/20 font-bold tracking-wide"
                >
                  Purchase
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
