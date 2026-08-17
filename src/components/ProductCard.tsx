"use client"

import Link from "next/link"
import { Eye, Heart, ShoppingBag, Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { discountPercent, formatPkr } from "@/lib/money"
import { useStore, type StoreProduct } from "@/lib/store"
import { cn } from "@/lib/utils"

export type CatalogProduct = StoreProduct & {
  reviewCount: number
  rating: number
  onSale: boolean
  isNew: boolean
}

export function ProductCard({ product }: { product: CatalogProduct }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore()
  const saved = discountPercent(product.price, product.compareAtPrice)
  const wishlisted = isWishlisted(product.id)

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
      <div className="relative">
        <Link href={`/products/${product.slug}`} className="block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            className="aspect-square w-full object-cover transition-transform group-hover:scale-[1.03]"
          />
        </Link>
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {saved > 0 && (
            <Badge className="bg-destructive/90 text-white">-{saved}%</Badge>
          )}
          {product.isNew && <Badge variant="secondary">New</Badge>}
        </div>
        <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
          <Button
            variant="secondary"
            size="icon-sm"
            onClick={() => toggleWishlist(product)}
            aria-label="Add to wishlist"
          >
            <Heart className={cn(wishlisted && "fill-primary text-primary")} />
          </Button>
          <Button
            variant="secondary"
            size="icon-sm"
            nativeButton={false}
            render={<Link href={`/products/${product.slug}`} />}
            aria-label="Quick view"
          >
            <Eye />
          </Button>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <Link
          href={`/products/${product.slug}`}
          className="line-clamp-2 text-sm font-medium leading-snug hover:underline"
        >
          {product.name}
        </Link>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="size-3 fill-amber-400 text-amber-400" />
          {product.rating.toFixed(1)}
          <span>({product.reviewCount} reviews)</span>
        </div>
        <div className="mt-auto flex items-end justify-between gap-2">
          <div>
            <p className="font-semibold">{formatPkr(product.price)}</p>
            {product.compareAtPrice && product.compareAtPrice > product.price ? (
              <p className="text-muted-foreground text-xs line-through">
                {formatPkr(product.compareAtPrice)}
              </p>
            ) : null}
          </div>
          <Button size="sm" onClick={() => addToCart(product)}>
            <ShoppingBag />
            Add
          </Button>
        </div>
      </div>
    </article>
  )
}
