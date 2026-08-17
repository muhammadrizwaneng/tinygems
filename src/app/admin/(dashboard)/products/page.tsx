import Link from "next/link"

import { deleteProduct } from "@/app/admin/actions"
import { Button } from "@/components/ui/button"
import { formatPkr } from "@/lib/money"
import { prisma } from "@/lib/prisma"

export const metadata = { title: "Admin products" }

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold">Products</h1>
        <Button nativeButton={false} render={<Link href="/admin/products/new" />}>
          Add product
        </Button>
      </div>
      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={product.image} alt="" className="size-12 rounded object-cover" />
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-muted-foreground text-xs">{product.sku}</p>
                    </div>
                  </div>
                </td>
                <td className="p-3">{product.category.name}</td>
                <td className="p-3">{formatPkr(product.price)}</td>
                <td className="p-3">{product.stock}</td>
                <td className="p-3">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      nativeButton={false}
                      render={<Link href={`/admin/products/${product.id}/edit`} />}
                    >
                      Edit
                    </Button>
                    <form action={deleteProduct.bind(null, product.id)}>
                      <Button variant="destructive" size="sm" type="submit">
                        Delete
                      </Button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
