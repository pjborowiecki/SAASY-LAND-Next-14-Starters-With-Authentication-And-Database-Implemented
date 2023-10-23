import { sendEmailAction } from "@/actions/email"
import { prisma } from "@/db/prisma"
import { env } from "@/env.mjs"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import type { Account, AuthOptions, Profile, Session, User } from "next-auth"
import { type JWT } from "next-auth/jwt"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import Email from "next-auth/providers/email"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

import { siteConfig } from "@/config/site"
import { MagicLinkEmail } from "@/components/emails/magic-link-email"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  debug: env.NODE_ENV === "development",
  secret: env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 daysd
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/signin",
    signOut: "/signout",
    verifyRequest: "/signin/magic-link-signin",
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
    Email({
      type: "email",
      async sendVerificationRequest({
        identifier,
        url,
      }: {
        identifier: string
        url: string
      }) {
        try {
          const emailSent = await sendEmailAction({
            from: env.RESEND_EMAIL_FROM,
            to: [identifier],
            subject: `${siteConfig.name} magic link sign in`,
            react: MagicLinkEmail({ identifier, url }),
          })
          return void { success: true, data: emailSent }
        } catch (error) {
          throw new Error("Failed to send the verification Email.")
        }
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials) return null

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user) return null

        const passwordIsValid = await bcrypt.compare(
          credentials.password,
          String(user.passwordHash)
        )

        if (!passwordIsValid) return null

        return user
      },
    }),
  ],
  jwt: {
    encode({ secret, token }) {
      if (!token) {
        throw new Error("No token to encode")
      }
      return jwt.sign(token, secret)
    },
    decode({ secret, token }) {
      if (!token) {
        throw new Error("No token to decode")
      }
      const decodedToken = jwt.verify(token, secret)
      if (typeof decodedToken === "string") {
        return JSON.parse(decodedToken) as JWT
      } else {
        return decodedToken
      }
    },
  },
  callbacks: {
    jwt(params: {
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
    session(params: { session: Session; token: JWT; user: User }) {
      if (params.session.user) {
        params.session.user.email = params.token.email
      }

      return params.session
    },
  },
}

const handler = NextAuth(authOptions) as unknown

export { handler as GET, handler as POST }
