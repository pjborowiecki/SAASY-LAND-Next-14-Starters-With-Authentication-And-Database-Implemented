import * as React from "react"
import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/auth"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps): Promise<JSX.Element> {
  const user = await getCurrentUser()
  if (!user) redirect("/signin")

  return <div>{children}</div>
}
