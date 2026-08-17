import "dotenv/config"
import { createClient } from "@libsql/client"

async function main() {
  const url = process.env.TURSO_DATABASE_URL
  const authToken = process.env.TURSO_AUTH_TOKEN

  if (!url || !authToken) {
    throw new Error(
      "Set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN for the tinygems Turso database"
    )
  }

  const client = createClient({
    url: url.replace(/^libsql:\/\//, "https://"),
    authToken,
  })

  await client.executeMultiple(`
    CREATE TABLE IF NOT EXISTS "Category" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "name" TEXT NOT NULL,
      "slug" TEXT NOT NULL,
      "sortOrder" INTEGER NOT NULL DEFAULT 0
    );
    CREATE UNIQUE INDEX IF NOT EXISTS "Category_slug_key" ON "Category"("slug");

    CREATE TABLE IF NOT EXISTS "Product" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "name" TEXT NOT NULL,
      "slug" TEXT NOT NULL,
      "sku" TEXT,
      "description" TEXT NOT NULL,
      "price" INTEGER NOT NULL,
      "compareAtPrice" INTEGER,
      "image" TEXT NOT NULL,
      "studioImage" TEXT,
      "wornImage" TEXT,
      "collection" TEXT,
      "featured" BOOLEAN NOT NULL DEFAULT 0,
      "onSale" BOOLEAN NOT NULL DEFAULT 0,
      "isNew" BOOLEAN NOT NULL DEFAULT 0,
      "stock" INTEGER NOT NULL DEFAULT 25,
      "reviewCount" INTEGER NOT NULL DEFAULT 0,
      "rating" REAL NOT NULL DEFAULT 4.8,
      "categoryId" TEXT NOT NULL,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL,
      FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE
    );
    CREATE UNIQUE INDEX IF NOT EXISTS "Product_slug_key" ON "Product"("slug");
    CREATE INDEX IF NOT EXISTS "Product_categoryId_idx" ON "Product"("categoryId");
  `)

  console.log("Pushed TinyGems schema to Turso")
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
