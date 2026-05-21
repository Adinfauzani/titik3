"use client"

import { Card } from "@/components/shared/card"
import { formatPrice } from "@/lib/utils"
import { api } from "@/lib/trpc"

export default function AdminSales() {
  const { data: orders = [] } = api.order.getAll.useQuery()
  const { data: sales } = api.order.getSalesSummary.useQuery()

  const completedOrders = orders.filter((o) => o.status === "COMPLETED")
  const totalItems = completedOrders.reduce(
    (sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0),
    0
  )

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold">Sales</h1>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-sm text-text-secondary">Total Revenue</p>
          <p className="mt-1 text-3xl font-bold text-coffee-400">
            {sales ? formatPrice(sales.totalRevenue) : "-"}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-text-secondary">Completed Orders</p>
          <p className="mt-1 text-3xl font-bold">{completedOrders.length}</p>
        </Card>
        <Card>
          <p className="text-sm text-text-secondary">Items Sold</p>
          <p className="mt-1 text-3xl font-bold">{totalItems}</p>
        </Card>
      </div>

      <Card>
        <h2 className="mb-4 font-medium">Order History</h2>
        <div className="space-y-2">
          {completedOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between rounded-lg bg-dark-700 px-4 py-3 text-sm"
            >
              <div className="flex items-center gap-4">
                <span className="font-medium">#{order.orderNumber}</span>
                <span className="text-text-secondary">
                  {order.items.length} items
                </span>
              </div>
              <span className="text-coffee-400">
                {formatPrice(
                  order.items.reduce((s, i) => s + i.price * i.quantity, 0)
                )}
              </span>
            </div>
          ))}
          {completedOrders.length === 0 && (
            <p className="py-12 text-center text-text-secondary">
              No completed orders
            </p>
          )}
        </div>
      </Card>
    </div>
  )
}
