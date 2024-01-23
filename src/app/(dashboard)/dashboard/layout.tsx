import * as React from "react"
import { redirect } from "next/navigation"
import { auth } from "@/auth"

import { DEFAULT_UNAUTHENTICATED_REDIRECT } from "@/config/defaults"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps): Promise<JSX.Element> {
  const session = await auth()
  if (!session) redirect(DEFAULT_UNAUTHENTICATED_REDIRECT)

  return <div>{children}</div>
}
