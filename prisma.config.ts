import "dotenv/config"
import { defineConfig } from "prisma/config"

const datasourceUrl =
  process.env.DATABASE_URL ||
  process.env.TURSO_DATABASE_URL ||
  "file:./prisma/dev.db"

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "npx tsx prisma/seed.ts",
  },
  datasource: {
    url: datasourceUrl,
  },
})
