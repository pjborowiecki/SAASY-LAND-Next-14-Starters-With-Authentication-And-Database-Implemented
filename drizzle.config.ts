import * as dotenv from "dotenv"
import type { Config } from "drizzle-kit"

dotenv.config()

export default {
  schema: ["./src/db/schemas/auth.schema.ts"],
  out: "./src/db/migrations",
  driver: "mysql2",
  dbCredentials: {
    uri: process.env.DATABASE_URI || "",
  },
} satisfies Config
