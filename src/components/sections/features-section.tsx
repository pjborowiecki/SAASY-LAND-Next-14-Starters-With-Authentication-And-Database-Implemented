"use client"

import * as React from "react"
import Image from "next/image"
import { type Feature } from "@/types"
import Balancer from "react-wrap-balancer"

import { features } from "@/data/features"
import { cn } from "@/lib/utils"

export function FeaturesSection() {
  const [activeFeature, setActiveFeature] = React.useState<Feature | null>(
    features?.[0] || null
  )

  return (
    <section
      id="features-section"
      aria-label="features section"
      className="w-full"
    >
      <div className="container relative grid gap-16">
        <div className="flex w-full flex-col items-center gap-6 text-center">
          <h2 className="font-urbanist text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <Balancer>
              Discover Our <br />
              <span className="bg-gradient-to-r from-pink-600 to-purple-400 bg-clip-text text-transparent">
                Wholesome Features
              </span>
            </Balancer>
          </h2>
          <h3 className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            <Balancer>
              Take advantage of a fully authentication, data storage, payments,
              emails, and more available to you instantly.
            </Balancer>
          </h3>
        </div>

        <div className="grid items-center justify-center gap-2 sm:gap-0 md:grid-cols-12">
          <div className="flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 md:col-span-5">
            <div className="md::flex-row flex w-full flex-col gap-2 whitespace-nowrap sm:mx-auto md:mx-0 md:block md:gap-0 md:gap-y-1">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className={cn(
                    "group relative rounded-2xl text-center md:rounded-l-xl md:rounded-r-none md:p-6 md:text-start md:hover:bg-gradient-to-br md:hover:from-pink-600/20 md:hover:to-purple-400/20",
                    activeFeature === feature
                      ? "md:bg-gradient-to-br md:from-pink-600/10 md:to-purple-400/10"
                      : "md:cursor-pointer md:bg-background"
                  )}
                  onClick={() => setActiveFeature(feature)}
                >
                  <h3 className="text-base font-semibold sm:text-xl md:text-sm lg:text-xl">
                    {feature.title}
                  </h3>
                  <p className="mt-2 hidden text-sm text-muted-foreground sm:text-lg sm:leading-6 xl:block">
                    <Balancer>{feature.description}</Balancer>
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:block lg:col-span-7">
            <div className="relative w-auto overflow-hidden rounded-2xl md:h-[28rem] md:w-[32rem] md:border md:shadow-2xl lg:w-[46rem] xl:h-[50rem] xl:w-[69rem] 2xl:h-[48rem] 2xl:w-[67rem]">
              <Image
                src={activeFeature ? activeFeature.image : ""}
                fill
                alt={activeFeature ? activeFeature.title : ""}
                className="size-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
