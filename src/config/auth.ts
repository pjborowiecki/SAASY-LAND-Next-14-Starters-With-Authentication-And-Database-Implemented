import { prisma } from "@/db/prisma"
import { env } from "@/env.mjs"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from "bcrypt"
import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import EmailProvider from "next-auth/providers/email"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  debug: env.NODE_ENV === "development",
  secret: env.AUTH_SECRET,
  // session: { strategy: "database" },
  session: {
    strategy: "jwt",
    maxAge: 2592000, // 30 days
    updateAge: 86400, // 24 hours
  },
  pages: {
    signIn: "/signin",
    signOut: "/signout",
  },
  providers: [
    GitHub,
    Google,
    // EmailProvider({
    //   server: env.AUTH_EMAIL_SERVER,
    //   from: env.AUTH_EMAIL_FROM,
    // }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials.email || !credentials.password) {
          return null
        }

        console.log("credentials:", credentials)

        const user = await prisma.user.findUnique({
          where: { email: String(credentials.email) },
        })

        if (!user) {
          return null
        }

        const passwordIsValid = await bcrypt.compare(
          String(credentials.password),
          String(user.passwordHash)
        )

        if (!passwordIsValid) {
          return null
        }

        return user
      },
    }),
  ],
}
