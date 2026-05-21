import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/db"
import { redirect } from "next/navigation"

export default async function KitchenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()
  if (!userId) redirect("/auth/signin")

  const user = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!user || (user.role !== "KITCHEN" && user.role !== "ADMIN"))
    redirect("/")

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
