import NextAuth from "next-auth"
import { linkOAuthAccount } from "@/actions/auth"
import { getUserById } from "@/actions/user"
import { env } from "@/env.mjs"
import { PrismaAdapter } from "@auth/prisma-adapter"

import authConfig from "@/config/auth"
import { prisma } from "@/config/db"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  debug: env.NODE_ENV === "development",
  pages: {
    signIn: "/signin",
    signOut: "/signout",
    verifyRequest: "/signin/magic-link-signin",
    error: "/error",
  },
  secret: env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 daysd
    updateAge: 24 * 60 * 60, // 24 hours
  },
  events: {
    async linkAccount({ user }) {
      if (user.id) await linkOAuthAccount(user.id)
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!user.id) return false
      if (account?.provider !== "credentials") return true

      const existingUser = await getUserById(user.id)
      return !existingUser?.emailVerified ? false : true
    },
  },
  adapter: PrismaAdapter(prisma),
  ...authConfig,
})
