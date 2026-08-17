import "dotenv/config"
import { createClient } from "@libsql/client"
import { execSync } from "node:child_process"

async function main() {
  const url = process.env.TURSO_DATABASE_URL
  const authToken = process.env.TURSO_AUTH_TOKEN

  if (!url || !authToken) {
    throw new Error(
      "Set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN for the tinygems Turso database"
    )
  }

  const sql = execSync(
    "npx prisma migrate diff --from-empty --to-schema prisma/schema.prisma --script",
    { encoding: "utf8" }
  )

  const client = createClient({ url, authToken })
  await client.executeMultiple(sql)
  console.log("Pushed TinyGems schema to Turso")
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
