"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/shared/card"
import { Badge } from "@/components/shared/badge"
import { Button } from "@/components/shared/button"
import { formatDate } from "@/lib/utils"
import { api } from "@/lib/trpc"

export default function KitchenPage() {
  const [now, setNow] = useState(() => Date.now())
  const { data: orders = [] } = api.order.getQueue.useQuery(undefined, {
    refetchInterval: 5000,
  })
  const utils = api.useUtils()

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30000)
    return () => clearInterval(id)
  }, [])

  const updateStatus = api.order.updateStatus.useMutation({
    onSuccess: () => {
      utils.order.getQueue.invalidate()
      utils.order.getAll.invalidate()
    },
  })

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Order Queue</h2>
        <span className="text-sm text-text-secondary">
          {orders.length} active orders
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <div className="text-center">
            <div className="mb-4 text-4xl text-coffee-400">● ● ●</div>
            <p className="text-text-secondary">No pending orders</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {orders.map((order) => {
            const elapsed = now - new Date(order.createdAt).getTime()
            const minutes = Math.floor(elapsed / 60000)

            return (
              <Card key={order.id} className="flex flex-col">
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <p className="text-lg font-bold">
                      #{order.orderNumber}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {order.type === "DINE_IN"
                        ? `Table ${order.tableNumber || "-"}`
                        : "Takeaway"}
                    </p>
                  </div>
                  <Badge
                    variant={
                      order.status === "PENDING"
                        ? "pending"
                        : "preparing"
                    }
                  >
                    {order.status}
                  </Badge>
                </div>

                <div className="mb-3 flex-1 space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-lg bg-dark-700 px-3 py-2"
                    >
                      <div>
                        <span className="text-sm font-medium">
                          {item.quantity}x
                        </span>{" "}
                        <span className="text-sm">
                          {item.menuItem.name}
                        </span>
                        {item.notes && (
                          <p className="text-xs text-text-secondary">
                            Note: {item.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-auto space-y-2 border-t border-dark-600/50 pt-3">
                  <div className="flex items-center justify-between text-xs text-text-secondary">
                    <span>{formatDate(order.createdAt)}</span>
                    <span
                      className={
                        minutes > 15 ? "text-red-400" : "text-text-secondary"
                      }
                    >
                      {minutes}m ago
                    </span>
                  </div>

                  {order.status === "PENDING" && (
                    <Button
                      className="w-full"
                      size="sm"
                      onClick={() =>
                        updateStatus.mutate({
                          id: order.id,
                          status: "PREPARING",
                        })
                      }
                    >
                      Accept Order
                    </Button>
                  )}
                  {order.status === "PREPARING" && (
                    <Button
                      className="w-full"
                      size="sm"
                      variant="accent"
                      onClick={() =>
                        updateStatus.mutate({
                          id: order.id,
                          status: "READY",
                        })
                      }
                    >
                      Mark Ready
                    </Button>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
