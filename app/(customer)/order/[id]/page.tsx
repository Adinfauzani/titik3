"use client"

import { use } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/shared/button"
import { Card } from "@/components/shared/card"
import { Badge } from "@/components/shared/badge"
import { formatPrice, formatDate } from "@/lib/utils"
import { api } from "@/lib/trpc"

const statusSteps = [
  { key: "PENDING", label: "Pending", dots: "●○○" },
  { key: "PREPARING", label: "Preparing", dots: "●●○" },
  { key: "READY", label: "Ready", dots: "●●●" },
  { key: "COMPLETED", label: "Completed", dots: "Done" },
] as const

const statusBadgeVariant: Record<
  string,
  "pending" | "preparing" | "ready" | "completed"
> = {
  PENDING: "pending",
  PREPARING: "preparing",
  READY: "ready",
  COMPLETED: "completed",
}

export default function OrderTrackingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const { data: order, isLoading } = api.order.getById.useQuery({ id })

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-4xl text-coffee-400">
            ● ● ●
          </div>
          <p className="text-text-secondary">Loading order...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h2 className="mb-2 text-xl font-semibold">Order not found</h2>
        <p className="mb-6 text-sm text-text-secondary">
          The order you are looking for does not exist.
        </p>
        <Link href="/menu">
          <Button>Back to Menu</Button>
        </Link>
      </div>
    )
  }

  const currentStepIndex = statusSteps.findIndex(
    (s) => s.key === order.status
  )

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link
        href="/menu"
        className="mb-6 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Menu
      </Link>

      <Card className="mb-8 text-center">
        <div className="py-4">
          <p className="text-sm text-text-secondary">Order #{order.orderNumber}</p>
          <h1 className="mt-1 text-2xl font-bold">Order Status</h1>
        </div>

        <div className="space-y-1 py-6">
          {statusSteps.map((step, i) => {
            const isActive = i <= currentStepIndex
            const isCurrent = i === currentStepIndex
            return (
              <div
                key={step.key}
                className={`flex items-center justify-center gap-3 py-1 transition-all ${
                  isActive ? "opacity-100" : "opacity-30"
                } ${isCurrent ? "scale-110" : ""}`}
              >
                <span
                  className={`text-lg ${
                    isActive ? "text-coffee-400" : "text-dark-500"
                  }`}
                >
                  {step.dots}
                </span>
                <span
                  className={`text-sm ${
                    isCurrent ? "font-semibold text-text-primary" : "text-text-secondary"
                  }`}
                >
                  {step.label}
                </span>
                {isCurrent && order.status === "COMPLETED" && (
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                )}
              </div>
            )
          })}
        </div>

        <div className="border-t border-dark-600/50 p-4">
          <Badge variant={statusBadgeVariant[order.status] || "default"}>
            {order.status}
          </Badge>
          <span className="ml-3 text-xs text-text-secondary">
            {formatDate(order.createdAt)}
          </span>
        </div>
      </Card>

      <Card>
        <h3 className="mb-4 font-medium">Order Details</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-text-secondary">
            <span>Type</span>
            <span className="text-text-primary">
              {order.type === "DINE_IN" ? "Dine In" : "Takeaway"}
              {order.tableNumber && ` — Table ${order.tableNumber}`}
            </span>
          </div>
          {order.notes && (
            <div className="flex justify-between text-sm text-text-secondary">
              <span>Notes</span>
              <span className="text-text-primary">{order.notes}</span>
            </div>
          )}
        </div>

        <div className="mt-4 space-y-2">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between rounded-lg bg-dark-700 p-3 text-sm"
            >
              <div>
                <span className="text-text-primary">
                  {item.quantity}x {item.menuItem.name}
                </span>
                {item.notes && (
                  <p className="text-xs text-text-secondary">Note: {item.notes}</p>
                )}
              </div>
              <span className="text-text-secondary">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-between border-t border-dark-600/50 pt-4 font-semibold">
          <span>Total</span>
          <span className="text-coffee-400">
            {formatPrice(order.items.reduce((s, i) => s + i.price * i.quantity, 0))}
          </span>
        </div>
      </Card>
    </div>
  )
}
