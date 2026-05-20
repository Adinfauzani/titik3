import Link from "next/link"
import { CartButton } from "@/components/order/cart-button"

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen">
      <header className="sticky top-0 z-50 border-b border-dark-600/50 bg-dark-900/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">●</span>
            <span className="text-lg font-semibold tracking-tight">
              Warkop Titik 3
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/menu"
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              Menu
            </Link>
            <CartButton />
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
