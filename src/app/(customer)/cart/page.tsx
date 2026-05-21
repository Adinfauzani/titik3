"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/shared/button"
import { Card } from "@/components/shared/card"
import { formatPrice } from "@/lib/utils"
import { useCartStore } from "@/lib/zustand"
import { api } from "@/lib/trpc"

export default function CartPage() {
  const router = useRouter()
  const { items, updateQuantity, removeItem, total, clearCart } = useCartStore()
  const [orderType, setOrderType] = useState<"DINE_IN" | "TAKEAWAY">("DINE_IN")
  const [tableNumber, setTableNumber] = useState("")
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const createOrder = api.order.create.useMutation({
    onSuccess: (order) => {
      clearCart()
      router.push(`/order/${order.id}`)
    },
  })

  const handleCheckout = async () => {
    if (items.length === 0) return
    setIsSubmitting(true)
    try {
      await createOrder.mutateAsync({
        type: orderType,
        tableNumber: orderType === "DINE_IN" ? tableNumber : undefined,
        notes,
        items: items.map((i) => ({
          menuItemId: i.menuItemId,
          quantity: i.quantity,
          price: i.price,
          notes: i.notes,
        })),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-dark-500" />
        <h2 className="mb-2 text-xl font-semibold">Cart is empty</h2>
        <p className="mb-6 text-sm text-text-secondary">
          Belum ada item di keranjang
        </p>
        <Link href="/menu">
          <Button>Lihat Menu</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link
        href="/menu"
        className="mb-6 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Menu
      </Link>

      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <Card>
            <h3 className="mb-4 font-medium">Order Type</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setOrderType("DINE_IN")}
                className={`flex-1 rounded-xl border p-3 text-sm transition-all ${
                  orderType === "DINE_IN"
                    ? "border-coffee-500 bg-coffee-600/10 text-coffee-400"
                    : "border-dark-600 bg-dark-700 text-text-secondary"
                }`}
              >
                Dine In
              </button>
              <button
                onClick={() => setOrderType("TAKEAWAY")}
                className={`flex-1 rounded-xl border p-3 text-sm transition-all ${
                  orderType === "TAKEAWAY"
                    ? "border-coffee-500 bg-coffee-600/10 text-coffee-400"
                    : "border-dark-600 bg-dark-700 text-text-secondary"
                }`}
              >
                Takeaway
              </button>
            </div>
            {orderType === "DINE_IN" && (
              <div className="mt-3">
                <label className="mb-1 block text-sm text-text-secondary">
                  Table Number
                </label>
                <input
                  type="text"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  placeholder="e.g. 5"
                  className="w-full rounded-xl border border-dark-600 bg-dark-700 px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-coffee-500 focus:outline-none"
                />
              </div>
            )}
          </Card>

          <Card>
            <h3 className="mb-4 font-medium">Order Notes</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes for the order..."
              rows={2}
              className="w-full resize-none rounded-xl border border-dark-600 bg-dark-700 px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-coffee-500 focus:outline-none"
            />
          </Card>

          <div className="space-y-2">
            {items.map((item) => (
              <Card key={item.id} className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-text-secondary">
                    {formatPrice(item.price)}
                  </p>
                  {item.notes && (
                    <p className="text-xs text-text-secondary">
                      Note: {item.notes}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="rounded-lg bg-dark-700 p-1.5 transition-colors hover:bg-dark-600"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-6 text-center text-sm">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="rounded-lg bg-dark-700 p-1.5 transition-colors hover:bg-dark-600"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="rounded-lg p-1.5 text-text-secondary transition-colors hover:bg-red-500/20 hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </Card>
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <Card>
            <h3 className="mb-4 font-medium">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-text-secondary">
                <span>Items ({items.length})</span>
                <span>{formatPrice(total())}</span>
              </div>
              <div className="border-t border-dark-600/50 pt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-coffee-400">
                    {formatPrice(total())}
                  </span>
                </div>
              </div>
            </div>
            <Button
              className="mt-4 w-full"
              onClick={handleCheckout}
              disabled={isSubmitting || items.length === 0}
            >
              {isSubmitting ? "Processing..." : "Place Order"}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
