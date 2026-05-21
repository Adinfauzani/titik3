"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { useCartStore } from "@/lib/zustand"
import { cn } from "@/lib/utils"

export function CartButton() {
  const itemCount = useCartStore((s) => s.itemCount())

  return (
    <Link
      href="/cart"
      className="relative flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
    >
      <ShoppingCart className="h-5 w-5" />
      <span
        className={cn(
          "absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold transition-all",
          itemCount > 0
            ? "scale-100 bg-coffee-500 text-white"
            : "scale-0"
        )}
      >
        {itemCount}
      </span>
    </Link>
  )
}
