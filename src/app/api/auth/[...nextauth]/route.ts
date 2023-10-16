import { prisma } from "@/db/prisma"
import { env } from "@/env.mjs"
import type { JWTCallbackParams, SessionCallbackParams } from "@/types"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import type { AuthOptions } from "next-auth"
import NextAuth from "next-auth"
import type { JWTDecodeParams, JWTEncodeParams } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/signin",
    signOut: "/signout",
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "SaaSy Land",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "johnsmith@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null
        }

        const { email, password } = credentials

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        })

        if (!user) {
          return null
        }

        const userPassword = user.passwordHash
        const passwordIsValid = bcrypt.compareSync(
          password,
          userPassword as string
        )

        if (!passwordIsValid) {
          return null
        }

        return user
      },
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    async encode({ secret, token }: JWTEncodeParams) {
      if (!token) {
        throw new Error("No token to encode")
      }
      return jwt.sign(token, secret)
    },
    async decode({ secret, token }: JWTDecodeParams) {
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
    async session(params: SessionCallbackParams) {
      if (params.session.user) {
        params.session.user.email = params.token.email
      }
      return params.session
    },
    async jwt(params: JWTCallbackParams) {
      if (params.user) {
        params.token.email = params.user.email
      }

      return params.token
    },
  },
}

const handler = NextAuth(authOptions) as unknown

export { handler as GET, handler as POST }
