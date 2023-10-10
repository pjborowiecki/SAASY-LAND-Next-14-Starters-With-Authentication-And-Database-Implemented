import { env } from "@/env.mjs"
import { neonConfig, Pool } from "@neondatabase/serverless"
import { PrismaNeon } from "@prisma/adapter-neon"
import { PrismaClient } from "@prisma/client"
import ws from "ws"

neonConfig.webSocketConstructor = ws as unknown as typeof WebSocket

const connectionString = env.DATABASE_URL

const pool = new Pool({ connectionString })
const adapter = new PrismaNeon(pool)

export const prisma = new PrismaClient({ adapter })
