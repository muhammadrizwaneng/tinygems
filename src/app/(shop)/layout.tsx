import { CartSheet } from "@/components/CartSheet"
import { Footer } from "@/components/Footer"
import { Navbar } from "@/components/Navbar"

export const dynamic = "force-dynamic"

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
      <CartSheet />
    </>
  )
}
