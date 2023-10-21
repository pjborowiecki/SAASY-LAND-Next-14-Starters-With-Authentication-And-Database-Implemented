import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="container flex w-full flex-col items-center gap-16 pt-16 lg:pt-32"
    >
      <div className="flex w-full flex-col gap-8 xl:px-[2vw] 2xl:px-0">
        <h2 className="bg-gradient-to-br from-customOrange-500 to-customOrange-400 bg-clip-text text-[10vw] font-black leading-[120%] tracking-normal text-transparent md:leading-[110%] lg:text-[5.4vw] xl:text-[6vw] 2xl:text-[78px]">
          Discover our <br className="" />
          <span className="text-primary"> wholesome</span> features
        </h2>
        <p className="pr-[12vw] text-[6vw] leading-[130%] tracking-normal text-customDark-400 dark:text-customLight-400 sm:pr-[20vw] md:pr-[3vw] md:text-[4vw] lg:pr-[2vw] lg:text-[2.4vw] 2xl:pr-0 2xl:text-[32px]">
          Advanced authentication, several database and ORM options, blogging
          with Markdown and MDX, email support, Stripe payments, TailwindCSS
          with ShadCN styling, and much more. <br className="md:hidden" /> SaaSy
          Land provides you with the boilerplate code you need to launch your
          product faster than ever before.
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        <Card className="rounded-md bg-customLight-700 dark:bg-customDark-300 dark:hover:bg-customDark-400">
          <CardHeader>
            <CardTitle>Authentication</CardTitle>
            <CardDescription>
              Advanced authentication with NextAuth.js or Supabase
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter></CardFooter>
        </Card>

        <Card className="rounded-md bg-customLight-700 dark:bg-customDark-300 dark:hover:bg-customDark-400">
          <CardHeader>
            <CardTitle>Database connection</CardTitle>
            <CardDescription>
              Several database and ORM configuration options
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter></CardFooter>
        </Card>

        <Card className="rounded-md bg-customLight-700 dark:bg-customDark-300 dark:hover:bg-customDark-400">
          <CardHeader>
            <CardTitle>Styling</CardTitle>
            <CardDescription>
              Modern and flexible styling, using TailwindCSS and ShadCN-UI
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter></CardFooter>
        </Card>

        <Card className="rounded-md bg-customLight-700 dark:bg-customDark-300 dark:hover:bg-customDark-400">
          <CardHeader>
            <CardTitle>Emails and newsletter</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter></CardFooter>
        </Card>

        <Card className="rounded-md bg-customLight-700 dark:bg-customDark-300 dark:hover:bg-customDark-400">
          <CardHeader>
            <CardTitle>Blogging</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter></CardFooter>
        </Card>

        <Card className="rounded-md bg-customLight-700 dark:bg-customDark-300 dark:hover:bg-customDark-400">
          <CardHeader>
            <CardTitle>Payments</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </section>
  )
}
