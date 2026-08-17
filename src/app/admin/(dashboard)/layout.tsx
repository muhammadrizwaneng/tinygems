import Link from "next/link"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

import { logoutAction } from "@/app/admin/auth-actions"
import { Logo } from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { isAdmin } from "@/lib/auth"

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (!(await isAdmin())) {
    redirect("/admin/login")
  }

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="flex items-center gap-4 border-b px-4 py-3">
        <Logo />
        <nav className="flex items-center gap-3 text-sm">
          <Link href="/admin/products" className="font-medium">
            Products
          </Link>
          <Link href="/admin/products/new" className="text-muted-foreground">
            Add product
          </Link>
          <Link href="/" className="text-muted-foreground">
            View store
          </Link>
        </nav>
        <form action={logoutAction} className="ml-auto">
          <Button variant="outline" size="sm" type="submit">
            Log out
          </Button>
        </form>
      </header>
      <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">{children}</div>
    </div>
  )
}
