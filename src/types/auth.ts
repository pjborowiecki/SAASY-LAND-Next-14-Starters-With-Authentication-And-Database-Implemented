import type { DefaultSession } from "next-auth"

export type UserRole = "user" | "admin"

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string
      role: UserRole
    }
  }
}
