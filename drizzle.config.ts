import type { Config } from "drizzle-kit"

import "dotenv/config"

export default {
  driver: "pg",
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dbCredentials: {
    connectionString: String(process.env.DATABASE_URL),
  },
} satisfies Config
