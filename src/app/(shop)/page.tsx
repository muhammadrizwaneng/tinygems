import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { ProductGrid } from "@/components/ProductGrid"
import { Button } from "@/components/ui/button"
import { listProducts } from "@/lib/catalog"
import { priceFilters, testimonials } from "@/lib/site"
import { formatPkr } from "@/lib/money"

export default async function Home() {
  const [featured, sale, newest, loved] = await Promise.all([
    listProducts({ featured: true }),
    listProducts({ sale: true, sort: "popular" }),
    listProducts({ isNew: true }),
    listProducts({ sort: "popular" }),
  ])

  return (
    <div>
      <section className="bg-linear-to-br from-rose-100 via-amber-50 to-stone-100">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
          <div>
            <p className="text-sm font-medium tracking-wide text-rose-800/80 uppercase">
              Artificial jewelry · Pakistan
            </p>
            <h1 className="font-heading mt-3 text-4xl font-semibold tracking-tight md:text-6xl">
              Everyday sparkle at prices you&apos;ll love
            </h1>
            <p className="mt-4 max-w-md text-muted-foreground">
              Earrings, rings, bangles, sets and more — with nationwide delivery
              and WhatsApp ordering.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button nativeButton={false} render={<Link href="/sale" />}>
                Shop sale
                <ArrowRight />
              </Button>
              <Button
                variant="outline"
                nativeButton={false}
                render={<Link href="/new-arrivals" />}
              >
                New arrivals
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {featured.slice(0, 4).map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="overflow-hidden rounded-2xl bg-white/70 ring-1 ring-foreground/10"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="aspect-square w-full object-cover"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h2 className="font-heading mb-4 text-2xl font-semibold">Shop by price</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {priceFilters.map((price) => (
            <Link
              key={price}
              href={`/shop?max=${price}`}
              className="rounded-xl bg-muted px-4 py-6 text-center text-sm font-medium ring-1 ring-foreground/10 hover:bg-muted/70"
            >
              {formatPkr(price)} & below
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <SectionHeading title="Everyday sparkle" href="/shop" />
        <ProductGrid products={featured.slice(0, 8)} />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <SectionHeading title="Most loved" href="/shop?sort=popular" />
        <ProductGrid products={loved.slice(0, 8)} />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <SectionHeading title="On sale" href="/sale" />
        <ProductGrid products={sale.slice(0, 8)} />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <SectionHeading title="New products" href="/new-arrivals" />
        <ProductGrid products={newest.slice(0, 8)} />
      </section>

      <section className="bg-muted/50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <h2 className="font-heading mb-6 text-2xl font-semibold">
            Let customers speak for us
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((item) => (
              <blockquote
                key={item.name}
                className="rounded-xl bg-background p-4 text-sm ring-1 ring-foreground/10"
              >
                <p>{item.text}</p>
                <footer className="mt-3 font-medium">{item.name}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <h2 className="font-heading text-3xl font-semibold">Welcome to TinyGems</h2>
        <p className="mt-4 text-muted-foreground">
          Find the perfect piece for your style and occasion — casual, party, or
          wedding. TinyGems offers earrings, necklaces, bracelets, rings and more
          at wholesale-friendly prices across Pakistan.
        </p>
        <Button className="mt-6" nativeButton={false} render={<Link href="/about" />}>
          Read more
        </Button>
      </section>
    </div>
  )
}

function SectionHeading({ title, href }: { title: string; href: string }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-3">
      <h2 className="font-heading text-2xl font-semibold">{title}</h2>
      <Button variant="outline" size="sm" nativeButton={false} render={<Link href={href} />}>
        View all
      </Button>
    </div>
  )
}
