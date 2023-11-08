import Balancer from "react-wrap-balancer"

import { testimonials } from "@/data/testimonials"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function TestimonialsSection(): JSX.Element {
  return (
    <section
      id="testimonials-section"
      aria-label="testimonials section"
      className="w-full"
    >
      <div className="container grid max-w-6xl gap-16">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-urbanist text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <Balancer>
              Join a Growing <br /> Team of{" "}
              <span className="bg-gradient-to-r from-pink-600 to-purple-400 bg-clip-text text-transparent">
                Happy Users
              </span>
            </Balancer>
          </h2>
          <h3 className="max-w-[42rem] text-muted-foreground sm:text-xl sm:leading-8">
            <Balancer>See what our customers are saying about us.</Balancer>
          </h3>
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:gap-6">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              id={`col-${index + 1}`}
              key={`col-${index + 1}`}
              className="flex flex-col gap-4 lg:gap-6"
            >
              {testimonials
                .slice(index * 3, (index + 1) * 3)
                .map((testimonial) => (
                  <Card
                    key={testimonial.title}
                    className="h-fit bg-gradient-to-r from-pink-600/10 to-purple-400/10 transition-all duration-1000 ease-out hover:opacity-70 md:hover:-translate-y-2"
                  >
                    <CardHeader>
                      <CardTitle className="font-urbanist text-lg font-semibold tracking-wider">
                        <Balancer>{testimonial.title}</Balancer>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="leading-6 text-muted-foreground md:text-sm lg:text-base">
                      <blockquote>
                        <Balancer>&quot;{testimonial.body}&quot;</Balancer>
                      </blockquote>
                    </CardContent>
                    <CardFooter className="gap-3">
                      <Avatar className="">
                        <AvatarImage src={testimonial.avatar} />
                        <AvatarFallback className="text-xs capitalize">
                          {testimonial.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-[2px]">
                        <p className="text-base font-semibold tracking-wide">
                          <Balancer>{testimonial.name}</Balancer>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          <Balancer>{testimonial.role}</Balancer>
                        </p>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
