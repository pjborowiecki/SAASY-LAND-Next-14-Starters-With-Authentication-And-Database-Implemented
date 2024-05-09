import type { DefaultSession } from "next-auth"

export type Role = "user" | "admin"

declare module "next-auth" {
  interface User {
    role: Role
  }

  interface Session {
    user: DefaultSession["user"] & {
      id: string
      role: UserRole
    }
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    id: string
    role: Role
  }
}
