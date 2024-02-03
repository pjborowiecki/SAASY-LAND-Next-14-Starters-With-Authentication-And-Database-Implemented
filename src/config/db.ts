import { env } from "@/env.mjs"
import { Client } from "@planetscale/database"
import { PrismaPlanetScale } from "@prisma/adapter-planetscale"
import { PrismaClient } from "@prisma/client"
import { fetch as undiciFetch } from "undici"

const connectionString = env.DATABASE_URL

const client = new Client({ url: connectionString, fetch: undiciFetch })
const adapter = new PrismaPlanetScale(client)

const prismaClientSingleton = () => {
  return new PrismaClient({ adapter })
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
