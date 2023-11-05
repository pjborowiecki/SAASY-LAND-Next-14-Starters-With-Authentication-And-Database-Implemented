import { type NextApiRequest, type NextApiResponse } from "next"
import { type AuthOptions } from "next-auth"
import NextAuth from "next-auth/next"

import { authOptions } from "@/config/auth"

const handler = NextAuth(authOptions) as (
  req: NextApiRequest,
  res: NextApiResponse,
  authOptions: AuthOptions
) => Promise<void> | undefined

export { handler as GET, handler as POST }
