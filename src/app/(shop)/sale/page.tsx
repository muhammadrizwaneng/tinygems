import { ProductGrid } from "@/components/ProductGrid"
import { listProducts } from "@/lib/catalog"

export const metadata = { title: "Sale" }

export default async function SalePage() {
  const products = await listProducts({ sale: true, sort: "popular" })
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-heading mb-2 text-3xl font-semibold">Sale</h1>
      <p className="text-muted-foreground mb-6 text-sm">
        Discounted artificial jewelry — while stocks last.
      </p>
      <ProductGrid products={products} />
    </div>
  )
}
