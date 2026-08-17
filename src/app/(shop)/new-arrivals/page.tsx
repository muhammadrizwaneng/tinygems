import { ProductGrid } from "@/components/ProductGrid"
import { listProducts } from "@/lib/catalog"

export const metadata = { title: "New Arrivals" }

export default async function NewArrivalsPage() {
  const products = await listProducts({ isNew: true })
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-heading mb-6 text-3xl font-semibold">New arrivals</h1>
      <ProductGrid products={products} />
    </div>
  )
}
