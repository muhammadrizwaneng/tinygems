import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center", className)}>
      <Image
        src="/logo.png"
        alt="TinyGems"
        width={220}
        height={124}
        className="h-12 w-auto sm:h-14"
        priority
      />
    </Link>
  )
}
