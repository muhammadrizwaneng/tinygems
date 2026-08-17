import { ProductGrid } from "@/components/ProductGrid"
import { listProducts } from "@/lib/catalog"

type ShopPageProps = {
  searchParams: Promise<{
    category?: string
    collection?: string
    max?: string
    min?: string
    q?: string
    sort?: string
  }>
}

export const metadata = { title: "Shop" }

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams
  const max = params.max ? Number(params.max) : undefined
  const min = params.min ? Number(params.min) : undefined
  const products = await listProducts({
    category: params.category,
    collection: params.collection,
    max: Number.isFinite(max) ? max : undefined,
    min: Number.isFinite(min) ? min : undefined,
    q: params.q,
    sort: params.sort,
  })

  const title = params.collection
    ? params.collection.replace(/-/g, " ")
    : max
      ? `Rs. ${max}/- & below`
      : "All jewelry"

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-heading mb-6 text-3xl font-semibold capitalize">{title}</h1>
      <ProductGrid products={products} />
    </div>
  )
}
