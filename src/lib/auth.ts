import { createHmac, timingSafeEqual } from "crypto"
import { cookies } from "next/headers"

const COOKIE = "tg_admin"

function secret() {
  return process.env.ADMIN_PASSWORD || "rizwanstudioAdmin"
}

function token() {
  return createHmac("sha256", secret()).update("tinygems-admin-session").digest("hex")
}

export async function isAdmin() {
  const value = (await cookies()).get(COOKIE)?.value
  if (!value) return false
  const expected = token()
  const a = Buffer.from(value)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

export async function loginAdmin(password: string) {
  const expected = Buffer.from(secret())
  const given = Buffer.from(password)
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) {
    return false
  }
  ;(await cookies()).set(COOKIE, token(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })
  return true
}

export async function logoutAdmin() {
  ;(await cookies()).delete(COOKIE)
}

export async function requireAdmin() {
  if (!(await isAdmin())) {
    throw new Error("Unauthorized")
  }
}
