"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ChevronDown, Heart, Menu, Phone, Search, ShoppingBag } from "lucide-react"

import { Logo } from "@/components/Logo"
import { WhatsAppIcon } from "@/components/WhatsAppIcon"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { categoryNav, mainNav } from "@/lib/nav"
import { siteConfig } from "@/lib/site"
import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { cartCount, wishlist, setCartOpen } = useStore()
  const [query, setQuery] = useState("")

  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const q = query.trim()
    if (q) router.push(`/search?q=${encodeURIComponent(q)}`)
  }

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md">
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-1.5 text-xs sm:px-6">
          <p className="truncate">Nationwide delivery · Cash on delivery · Lowest prices online</p>
          <div className="hidden items-center gap-4 sm:flex">
            <a href={`tel:${siteConfig.phone}`} className="inline-flex items-center gap-1">
              <Phone className="size-3" />
              {siteConfig.phoneDisplay}
            </a>
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1"
            >
              <WhatsAppIcon className="size-3" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="border-b">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:h-[4.5rem] sm:px-6">
          <Sheet>
            <SheetTrigger
              render={<Button variant="ghost" size="icon" className="lg:hidden" />}
            >
              <Menu />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetDescription>Shop TinyGems jewelry</SheetDescription>
              </SheetHeader>
              <form onSubmit={onSearch} className="px-4">
                <label className="sr-only" htmlFor="mobile-search">
                  Search products
                </label>
                <div className="relative">
                  <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="mobile-search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search jewelry"
                    className="pl-8"
                  />
                </div>
              </form>
              <nav className="flex flex-col gap-1 px-4">
                {[{ label: "Home", href: "/" }, ...mainNav, { label: "About", href: "/about" }, { label: "Contact", href: "/contact" }].map(
                  (item) => (
                    <SheetClose
                      key={item.href}
                      nativeButton={false}
                      render={
                        <Link
                          href={item.href}
                          className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
                        />
                      }
                    >
                      {item.label}
                    </SheetClose>
                  )
                )}
                {categoryNav.map((item) => (
                  <SheetClose
                    key={item.href}
                    nativeButton={false}
                    render={
                      <Link
                        href={item.href}
                        className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted"
                      />
                    }
                  >
                    {item.label}
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Logo />

          <form onSubmit={onSearch} className="mx-auto hidden min-w-0 flex-1 max-w-md md:block">
            <label className="sr-only" htmlFor="site-search">
              Search products
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="site-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="What are you looking for?"
                className="pl-8"
              />
            </div>
          </form>

          <div className="ml-auto flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              nativeButton={false}
              render={<Link href="/wishlist" />}
            >
              <Heart />
              <span className="sr-only">Wishlist</span>
              {wishlist.length > 0 && (
                <Badge className="absolute -top-1.5 -right-1.5 h-4 min-w-4 px-1 text-[10px]">
                  {wishlist.length}
                </Badge>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag />
              <span className="sr-only">Cart</span>
              <Badge className="absolute -top-1.5 -right-1.5 h-4 min-w-4 px-1 text-[10px]">
                {cartCount}
              </Badge>
            </Button>
            <Button
              className="hidden bg-[#25D366] text-white hover:bg-[#1ebe5d] sm:inline-flex"
              nativeButton={false}
              render={
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <WhatsAppIcon />
              WhatsApp Us
            </Button>
          </div>
        </div>
      </div>

      <nav className="hidden border-b lg:block">
        <div className="mx-auto flex max-w-6xl items-center gap-1 px-4 sm:px-6">
          <Link
            href="/new-arrivals"
            className={cn(
              "px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground",
              pathname === "/new-arrivals" && "text-foreground"
            )}
          >
            New Arrivals
          </Link>
          <Link
            href="/sale"
            className={cn(
              "px-3 py-2.5 text-sm font-medium text-rose-700 hover:text-rose-800",
              pathname === "/sale" && "text-rose-800"
            )}
          >
            Sale
          </Link>
          {categoryNav.map((item) =>
            "children" in item && item.children ? (
              <DropdownMenu key={item.href}>
                <DropdownMenuTrigger
                  render={
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
                    />
                  }
                >
                  {item.label}
                  <ChevronDown className="size-3.5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="min-w-48">
                  {item.children.map((child) => (
                    <DropdownMenuItem
                      key={child.href}
                      nativeButton={false}
                      render={<Link href={child.href} />}
                    >
                      {child.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </Link>
            )
          )}
          <Link
            href="/about"
            className="ml-auto px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  )
}
