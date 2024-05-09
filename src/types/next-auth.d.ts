import type { DefaultSession } from "next-auth"

export type Role = "USER" | "ADMIN"

declare module "next-auth" {
  interface User {
    role: Role
  }

  interface Session {
    user: User & DefaultSession["user"]
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    role: Role
  }
}
