import { ProductGrid } from "@/components/ProductGrid"
import { listProducts } from "@/lib/catalog"

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>
}

export const metadata = { title: "Search" }

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "" } = await searchParams
  const products = q ? await listProducts({ q }) : []

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-heading mb-2 text-3xl font-semibold">Search</h1>
      <p className="text-muted-foreground mb-6 text-sm">
        {q ? `Results for “${q}”` : "Type a product name in the search bar."}
      </p>
      <ProductGrid products={products} />
    </div>
  )
}
