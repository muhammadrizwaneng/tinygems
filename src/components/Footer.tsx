import Link from "next/link"

import { Logo } from "@/components/Logo"
import { WhatsAppIcon } from "@/components/WhatsAppIcon"
import { categoryNav, mainNav } from "@/lib/nav"
import { priceFilters, siteConfig } from "@/lib/site"

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="space-y-3">
          <Logo />
          <p className="text-muted-foreground text-sm">
            Artificial jewelry for everyday sparkle, parties, and weddings —
            delivered across Pakistan.
          </p>
          <a
            href={siteConfig.whatsappUrl}
            className="inline-flex items-center gap-2 text-sm font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon />
            {siteConfig.phoneDisplay}
          </a>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold">Shop</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
            {categoryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold">Browse by price</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {priceFilters.map((price) => (
              <li key={price}>
                <Link href={`/shop?max=${price}`} className="hover:text-foreground">
                  Rs. {price}/- & below
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold">Information</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/about" className="hover:text-foreground">
                About TinyGems
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:text-foreground">
                Shipping details
              </Link>
            </li>
            <li>
              <Link href="/payment" className="hover:text-foreground">
                Payment details
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-foreground">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-foreground">
                Contact us
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} TinyGems. All rights reserved.
      </div>
    </footer>
  )
}
