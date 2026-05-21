"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react"
import { Button } from "@/components/shared/button"
import { Card } from "@/components/shared/card"
import { formatPrice } from "@/lib/utils"
import { useCartStore } from "@/lib/zustand"
import { categories, type MenuItem } from "@/lib/menu-data"

interface MenuContentProps {
  items: MenuItem[]
  categories: readonly { id: string; name: string; icon: string }[]
}

export function MenuContent({ items, categories }: MenuContentProps) {
  const [query, setQuery] = useState("")
  const [cat, setCat] = useState<string | null>(null)
  const [selected, setSelected] = useState<MenuItem | null>(null)
  const [qty, setQty] = useState(1)
  const [note, setNote] = useState("")
  const addItem = useCartStore((s) => s.addItem)

  const filtered = items.filter((item) => {
    const matchCat = !cat || item.category === cat
    const matchSearch =
      !query ||
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    return matchCat && matchSearch
  })

  function handleAdd() {
    if (!selected) return
    for (let i = 0; i < qty; i++) {
      addItem({
        menuItemId: selected.id,
        name: selected.name,
        price: selected.price,
        notes: note,
      })
    }
    setSelected(null)
    setQty(1)
    setNote("")
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-dark-600/30 bg-dark-800/50">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold sm:text-4xl">Menu</h1>
              <p className="mt-1 text-text-secondary">
                {items.length} menu spesial untuk kamu
              </p>
            </div>
            <Button variant="accent" size="sm">
              <ShoppingBag className="mr-1.5 h-4 w-4" />
              Cart
            </Button>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="Cari menu..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-xl border border-dark-600 bg-dark-700 py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-coffee-500 focus:outline-none"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setCat(null)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                !cat
                  ? "bg-coffee-600 text-white shadow-lg shadow-coffee-900/30"
                  : "bg-dark-700 text-text-secondary hover:bg-dark-600"
              }`}
            >
              Semua
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  cat === c.id
                    ? "bg-coffee-600 text-white shadow-lg shadow-coffee-900/30"
                    : "bg-dark-700 text-text-secondary hover:bg-dark-600"
                }`}
              >
                <span>{c.icon}</span>
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={cat ?? "all"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
          >
            {filtered.map((item, i) => {
              const catInfo = categories.find((c) => c.id === item.category)
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.02, duration: 0.2 }}
                >
                  <Card
                    className="group cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:border-coffee-500/30 hover:shadow-lg hover:shadow-coffee-900/10"
                    onClick={() => {
                      setSelected(item)
                      setQty(1)
                      setNote("")
                    }}
                  >
                    <div className="mb-2 flex aspect-[4/3] items-center justify-center rounded-xl bg-gradient-to-br from-dark-700 to-dark-600">
                      <span className="text-3xl opacity-20">{catInfo?.icon}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-text-primary">{item.name}</h3>
                    <p className="mt-0.5 line-clamp-1 text-xs text-text-secondary">{item.description}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm font-bold text-coffee-400">
                        {formatPrice(item.price)}
                      </span>
                      {item.isPopular && (
                        <span className="rounded bg-coffee-500/10 px-1.5 py-0.5 text-[10px] text-coffee-400">
                          Populer
                        </span>
                      )}
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-text-secondary">
            <p className="text-lg">Menu tidak ditemukan</p>
            <p className="mt-1 text-sm">Coba kata kunci lain atau kategori berbeda</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md rounded-t-2xl bg-dark-800 sm:rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-dark-600/50 p-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelected(null)}
                    className="rounded-lg p-1 text-text-secondary transition-colors hover:bg-dark-700 hover:text-text-primary"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <h2 className="text-lg font-semibold">{selected.name}</h2>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="rounded-lg p-1 text-text-secondary transition-colors hover:bg-dark-700 hover:text-text-primary"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4 p-4">
                <div className="flex aspect-video items-center justify-center rounded-xl bg-gradient-to-br from-dark-700 to-dark-600">
                  <span className="text-5xl opacity-20">
                    {categories.find((c) => c.id === selected.category)?.icon}
                  </span>
                </div>

                {selected.description && (
                  <p className="text-sm text-text-secondary">{selected.description}</p>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">
                    {categories.find((c) => c.id === selected.category)?.name}
                  </span>
                  <span className="text-xl font-bold text-coffee-400">
                    {formatPrice(selected.price)}
                  </span>
                </div>

                <div>
                  <label className="mb-1 block text-sm text-text-secondary">
                    Catatan
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Contoh: kurang gula, extra milk..."
                    rows={2}
                    className="w-full resize-none rounded-xl border border-dark-600 bg-dark-700 px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-coffee-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="rounded-lg bg-dark-700 p-2 transition-colors hover:bg-dark-600"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{qty}</span>
                    <button
                      onClick={() => setQty(qty + 1)}
                      className="rounded-lg bg-dark-700 p-2 transition-colors hover:bg-dark-600"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-sm text-text-secondary">
                    {formatPrice(selected.price * qty)}
                  </span>
                </div>
              </div>

              <div className="border-t border-dark-600/50 p-4">
                <Button className="w-full" onClick={handleAdd}>
                  <Plus className="mr-1.5 h-4 w-4" />
                  Tambah — {formatPrice(selected.price * qty)}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
