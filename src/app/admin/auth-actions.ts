"use server"

import { redirect } from "next/navigation"

import { loginAdmin, logoutAdmin } from "@/lib/auth"

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "")
  const ok = await loginAdmin(password)
  if (!ok) {
    redirect("/admin/login?error=1")
  }
  redirect("/admin/products")
}

export async function logoutAction() {
  await logoutAdmin()
  redirect("/admin/login")
}
