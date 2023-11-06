import { env } from "@/env.mjs"
import { connect } from "@planetscale/database"
import { PrismaPlanetScale } from "@prisma/adapter-planetscale"
import { PrismaClient } from "@prisma/client"
import { fetch as undiciFetch } from "undici"

const connectionString = env.DATABASE_URL

const connection = connect({ url: connectionString, fetch: undiciFetch })
const adapter = new PrismaPlanetScale(connection)

const prismaClientSingleton = () => {
  return new PrismaClient({ adapter })
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
