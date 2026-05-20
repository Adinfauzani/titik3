"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { MenuCard } from "@/components/menu/menu-card"
import { ItemDetail } from "@/components/menu/item-detail"
import type { MenuItem, Category } from "@prisma/client"

interface MenuContentProps {
  items: Array<MenuItem & { category: { name: string; slug: string } }>
  categories: Array<Category & { _count: { menuItems: number } }>
}

export function MenuContent({ items, categories }: MenuContentProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItem, setSelectedItem] = useState<
    (typeof items)[number] | null
  >(null)

  const filteredItems = items.filter((item) => {
    const catMatch = !activeCategory || item.category.slug === activeCategory
    const searchMatch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase())
    return catMatch && searchMatch
  })

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Menu</h1>
        <p className="mt-1 text-text-secondary">
          Pilih menu favorit kamu
        </p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
        <input
          type="text"
          placeholder="Cari menu..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl border border-dark-600 bg-dark-800 py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-coffee-500 focus:outline-none"
        />
      </div>

      <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`shrink-0 rounded-full px-4 py-1.5 text-sm transition-colors ${
            !activeCategory
              ? "bg-coffee-600 text-white"
              : "bg-dark-700 text-text-secondary hover:text-text-primary"
          }`}
        >
          Semua
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.slug)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm transition-colors ${
              activeCategory === cat.slug
                ? "bg-coffee-600 text-white"
                : "bg-dark-700 text-text-secondary hover:text-text-primary"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filteredItems.map((item) => (
          <MenuCard
            key={item.id}
            item={item}
            onShowDetail={setSelectedItem}
          />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="py-16 text-center text-text-secondary">
          <p className="text-lg">Menu tidak ditemukan</p>
          <p className="text-sm">Coba kata kunci lain atau kategori berbeda</p>
        </div>
      )}

      <ItemDetail item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  )
}
