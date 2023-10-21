import { env } from "@/env.mjs"
import { connect } from "@planetscale/database"
import { PrismaPlanetScale } from "@prisma/adapter-planetscale"
import { PrismaClient } from "@prisma/client"
import { fetch as undiciFetch } from "undici"

const connectionString = env.DATABASE_URL

const connection = connect({ url: connectionString, fetch: undiciFetch })
const adapter = new PrismaPlanetScale(connection)

export const prisma = new PrismaClient({ adapter })
