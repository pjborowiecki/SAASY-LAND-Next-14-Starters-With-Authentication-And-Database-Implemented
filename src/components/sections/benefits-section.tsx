import Image from "next/image"
import Balancer from "react-wrap-balancer"

import { siteConfig } from "@/config/site"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function BenefitsSection(): JSX.Element {
  return (
    <section id="about-section" aria-label="about section" className="w-full">
      <div className="container grid max-w-6xl justify-center gap-16">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-urbanist text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <Balancer>
              Why{" "}
              <span className="relative bg-gradient-to-r from-pink-600 to-purple-400 bg-clip-text font-extrabold text-transparent">
                Should You Care?
              </span>
            </Balancer>
          </h2>
          <h3 className="max-w-[42rem] text-muted-foreground sm:text-xl sm:leading-8">
            <Balancer>
              Your competitors are already using{" "}
              <span className="font-semibold text-foreground">
                {siteConfig.name}
              </span>{" "}
              and similar products, gaining time and competitive advantage.
              Don&apos;t get left behind!
            </Balancer>
          </h3>
        </div>

        <div className="grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <div className="space-y-4 md:mt-20 md:space-y-6">
            <Card
              id="1"
              className="h-fit bg-gradient-to-br from-pink-600/10 to-purple-400/10 transition-all duration-1000 ease-out md:hover:-translate-y-3"
            >
              <CardHeader>
                <CardDescription className="py-2 text-base font-medium tracking-wide text-muted-foreground">
                  Incredible Time Saver
                </CardDescription>
                <CardTitle className="font-urbanist text-3xl font-black tracking-wide">
                  <Balancer>
                    Get a Head Start <br className="hidden md:inline-block" />{" "}
                    on Your Competitors
                  </Balancer>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-base leading-8 tracking-wide text-muted-foreground">
                  <Balancer>
                    Since everything is professionally configured and up to
                    standards, you save a tremendous amount of time and effort,
                    which you can now spend focusing on what really matters -
                    core functionality, unique to your business.
                  </Balancer>
                </p>
                <div>
                  <div className="pr-8">
                    <div className="relative z-10 flex flex-col gap-3 rounded-xl bg-background p-4 text-center shadow-xl">
                      <p className="text-3xl font-bold text-pink-800 dark:text-pink-600">
                        162.9k
                      </p>
                      <p className="text-xs font-bold tracking-wide text-purple-600 dark:text-purple-300">
                        Last 7 Days Website Visits
                      </p>
                      <p className="text-xs text-muted-foreground">
                        23% Increase from Last Week
                      </p>
                    </div>
                  </div>
                  <div className="-mt-14 pl-8">
                    <div className="flex flex-col gap-3 rounded-xl bg-background p-4 text-center opacity-30 shadow-xl">
                      <p className="text-3xl font-bold">132.7k</p>
                      <p className="text-xs font-bold tracking-wide">
                        Last 14 Days Website Visits
                      </p>
                      <p className="text-xs text-muted-foreground">
                        17% Increase from Last Week
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              id="2"
              className="h-fit bg-gradient-to-br from-pink-600/10 to-purple-400/10 transition-all duration-1000 ease-out md:hover:-translate-y-3"
            >
              <CardHeader>
                <CardDescription className="py-2 text-base font-medium tracking-wide text-muted-foreground">
                  Latest and Greatest in Tech
                </CardDescription>
                <CardTitle className="font-urbanist text-3xl font-black tracking-wide">
                  <Balancer>Take Advantage of Modern Technologies</Balancer>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-0">
                <p className="px-4 text-base leading-8 tracking-wide text-muted-foreground">
                  <Balancer>
                    We are constantly updating our templates to take advantage
                    of the latest and greatest technologies, so you can be sure
                    that your website is always up to date and as fast as
                    possible.
                  </Balancer>
                </p>
                <Image
                  width={600}
                  height={400}
                  alt="illustration"
                  src="/images/benefits/3.jpeg"
                  className="overflow-hidden rounded-b-xl"
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4 md:space-y-6">
            <Card
              id="3"
              className="h-fit bg-gradient-to-br from-pink-600/10 to-purple-400/10 transition-all duration-1000 ease-out md:hover:-translate-y-3"
            >
              <CardHeader>
                <CardDescription className="py-2 text-base font-medium tracking-wide text-muted-foreground">
                  High Quality Implementation
                </CardDescription>
                <CardTitle className="font-urbanist text-3xl font-black tracking-wide">
                  <Balancer>Know Everything Works As Expected</Balancer>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-0">
                <p className="px-4 text-base leading-8 tracking-wide text-muted-foreground">
                  <Balancer>
                    We spent countless hours researching, exploring docs and
                    testing the best way to implement the most important
                    features. We have done the hard work so you don&apos;t have
                    to.
                  </Balancer>
                </p>
                <Image
                  width={600}
                  height={400}
                  alt="illustration"
                  src="/images/benefits/2.jpeg"
                  className="overflow-hidden rounded-b-xl"
                />
              </CardContent>
            </Card>

            <Card
              id="4"
              className="h-fit w-full bg-gradient-to-br from-pink-600/10 to-purple-400/10 transition-all duration-1000 ease-out md:hover:-translate-y-3"
            >
              <CardHeader>
                <CardDescription className="py-2 text-base font-medium tracking-wide text-muted-foreground">
                  Flexibility and Support
                </CardDescription>
                <CardTitle className="font-urbanist text-3xl font-black tracking-wide">
                  <Balancer>
                    Easily Customize <br /> Every Single Detail
                  </Balancer>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-0">
                <p className="px-4 text-base leading-8 tracking-wide text-muted-foreground">
                  <Balancer>
                    With the help of our detailed documentation, you can now
                    easily customize every single detail of the template. Should
                    you need any help, we are a message away.
                  </Balancer>
                </p>
                <Image
                  width={600}
                  height={400}
                  alt="illustration"
                  src="/images/benefits/1.jpeg"
                  className="overflow-hidden rounded-b-xl"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
