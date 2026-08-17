import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"
import { PrismaLibSql } from "@prisma/adapter-libsql"
import { PrismaLibSql as PrismaLibSqlWeb } from "@prisma/adapter-libsql/web"
import { PrismaClient } from "@/generated/prisma/client"

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export function shouldUseTurso() {
  return Boolean(process.env.VERCEL) || process.env.USE_TURSO === "true"
}

function tursoHttpUrl(url: string) {
  return url.replace(/^libsql:\/\//, "https://")
}

function createPrisma() {
  if (shouldUseTurso()) {
    const url = process.env.TURSO_DATABASE_URL
    const authToken = process.env.TURSO_AUTH_TOKEN
    if (!url || !authToken) {
      throw new Error("TURSO_DATABASE_URL and TURSO_AUTH_TOKEN are required on Vercel")
    }

    if (process.env.VERCEL) {
      return new PrismaClient({
        adapter: new PrismaLibSqlWeb({
          url: tursoHttpUrl(url),
          authToken,
        }),
      })
    }

    return new PrismaClient({
      adapter: new PrismaLibSql({ url, authToken }),
    })
  }

  return new PrismaClient({
    adapter: new PrismaBetterSqlite3({
      url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
    }),
  })
}

export const prisma = globalForPrisma.prisma ?? createPrisma()

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
