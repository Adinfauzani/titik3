import { auth } from "@/server/auth"
import { redirect } from "next/navigation"

export default async function KitchenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session?.user || (session.user.role !== "KITCHEN" && session.user.role !== "ADMIN"))
    redirect("/auth/signin")

  return (
    <div className="min-h-screen bg-dark-900">
      <header className="border-b border-dark-600/50 bg-dark-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl text-coffee-400">●</span>
            <h1 className="text-lg font-semibold">Kitchen</h1>
          </div>
          <span className="text-sm text-text-secondary">Warkop Titik 3</span>
        </div>
      </header>
      <main className="p-6">{children}</main>
    </div>
  )
}
