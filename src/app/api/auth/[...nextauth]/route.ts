import NextAuth from "next-auth/next"

import { authOptions } from "@/config/auth"

const handler = NextAuth(authOptions) as unknown

export { handler as GET, handler as POST }
