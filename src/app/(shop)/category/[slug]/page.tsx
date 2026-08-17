import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ProductGrid } from "@/components/ProductGrid"
import { listProducts } from "@/lib/catalog"
import { prisma } from "@/lib/prisma"

type CategoryPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await prisma.category.findUnique({ where: { slug } })
  return { title: category?.name ?? "Category" }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await prisma.category.findUnique({ where: { slug } })
  if (!category) notFound()
  const products = await listProducts({ category: slug })

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-muted-foreground text-sm">Shop</p>
      <h1 className="font-heading mb-6 text-3xl font-semibold">{category.name}</h1>
      <ProductGrid products={products} />
    </div>
  )
}
