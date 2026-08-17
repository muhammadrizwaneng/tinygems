import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Star } from "lucide-react"

import { ProductActions } from "@/components/ProductActions"
import {
  galleryFromProduct,
  ProductGallery,
} from "@/components/ProductGallery"
import { ProductGrid } from "@/components/ProductGrid"
import { Badge } from "@/components/ui/badge"
import { relatedProducts, toCatalogProduct } from "@/lib/catalog"
import { discountPercent, formatPkr } from "@/lib/money"
import { prisma } from "@/lib/prisma"

type ProductPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await prisma.product.findUnique({ where: { slug } })
  if (!product) return { title: "Product" }
  return {
    title: product.name,
    description: product.description,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  })
  if (!product) notFound()

  const related = await relatedProducts(product.id, product.categoryId)
  const saved = discountPercent(product.price, product.compareAtPrice)

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <p className="text-muted-foreground mb-4 text-sm">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        {" / "}
        <Link
          href={`/category/${product.category.slug}`}
          className="hover:text-foreground"
        >
          {product.category.name}
        </Link>
        {" / "}
        {product.name}
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="overflow-hidden">
          <ProductGallery
            images={galleryFromProduct(product)}
            alt={product.name}
            sku={product.sku}
            discount={saved}
          />
        </div>
        <div>
          <div className="flex flex-wrap gap-2">
            {product.isNew && <Badge variant="secondary">New arrival</Badge>}
            {product.onSale && <Badge variant="outline">Sale</Badge>}
          </div>
          <h1 className="font-heading mt-3 text-3xl font-semibold tracking-tight">
            {product.name}
          </h1>
          <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="size-4 fill-amber-400 text-amber-400" />
            {product.rating.toFixed(1)} · {product.reviewCount} reviews
          </div>
          <div className="mt-4 flex items-end gap-3">
            <p className="text-3xl font-semibold">{formatPkr(product.price)}</p>
            {product.compareAtPrice && product.compareAtPrice > product.price ? (
              <p className="text-muted-foreground line-through">
                {formatPkr(product.compareAtPrice)}
              </p>
            ) : null}
          </div>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            {product.description}
          </p>
          <p className="mt-2 text-sm">
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </p>
          <div className="mt-6">
            <ProductActions product={toCatalogProduct(product)} />
          </div>
          <p className="text-muted-foreground mt-4 text-xs">
            Cash on delivery · Nationwide shipping · Easy WhatsApp order
          </p>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="font-heading mb-6 text-2xl font-semibold">
          You may also like
        </h2>
        <ProductGrid products={related} />
      </section>
    </div>
  )
}
