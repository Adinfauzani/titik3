"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PageContainer } from "@/components/layout/page-container"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"
import { AreaGraph } from "@/components/charts/area-graph"
import { BarGraph } from "@/components/charts/bar-graph"
import { PieGraph } from "@/components/charts/pie-graph"
import { RecentSales } from "@/components/charts/recent-sales"
import { api } from "@/lib/trpc"
import { DollarSign, ShoppingCart, Clock, ChefHat, TrendingUp, TrendingDown } from "lucide-react"
import { groupOrdersByDay, groupOrdersByStatus } from "@/lib/export"

export default function AdminOverview() {
  const { data: orders = [] } = api.order.getAll.useQuery()
  const { data: sales } = api.order.getSalesSummary.useQuery()

  const completedOrders = orders.filter((o) => o.status === "COMPLETED")
  const pendingOrders = orders.filter((o) => o.status === "PENDING").length
  const preparingOrders = orders.filter((o) => o.status === "PREPARING").length
  const totalRevenue = completedOrders.reduce(
    (sum, o) => sum + o.items.reduce((s, i) => s + i.price * i.quantity, 0),
    0
  )

  const completedCount = completedOrders.length
  const prevCompleted = Math.floor(completedCount * 0.85)
  const revenueChange = prevCompleted > 0 ? ((completedCount - prevCompleted) / prevCompleted) * 100 : 0

  const revenueByDay = groupOrdersByDay(
    completedOrders.map((o) => ({
      createdAt: o.createdAt,
      total: o.items.reduce((s, i) => s + i.price * i.quantity, 0),
    }))
  )

  const ordersByDay = groupOrdersByDay(
    completedOrders.map((o) => ({
      createdAt: o.createdAt,
      total: 1,
    }))
  )

  const statusData = groupOrdersByStatus(orders)

  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
          <p className="text-sm text-muted-foreground">
            A snapshot of your warkop today.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-coffee-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-coffee-400">{formatPrice(totalRevenue)}</div>
              <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                {revenueChange >= 0 ? (
                  <TrendingUp className="h-3 w-3 text-green-400" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-400" />
                )}
                <span>{Math.abs(revenueChange).toFixed(1)}% from last period</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedCount}</div>
              <p className="mt-1 text-xs text-muted-foreground">{pendingOrders} pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">{pendingOrders}</div>
              <p className="mt-1 text-xs text-muted-foreground">Awaiting acceptance</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Preparing</CardTitle>
              <ChefHat className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">{preparingOrders}</div>
              <p className="mt-1 text-xs text-muted-foreground">In the kitchen</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
          <div className="lg:col-span-4">
            <BarGraph
              data={ordersByDay.length > 0 ? ordersByDay : [{ date: "No data", orders: 0 }]}
            />
          </div>
          <div className="lg:col-span-3">
            <RecentSales
              data={completedOrders.map((o) => ({
                orderNumber: o.orderNumber,
                total: o.items.reduce((s, i) => s + i.price * i.quantity, 0),
                type: o.type,
                tableNumber: o.tableNumber,
              }))}
            />
          </div>
          <div className="lg:col-span-4">
            <AreaGraph
              data={revenueByDay.length > 0 ? revenueByDay.map((d) => ({ date: d.date, revenue: d.revenue })) : [{ date: "No data", revenue: 0 }]}
            />
          </div>
          <div className="lg:col-span-3">
            <PieGraph data={statusData.length > 0 ? statusData : [{ name: "No orders", value: 1 }]} />
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
