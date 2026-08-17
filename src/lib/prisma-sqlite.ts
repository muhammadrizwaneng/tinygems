import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"
import { PrismaClient } from "@/generated/prisma/client"

export function createSqlitePrisma() {
  const url = process.env.DATABASE_URL ?? "file:./prisma/dev.db"
  return new PrismaClient({
    adapter: new PrismaBetterSqlite3({ url }),
  })
}
