import { notFound } from "next/navigation"

import { updateProduct } from "@/app/admin/actions"
import { ProductForm } from "@/components/admin/ProductForm"
import { prisma } from "@/lib/prisma"

export const metadata = { title: "Edit product" }

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { sortOrder: "asc" } }),
  ])
  if (!product) notFound()

  return (
    <div>
      <h1 className="font-heading mb-6 text-2xl font-semibold">Edit product</h1>
      <ProductForm
        categories={categories}
        product={product}
        action={updateProduct.bind(null, product.id)}
      />
    </div>
  )
}
