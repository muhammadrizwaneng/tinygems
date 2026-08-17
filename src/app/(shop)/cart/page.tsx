"use client"

import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"

import { WhatsAppIcon } from "@/components/WhatsAppIcon"
import { Button } from "@/components/ui/button"
import { formatPkr } from "@/lib/money"
import { useStore } from "@/lib/store"

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    cartTotal,
    checkoutWhatsApp,
    clearCart,
  } = useStore()

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="font-heading mb-6 text-3xl font-semibold">Your cart</h1>
      {cart.length === 0 ? (
        <div className="rounded-xl border p-8 text-center">
          <p className="text-muted-foreground">You don&apos;t have any items in your cart.</p>
          <Button className="mt-4" nativeButton={false} render={<Link href="/shop" />}>
            Continue shopping
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-4 border-b pb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt="" className="size-24 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <Link href={`/products/${item.slug}`} className="font-medium hover:underline">
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
              <p className="font-medium">{formatPkr(item.price * item.quantity)}</p>
            </div>
          ))}
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">Subtotal {formatPkr(cartTotal)}</p>
            <Button variant="ghost" onClick={clearCart}>
              Clear cart
            </Button>
          </div>
          <p className="text-muted-foreground text-sm">
            Shipping & taxes calculated at checkout. Cash on delivery available across Pakistan.
          </p>
          <Button
            className="w-full bg-[#25D366] text-white hover:bg-[#1ebe5d] sm:w-auto"
            nativeButton={false}
            render={
              <a href={checkoutWhatsApp()} target="_blank" rel="noopener noreferrer" />
            }
          >
            <WhatsAppIcon />
            Checkout on WhatsApp
          </Button>
        </div>
      )}
    </div>
  )
}
