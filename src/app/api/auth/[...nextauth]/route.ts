import { db, helloNow } from "@/db"
import { env } from "@/env.mjs"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import bcrypt from "bcrypt"
import NextAuth, { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
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
      name: "Your App Name",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log(credentials)
        await helloNow()
      },
    }),
  ],
  debug: env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions) as unknown

export { handler as GET, handler as POST }
