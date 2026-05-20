"use client"

import { useState } from "react"
import { Card } from "@/components/shared/card"
import { Badge } from "@/components/shared/badge"
import { Button } from "@/components/shared/button"
import { formatPrice, formatDate } from "@/lib/utils"
import { api } from "@/lib/trpc"

const statusBadgeVariant: Record<
  string,
  "pending" | "preparing" | "ready" | "completed"
> = {
  PENDING: "pending",
  PREPARING: "preparing",
  READY: "ready",
  COMPLETED: "completed",
}

export default function AdminOrders() {
  const { data: orders = [] } = api.order.getAll.useQuery()
  const utils = api.useUtils()
  const updateStatus = api.order.updateStatus.useMutation({
    onSuccess: () => utils.order.getAll.invalidate(),
  })

  const [filter, setFilter] = useState<string | null>(null)

  const filteredOrders = filter
    ? orders.filter((o) => o.status === filter)
    : orders

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold">Orders</h1>

      <div className="mb-6 flex gap-2">
        {[null, "PENDING", "PREPARING", "READY", "COMPLETED"].map((s) => (
          <button
            key={s || "all"}
            onClick={() => setFilter(s)}
            className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
              filter === s
                ? "bg-coffee-600 text-white"
                : "bg-dark-700 text-text-secondary hover:text-text-primary"
            }`}
          >
            {s || "All"}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredOrders.map((order) => (
          <Card key={order.id}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold">
                    #{order.orderNumber}
                  </span>
                  <Badge
                    variant={
                      statusBadgeVariant[order.status] || "default"
                    }
                  >
                    {order.status}
                  </Badge>
                </div>
                <div className="mt-1 flex gap-4 text-sm text-text-secondary">
                  <span>
                    {order.type === "DINE_IN"
                      ? `Table ${order.tableNumber || "-"}`
                      : "Takeaway"}
                  </span>
                  <span>{formatDate(order.createdAt)}</span>
                  {order.user?.name && <span>by {order.user.name}</span>}
                </div>
                {order.notes && (
                  <p className="mt-2 text-sm text-text-secondary">
                    Note: {order.notes}
                  </p>
                )}
                <div className="mt-3 space-y-1">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="text-sm text-text-secondary"
                    >
                      <span className="text-text-primary">
                        {item.quantity}x
                      </span>{" "}
                      {item.menuItem.name}
                      <span className="ml-2">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                {order.status === "PENDING" && (
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() =>
                      updateStatus.mutate({
                        id: order.id,
                        status: "PREPARING",
                      })
                    }
                  >
                    Accept
                  </Button>
                )}
                {order.status === "PREPARING" && (
                  <Button
                    size="sm"
                    variant="primary"
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
                {order.status === "READY" && (
                  <Button
                    size="sm"
                    variant="accent"
                    onClick={() =>
                      updateStatus.mutate({
                        id: order.id,
                        status: "COMPLETED",
                      })
                    }
                  >
                    Complete
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
        {filteredOrders.length === 0 && (
          <p className="py-12 text-center text-text-secondary">
            No orders found
          </p>
        )}
      </div>
    </div>
  )
}
