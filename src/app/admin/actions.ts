"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { requireAdmin } from "@/lib/auth"
import { uploadProductImage } from "@/lib/cloudinary"
import { prisma } from "@/lib/prisma"

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function numberField(formData: FormData, key: string) {
  const value = Number(formData.get(key))
  return Number.isFinite(value) ? value : 0
}

async function saveImage(file: File | null, fallback: string | null, folder: string) {
  if (!file || file.size === 0) return fallback
  return uploadProductImage(file, folder)
}

function productFields(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim()
  const slugInput = String(formData.get("slug") ?? "").trim()
  return {
    name,
    slug: slugify(slugInput || name),
    sku: String(formData.get("sku") ?? "").trim() || null,
    description: String(formData.get("description") ?? "").trim(),
    price: numberField(formData, "price"),
    compareAtPrice: numberField(formData, "compareAtPrice") || null,
    collection: String(formData.get("collection") ?? "").trim() || null,
    categoryId: String(formData.get("categoryId") ?? ""),
    stock: numberField(formData, "stock"),
    featured: formData.get("featured") === "on",
    onSale: formData.get("onSale") === "on",
    isNew: formData.get("isNew") === "on",
  }
}

export async function createProduct(formData: FormData) {
  await requireAdmin()
  const { categoryId, ...fields } = productFields(formData)
  const image = await saveImage(
    formData.get("image") as File | null,
    "/products/earrings.svg",
    "main"
  )
  const studioImage = await saveImage(
    formData.get("studioImage") as File | null,
    null,
    "studio"
  )
  const wornImage = await saveImage(
    formData.get("wornImage") as File | null,
    null,
    "worn"
  )

  await prisma.product.create({
    data: {
      ...fields,
      image: image!,
      studioImage,
      wornImage,
      category: { connect: { id: categoryId } },
    },
  })
  revalidatePath("/")
  redirect("/admin/products")
}

export async function updateProduct(id: string, formData: FormData) {
  await requireAdmin()
  const existing = await prisma.product.findUnique({ where: { id } })
  if (!existing) throw new Error("Product not found")

  const { categoryId, ...fields } = productFields(formData)
  const image = await saveImage(
    formData.get("image") as File | null,
    existing.image,
    "main"
  )
  const studioImage = await saveImage(
    formData.get("studioImage") as File | null,
    existing.studioImage,
    "studio"
  )
  const wornImage = await saveImage(
    formData.get("wornImage") as File | null,
    existing.wornImage,
    "worn"
  )

  await prisma.product.update({
    where: { id },
    data: {
      ...fields,
      image: image!,
      studioImage,
      wornImage,
      category: { connect: { id: categoryId } },
    },
  })
  revalidatePath("/")
  revalidatePath(`/products/${fields.slug}`)
  redirect("/admin/products")
}

export async function deleteProduct(id: string) {
  await requireAdmin()
  await prisma.product.delete({ where: { id } })
  revalidatePath("/")
  redirect("/admin/products")
}
