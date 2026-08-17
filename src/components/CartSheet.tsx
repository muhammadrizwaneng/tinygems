"use client"

import Link from "next/link"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { formatPkr } from "@/lib/money"
import { useStore } from "@/lib/store"

export function CartSheet() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
    checkoutWhatsApp,
  } = useStore()

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your cart</SheetTitle>
          <SheetDescription>
            {cart.length === 0
              ? "You don't have any items in your cart."
              : `${cart.length} item${cart.length === 1 ? "" : "s"} ready to order.`}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-3 border-b pb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt=""
                className="size-20 rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <Link
                  href={`/products/${item.slug}`}
                  className="line-clamp-2 text-sm font-medium"
                  onClick={() => setCartOpen(false)}
                >
                  {item.name}
                </Link>
                <p className="mt-1 text-sm">{formatPkr(item.price)}</p>
                <div className="mt-2 flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon-xs"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus />
                  </Button>
                  <span className="w-6 text-center text-sm">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon-xs"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="ml-auto"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-auto space-y-3 border-t p-4">
          <div className="flex items-center justify-between text-sm font-medium">
            <span>Subtotal</span>
            <span>{formatPkr(cartTotal)}</span>
          </div>
          <p className="text-muted-foreground text-xs">
            Shipping & taxes calculated at checkout. Cash on delivery available.
          </p>
          <Button
            className="w-full"
            nativeButton={false}
            render={<Link href="/cart" />}
            onClick={() => setCartOpen(false)}
          >
            <ShoppingBag />
            View cart
          </Button>
          <Button
            className="w-full bg-[#25D366] text-white hover:bg-[#1ebe5d]"
            nativeButton={false}
            disabled={cart.length === 0}
            render={<a href={checkoutWhatsApp()} target="_blank" rel="noopener noreferrer" />}
          >
            Order on WhatsApp
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

