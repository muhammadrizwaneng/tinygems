import { createProduct } from "@/app/admin/actions"
import { ProductForm } from "@/components/admin/ProductForm"
import { prisma } from "@/lib/prisma"

export const metadata = { title: "Add product" }

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } })
  return (
    <div>
      <h1 className="font-heading mb-6 text-2xl font-semibold">Add product</h1>
      <ProductForm categories={categories} action={createProduct} />
    </div>
  )
}
