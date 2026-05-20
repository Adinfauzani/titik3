import { api } from "@/lib/trpc/server"
import { Card } from "@/components/shared/card"

async function getOrders() {
  try {
    return await api.order.getAll()
  } catch {
    return [] as Awaited<ReturnType<typeof api.order.getAll>>
  }
}

async function getSalesSummary() {
  try {
    return await api.order.getSalesSummary()
  } catch {
    return { totalRevenue: 0, totalOrders: 0 } as Awaited<ReturnType<typeof api.order.getSalesSummary>>
  }
}

export default async function AdminOverview() {
  const [recentOrders, sales] = await Promise.all([
    getOrders(),
    getSalesSummary(),
  ])

  const pendingOrders = recentOrders.filter((o) => o.status === "PENDING").length
  const preparingOrders = recentOrders.filter((o) => o.status === "PREPARING").length
  const readyOrders = recentOrders.filter((o) => o.status === "READY").length

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold">Overview</h1>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <p className="text-sm text-text-secondary">Total Revenue</p>
          <p className="mt-1 text-2xl font-bold text-coffee-400">
            Rp {sales.totalRevenue.toLocaleString("id-ID")}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-text-secondary">Total Orders</p>
          <p className="mt-1 text-2xl font-bold">{sales.totalOrders}</p>
        </Card>
        <Card>
          <p className="text-sm text-text-secondary">Pending</p>
          <p className="mt-1 text-2xl font-bold text-yellow-400">
            {pendingOrders}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-text-secondary">Preparing</p>
          <p className="mt-1 text-2xl font-bold text-blue-400">
            {preparingOrders}
          </p>
        </Card>
      </div>

      <Card>
        <h2 className="mb-4 font-medium">Recent Orders</h2>
        <div className="space-y-2">
          {recentOrders.slice(0, 10).map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between rounded-lg bg-dark-700 px-4 py-3 text-sm"
            >
              <div className="flex items-center gap-4">
                <span className="font-medium">#{order.orderNumber}</span>
                <span className="text-text-secondary">
                  {order.type === "DINE_IN"
                    ? `Table ${order.tableNumber || "-"}`
                    : "Takeaway"}
                </span>
                <span className="text-xs text-text-secondary">
                  {order.items.length} items
                </span>
              </div>
              <span
                className={`text-xs font-medium ${
                  order.status === "PENDING"
                    ? "text-yellow-400"
                    : order.status === "PREPARING"
                      ? "text-blue-400"
                      : order.status === "READY"
                        ? "text-green-400"
                        : "text-text-secondary"
                }`}
              >
                {order.status}
              </span>
            </div>
          ))}
          {recentOrders.length === 0 && (
            <p className="py-8 text-center text-text-secondary">
              No orders yet
            </p>
          )}
        </div>
      </Card>
    </div>
  )
}
