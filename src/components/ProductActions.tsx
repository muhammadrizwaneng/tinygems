"use client"

import { useState } from "react"
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react"

import { WhatsAppIcon } from "@/components/WhatsAppIcon"
import { Button } from "@/components/ui/button"
import { useStore, type StoreProduct } from "@/lib/store"
import { whatsappOrderUrl } from "@/lib/site"
import { cn } from "@/lib/utils"

export function ProductActions({ product }: { product: StoreProduct }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore()
  const [quantity, setQuantity] = useState(1)
  const wishlisted = isWishlisted(product.id)

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-lg border">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
          >
            <Minus />
          </Button>
          <span className="w-8 text-center text-sm">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setQuantity((value) => value + 1)}
          >
            <Plus />
          </Button>
        </div>
        <Button className="flex-1" onClick={() => addToCart(product, quantity)}>
          <ShoppingBag />
          Add to cart
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => toggleWishlist(product)}
          aria-label="Wishlist"
        >
          <Heart className={cn(wishlisted && "fill-primary text-primary")} />
        </Button>
      </div>
      <Button
        className="w-full bg-[#25D366] text-white hover:bg-[#1ebe5d]"
        nativeButton={false}
        render={
          <a
            href={whatsappOrderUrl(
              `Hi TinyGems, I want to order: ${quantity}x ${product.name}${product.sku ? ` (${product.sku})` : ""}`
            )}
            target="_blank"
            rel="noopener noreferrer"
          />
        }
      >
        <WhatsAppIcon />
        Order on WhatsApp
      </Button>
    </div>
  )
}
