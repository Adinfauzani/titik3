"use client"

import { Download, Search, DollarSign, ShoppingCart, Package, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageContainer } from "@/components/layout/page-container"
import { formatPrice, formatDate } from "@/lib/utils"
import { exportToCSV } from "@/lib/export"
import { api } from "@/lib/trpc"
import { useState } from "react"

export default function AdminSales() {
  const { data: orders = [] } = api.order.getAll.useQuery()
  const { data: sales } = api.order.getSalesSummary.useQuery()
  const [search, setSearch] = useState("")

  const completedOrders = orders
    .filter((o) => o.status === "COMPLETED")
    .filter(
      (o) =>
        !search ||
        `#${o.orderNumber}`.includes(search) ||
        o.type.toLowerCase().includes(search.toLowerCase())
    )

  const totalItems = completedOrders.reduce(
    (sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0),
    0
  )

  const totalRevenue = completedOrders.reduce(
    (sum, o) => sum + o.items.reduce((s, i) => s + i.price * i.quantity, 0),
    0
  )

  const stats = [
    {
      title: "Total Revenue",
      value: formatPrice(totalRevenue),
      icon: DollarSign,
      className: "text-coffee-400",
    },
    {
      title: "Completed Orders",
      value: completedOrders.length.toString(),
      icon: ShoppingCart,
      className: "text-blue-400",
    },
    {
      title: "Items Sold",
      value: totalItems.toString(),
      icon: Package,
      className: "text-green-400",
    },
  ]

  const handleExport = () => {
    const flat = completedOrders.map((o) => ({
      "Order #": o.orderNumber,
      Date: formatDate(o.createdAt),
      "Items Count": o.items.reduce((s, i) => s + i.quantity, 0),
      Type: o.type === "DINE_IN" ? `Dine In (T${o.tableNumber || "-"})` : "Takeaway",
      Total: o.items.reduce((s, i) => s + i.price * i.quantity, 0),
    }))
    exportToCSV(flat, `sales-report-${new Date().toISOString().slice(0, 10)}`)
  }

  return (
    <PageContainer
      pageTitle="Sales Report"
      pageDescription="Track your warkop sales performance."
      pageHeaderAction={
        <Button variant="outline" size="sm" onClick={handleExport} disabled={completedOrders.length === 0}>
          <Download className="mr-1 h-4 w-4" />
          Export CSV
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.className}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${stat.className}`}>{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Order History</CardTitle>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-40 pl-8"
            />
          </div>
        </CardHeader>
        <CardContent>
          {completedOrders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {completedOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">#{order.orderNumber}</TableCell>
                    <TableCell className="text-muted-foreground">{formatDate(order.createdAt)}</TableCell>
                    <TableCell>{order.items.reduce((s, i) => s + i.quantity, 0)} items</TableCell>
                    <TableCell className="text-muted-foreground">
                      {order.type === "DINE_IN" ? `Dine In (T${order.tableNumber || "-"})` : "Takeaway"}
                    </TableCell>
                    <TableCell className="text-right font-medium text-coffee-400">
                      {formatPrice(order.items.reduce((s, i) => s + i.price * i.quantity, 0))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <TrendingUp className="mb-3 h-10 w-10 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">
                {search ? "No completed orders match your search." : "No completed orders yet."}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {search ? "Try a different search term." : "Orders will appear here once they're completed."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </PageContainer>
  )
}
