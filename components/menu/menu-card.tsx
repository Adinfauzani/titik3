"use client"

import Image from "next/image"
import { Plus } from "lucide-react"
import { Card } from "@/components/shared/card"
import { Button } from "@/components/shared/button"
import { formatPrice } from "@/lib/utils"
import { useCartStore } from "@/lib/zustand"
import type { MenuItem } from "@prisma/client"

interface MenuCardProps {
  item: MenuItem & { category: { name: string; slug: string } }
  onShowDetail: (item: MenuCardProps["item"]) => void
}

export function MenuCard({ item, onShowDetail }: MenuCardProps) {
  const addItem = useCartStore((s) => s.addItem)

  return (
    <Card className="group cursor-pointer overflow-hidden p-0" onClick={() => onShowDetail(item)}>
      <div className="relative aspect-[4/3] overflow-hidden bg-dark-700">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl text-dark-500">
            ●
          </div>
        )}
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-text-primary">{item.name}</h3>
          <span className="shrink-0 font-semibold text-coffee-400">
            {formatPrice(item.price)}
          </span>
        </div>
        {item.description && (
          <p className="line-clamp-2 text-sm text-text-secondary">
            {item.description}
          </p>
        )}
        <span className="inline-block rounded-md bg-dark-700 px-2 py-0.5 text-[11px] text-text-secondary">
          {item.category.name}
        </span>
      </div>
      <div className="absolute right-3 top-3 opacity-0 transition-opacity group-hover:opacity-100">
        <Button
          size="icon"
          variant="accent"
          onClick={(e) => {
            e.stopPropagation()
            addItem({
              menuItemId: item.id,
              name: item.name,
              price: item.price,
              notes: "",
              image: item.image,
            })
          }}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}
