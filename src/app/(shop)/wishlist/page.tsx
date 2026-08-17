"use client"

import Link from "next/link"

import { ProductCard } from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"

export default function WishlistPage() {
  const { wishlist } = useStore()

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-heading mb-6 text-3xl font-semibold">Wishlist</h1>
      {wishlist.length === 0 ? (
        <div className="rounded-xl border p-8 text-center">
          <p className="text-muted-foreground">Your wishlist is empty.</p>
          <Button className="mt-4" nativeButton={false} render={<Link href="/shop" />}>
            Browse jewelry
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {wishlist.map((item) => (
            <ProductCard
              key={item.id}
              product={{
                ...item,
                reviewCount: 0,
                rating: 5,
                onSale: Boolean(item.compareAtPrice),
                isNew: false,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
