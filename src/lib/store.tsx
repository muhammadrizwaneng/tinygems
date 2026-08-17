"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

import { whatsappOrderUrl } from "@/lib/site"

export type StoreProduct = {
  id: string
  slug: string
  name: string
  sku?: string | null
  price: number
  compareAtPrice?: number | null
  image: string
}

export type CartItem = StoreProduct & { quantity: number }

type StoreContextValue = {
  cart: CartItem[]
  wishlist: StoreProduct[]
  cartCount: number
  cartTotal: number
  cartOpen: boolean
  setCartOpen: (open: boolean) => void
  addToCart: (product: StoreProduct, quantity?: number) => void
  updateQuantity: (id: string, quantity: number) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
  toggleWishlist: (product: StoreProduct) => void
  isWishlisted: (id: string) => boolean
  checkoutWhatsApp: () => string
}

const StoreContext = createContext<StoreContextValue | null>(null)

const CART_KEY = "tinygems-cart"
const WISHLIST_KEY = "tinygems-wishlist"

function readList<T>(key: string): T[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T[]) : []
  } catch {
    return []
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<StoreProduct[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setCart(readList<CartItem>(CART_KEY))
    setWishlist(readList<StoreProduct>(WISHLIST_KEY))
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart, ready])

  useEffect(() => {
    if (!ready) return
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist))
  }, [wishlist, ready])

  const addToCart = useCallback((product: StoreProduct, quantity = 1) => {
    setCart((items) => {
      const existing = items.find((item) => item.id === product.id)
      if (existing) {
        return items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...items, { ...product, quantity }]
    })
    setCartOpen(true)
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setCart((items) =>
      items
        .map((item) => (item.id === id ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    )
  }, [])

  const removeFromCart = useCallback((id: string) => {
    setCart((items) => items.filter((item) => item.id !== id))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const toggleWishlist = useCallback((product: StoreProduct) => {
    setWishlist((items) => {
      const exists = items.some((item) => item.id === product.id)
      return exists
        ? items.filter((item) => item.id !== product.id)
        : [...items, product]
    })
  }, [])

  const isWishlisted = useCallback(
    (id: string) => wishlist.some((item) => item.id === id),
    [wishlist]
  )

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const checkoutWhatsApp = useCallback(() => {
    if (cart.length === 0) return whatsappOrderUrl("Hi TinyGems, I want to place an order.")
    const lines = cart.map(
      (item) =>
        `- ${item.quantity}x ${item.name}${item.sku ? ` (${item.sku})` : ""} — Rs ${item.price}`
    )
    return whatsappOrderUrl(
      `Hi TinyGems, I want to order:\n${lines.join("\n")}\nTotal: Rs ${cartTotal}`
    )
  }, [cart, cartTotal])

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      cartCount,
      cartTotal,
      cartOpen,
      setCartOpen,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      toggleWishlist,
      isWishlisted,
      checkoutWhatsApp,
    }),
    [
      cart,
      wishlist,
      cartCount,
      cartTotal,
      cartOpen,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      toggleWishlist,
      isWishlisted,
      checkoutWhatsApp,
    ]
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error("useStore must be used within StoreProvider")
  }
  return context
}
