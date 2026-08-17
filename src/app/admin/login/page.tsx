import { loginAction } from "@/app/admin/auth-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "@/components/Logo"

export const metadata = { title: "Admin login" }

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <div className="flex min-h-full flex-1 items-center justify-center px-4">
      <form
        action={loginAction}
        className="w-full max-w-sm space-y-4 rounded-xl border bg-card p-6"
      >
        <Logo className="justify-center" />
        <h1 className="text-center text-lg font-medium">Admin login</h1>
        {error && (
          <p className="text-sm text-destructive">Wrong password. Try again.</p>
        )}
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>
        <Button className="w-full" type="submit">
          Sign in
        </Button>
      </form>
    </div>
  )
}
