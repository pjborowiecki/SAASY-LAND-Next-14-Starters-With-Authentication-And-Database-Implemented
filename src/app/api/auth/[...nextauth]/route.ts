import { prisma } from "@/db/prisma"
import { env } from "@/env.mjs"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import type { Account, AuthOptions, Profile, Session, User } from "next-auth"
import type { JWT } from "next-auth/jwt"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import EmailProvider from "next-auth/providers/email"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: AuthOptions = {
  debug: env.NODE_ENV === "development",
  secret: env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/signin",
    signOut: "/signout",
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user) {
          return null
        }

        const passwordIsValid = await bcrypt.compare(
          credentials.password,
          String(user.passwordHash)
        )

        if (!passwordIsValid) {
          return null
        }

        return user
      },
    }),
  ],
  jwt: {
    async encode({ secret, token }) {
      if (!token) {
        throw new Error("No token to encode")
      }
      return jwt.sign(token, secret)
    },
    async decode({ secret, token }) {
      if (!token) {
        throw new Error("No token to decode")
      }
      const decodedToken = jwt.verify(token, secret)
      if (typeof decodedToken === "string") {
        return JSON.parse(decodedToken)
      } else {
        return decodedToken
      }
    },
  },
  callbacks: {
    async session(params: { session: Session; token: JWT; user: User }) {
      if (params.session.user) {
        params.session.user.email = params.token.email
      }

      return params.session
    },
    async jwt(params: {
      token: JWT
      user?: User | undefined
      account?: Account | null | undefined
      profile?: Profile | undefined
      isNewUser?: boolean | undefined
    }) {
      if (params.user) {
        params.token.email = params.user.email
      }

      return params.token
    },
  },
}

const handler = NextAuth(authOptions) as unknown

export { handler as GET, handler as POST }
