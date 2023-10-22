import * as auth from "@/db/schemas/auth.schema"
import { env } from "@/env.mjs"
import { neon, neonConfig } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

neonConfig.fetchConnectionCache = true

const schema = { ...auth }
const sql = neon(env.DATABASE_URL)

export const db = drizzle(sql, { schema })
