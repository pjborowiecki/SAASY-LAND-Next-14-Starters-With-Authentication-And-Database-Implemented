import * as React from "react"
import type { User } from "@/types"

import { Footer } from "@/components/nav/footer"
import { Header } from "@/components/nav/header"

interface LandingLayoutProps {
  children: React.ReactNode
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  // const user = {
  //   email: "someuser@users.com",
  //   image: undefined,
  //   username: "some_user",
  //   firstName: "Some",
  //   lastName: "User",
  // } satisfies User

  const user = undefined

  return (
    <div className="flex flex-col">
      <Header user={user} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
