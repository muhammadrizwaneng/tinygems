import { prisma } from "@/lib/prisma"
import type { CatalogProduct } from "@/components/ProductCard"
import type { Prisma } from "@/generated/prisma/client"

type ProductRow = {
  id: string
  slug: string
  name: string
  sku: string | null
  price: number
  compareAtPrice: number | null
  image: string
  reviewCount: number
  rating: number
  onSale: boolean
  isNew: boolean
}

export function toCatalogProduct(product: ProductRow): CatalogProduct {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    sku: product.sku,
    price: product.price,
    compareAtPrice: product.compareAtPrice,
    image: product.image,
    reviewCount: product.reviewCount,
    rating: product.rating,
    onSale: product.onSale,
    isNew: product.isNew,
  }
}

export type ProductFilters = {
  category?: string
  collection?: string
  max?: number
  min?: number
  q?: string
  sale?: boolean
  isNew?: boolean
  featured?: boolean
  sort?: string
}

export async function listProducts(filters: ProductFilters = {}) {
  const where: Prisma.ProductWhereInput = {}

  if (filters.category) {
    where.category = { slug: filters.category }
  }
  if (filters.collection) {
    where.collection = filters.collection
  }
  if (filters.sale) where.onSale = true
  if (filters.isNew) where.isNew = true
  if (filters.featured) where.featured = true
  if (filters.max || filters.min) {
    where.price = {}
    if (filters.max) where.price.lte = filters.max
    if (filters.min) where.price.gte = filters.min
  }
  if (filters.q) {
    where.OR = [
      { name: { contains: filters.q } },
      { sku: { contains: filters.q } },
      { description: { contains: filters.q } },
    ]
  }

  const orderBy: Prisma.ProductOrderByWithRelationInput =
    filters.sort === "price-asc"
      ? { price: "asc" }
      : filters.sort === "price-desc"
        ? { price: "desc" }
        : filters.sort === "popular"
          ? { reviewCount: "desc" }
          : { createdAt: "desc" }

  const products = await prisma.product.findMany({ where, orderBy })
  return products.map(toCatalogProduct)
}

export async function relatedProducts(productId: string, categoryId: string) {
  const sameCategory = await prisma.product.findMany({
    where: { category: { id: categoryId }, NOT: { id: productId } },
    take: 4,
    orderBy: { reviewCount: "desc" },
  })
  if (sameCategory.length >= 4) return sameCategory.map(toCatalogProduct)

  const extra = await prisma.product.findMany({
    where: {
      id: { notIn: [productId, ...sameCategory.map((item) => item.id)] },
    },
    take: 4 - sameCategory.length,
    orderBy: { onSale: "desc" },
  })
  return [...sameCategory, ...extra].map(toCatalogProduct)
}
