import Link from "next/link"
import { api } from "@/lib/trpc/server"
import { MenuCard } from "@/components/menu/menu-card"
import { Button } from "@/components/shared/button"

async function getPopularItems() {
  try {
    return await api.menu.getPopular()
  } catch {
    return [] as Awaited<ReturnType<typeof api.menu.getPopular>>
  }
}

async function getCategories() {
  try {
    return await api.category.getAll()
  } catch {
    return [] as Awaited<ReturnType<typeof api.category.getAll>>
  }
}

export default async function LandingPage() {
  const [popularItems, categories] = await Promise.all([
    getPopularItems(),
    getCategories(),
  ])

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-coffee-900/20 to-dark-900" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:py-32">
          <div className="mb-4 flex justify-center gap-2 text-3xl text-coffee-400">
            <span>●</span>
            <span>●</span>
            <span>●</span>
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-6xl">
            Warkop Titik 3
          </h1>
          <p className="mx-auto mb-8 max-w-lg text-lg text-text-secondary">
            Pesan kopi dan makanan favorit kamu. Praktis, cepat, dan nyaman.
          </p>
          <div className="flex justify-center gap-3">
            <Link href="/menu">
              <Button size="lg">Lihat Menu</Button>
            </Link>
            <Link href="/menu">
              <Button size="lg" variant="secondary">
                Pesan Sekarang
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex justify-center gap-6 text-sm text-text-secondary">
            <span>☕ Specialty Coffee</span>
            <span>🥪 Snacks</span>
            <span>🧋 Non Coffee</span>
          </div>
        </div>
      </section>

      {popularItems.length > 0 && (
        <section className="mx-auto max-w-6xl px-4">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Popular</h2>
              <p className="text-sm text-text-secondary">
                Menu paling favorit hari ini
              </p>
            </div>
            <Link href="/menu">
              <Button variant="ghost" size="sm">
                Lihat Semua
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {popularItems.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                onShowDetail={() => {}}
              />
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="rounded-2xl bg-gradient-to-br from-coffee-800/30 to-dark-800 p-8 sm:p-12">
          <div className="flex flex-col items-center text-center">
            <h2 className="mb-2 text-2xl font-semibold">Siap Pesan?</h2>
            <p className="mb-6 text-text-secondary">
              Pilih menu favoritmu dan nikmati momen kopi terbaik
            </p>
            <Link href="/menu">
              <Button size="lg">
                Mulai Pesan
                <span className="ml-2">→</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
