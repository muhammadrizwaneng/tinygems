import { PrismaLibSql } from "@prisma/adapter-libsql"
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"
import { PrismaClient } from "@/generated/prisma/client"

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export function shouldUseTurso() {
  return process.env.VERCEL === "1" || process.env.USE_TURSO === "true"
}

function createPrisma() {
  if (shouldUseTurso()) {
    const url = process.env.TURSO_DATABASE_URL
    const authToken = process.env.TURSO_AUTH_TOKEN
    if (!url || !authToken) {
      throw new Error("TURSO_DATABASE_URL and TURSO_AUTH_TOKEN are required on Vercel")
    }
    return new PrismaClient({
      adapter: new PrismaLibSql({ url, authToken }),
    })
  }

  const url = process.env.DATABASE_URL ?? "file:./prisma/dev.db"
  return new PrismaClient({
    adapter: new PrismaBetterSqlite3({ url }),
  })
}

export const prisma = globalForPrisma.prisma ?? createPrisma()

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
