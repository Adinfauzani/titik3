import Link from "next/link"
import { auth } from "@/server/auth"
import { redirect } from "next/navigation"

const sidebarLinks = [
  { href: "/admin", label: "Overview", icon: "□" },
  { href: "/admin/orders", label: "Orders", icon: "○" },
  { href: "/admin/menu", label: "Menu", icon: "◇" },
  { href: "/admin/categories", label: "Categories", icon: "△" },
  { href: "/admin/sales", label: "Sales", icon: "○" },
]

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") redirect("/auth/signin")

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-64 flex-col border-r border-dark-600/50 bg-dark-800 p-4">
        <Link
          href="/admin"
          className="mb-8 flex items-center gap-2 text-xl font-semibold"
        >
          <span className="text-2xl text-coffee-400">●</span>
          Admin
        </Link>
        <nav className="flex flex-col gap-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-dark-700 hover:text-text-primary"
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  )
}
