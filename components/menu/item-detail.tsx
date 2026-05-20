"use client"

import Image from "next/image"
import { X, Minus, Plus } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/shared/button"
import { formatPrice } from "@/lib/utils"
import { useCartStore } from "@/lib/zustand"
import type { MenuItem } from "@prisma/client"

interface ItemDetailProps {
  item: (MenuItem & { category: { name: string } }) | null
  onClose: () => void
}

export function ItemDetail({ item, onClose }: ItemDetailProps) {
  const [notes, setNotes] = useState("")
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((s) => s.addItem)

  if (!item) return null

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        menuItemId: item.id,
        name: item.name,
        price: item.price,
        notes,
        image: item.image,
      })
    }
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-t-2xl bg-dark-800 sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-dark-600/50 p-4">
          <h2 className="text-lg font-semibold">{item.name}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-text-secondary transition-colors hover:bg-dark-700 hover:text-text-primary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 p-4">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-dark-700">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-6xl text-dark-500">
                ●
              </div>
            )}
          </div>

          {item.description && (
            <p className="text-sm text-text-secondary">{item.description}</p>
          )}

          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">
              {item.category.name}
            </span>
            <span className="text-xl font-bold text-coffee-400">
              {formatPrice(item.price)}
            </span>
          </div>

          <div>
            <label className="mb-1 block text-sm text-text-secondary">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="less sugar, extra milk..."
              rows={2}
              className="w-full resize-none rounded-xl border border-dark-600 bg-dark-700 px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-coffee-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="rounded-lg bg-dark-700 p-2 transition-colors hover:bg-dark-600"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="rounded-lg bg-dark-700 p-2 transition-colors hover:bg-dark-600"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <span className="text-sm text-text-secondary">
              {formatPrice(item.price * quantity)}
            </span>
          </div>
        </div>

        <div className="border-t border-dark-600/50 p-4">
          <Button className="w-full" onClick={handleAdd}>
            Add to Cart — {formatPrice(item.price * quantity)}
          </Button>
        </div>
      </div>
    </div>
  )
}
