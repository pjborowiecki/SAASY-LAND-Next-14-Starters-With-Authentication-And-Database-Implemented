import { sendEmail } from "@/actions/email"
import { getUserByEmail } from "@/actions/user"
import { prisma } from "@/db"
import { env } from "@/env.mjs"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import type { Account, AuthOptions, Profile, Session, User } from "next-auth"
import { type JWT } from "next-auth/jwt"
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
      clientId: env.GOOGLE_ID,
      clientSecret: env.GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
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
          const emailSent = await sendEmail({
            from: env.RESEND_EMAIL_FROM,
            to: [identifier],
            subject: `${siteConfig.name} magic link sign in`,
            react: MagicLinkEmail({ identifier, url }),
          })
          return void { success: true, data: emailSent }
        } catch (error) {
          throw new Error("Failed to send verification email")
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

        const user = await getUserByEmail(credentials.email)
        if (!user) return null

        const passwordIsValid = await bcrypt.compare(
          credentials.password,
          String(user.passwordHash)
        )

        return passwordIsValid ? user : null
      },
    }),
  ],
  jwt: {
    encode({ secret, token }) {
      if (!token) throw new Error("No token to encode")
      return jwt.sign(token, secret)
    },
    decode({ secret, token }) {
      if (!token) throw new Error("No token to decode")
      const decodedToken = jwt.verify(token, secret)
      return typeof decodedToken === "string"
        ? (JSON.parse(decodedToken) as JWT)
        : decodedToken
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
        params.token.id = params.user?.id
      }

      return params.token
    },
    session(params: { session: Session; token: JWT; user: User }) {
      if (params.session.user) {
        params.session.user.email = params.token.email
        params.session.user.id = params.token.id as string
      }

      return params.session
    },
  },
}
