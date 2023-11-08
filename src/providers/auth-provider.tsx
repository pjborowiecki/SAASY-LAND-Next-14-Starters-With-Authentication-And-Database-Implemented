"use client"

import * as React from "react"
import { SessionProvider } from "next-auth/react"

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  return <SessionProvider>{children}</SessionProvider>
}
