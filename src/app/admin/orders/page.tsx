"use client"

import { useState } from "react"
import { Download, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageContainer } from "@/components/layout/page-container"
import { formatPrice, formatDate } from "@/lib/utils"
import { exportToCSV } from "@/lib/export"
import { api } from "@/lib/trpc"

const tabs = [
  { value: "ALL", label: "All" },
  { value: "PENDING", label: "Pending" },
  { value: "PREPARING", label: "Preparing" },
  { value: "READY", label: "Ready" },
  { value: "COMPLETED", label: "Completed" },
] as const

const statusBadge: Record<string, "pending" | "preparing" | "ready" | "completed"> = {
  PENDING: "pending", PREPARING: "preparing", READY: "ready", COMPLETED: "completed",
}

export default function AdminOrders() {
  const { data: orders = [], isLoading } = api.order.getAll.useQuery()
  const utils = api.useUtils()
  const updateStatus = api.order.updateStatus.useMutation({
    onSuccess: () => utils.order.getAll.invalidate(),
  })

  const [filter, setFilter] = useState("ALL")
  const [search, setSearch] = useState("")

  const filteredOrders = (filter === "ALL" ? orders : orders.filter((o) => o.status === filter))
    .filter(
      (o) =>
        !search ||
        `#${o.orderNumber}`.includes(search) ||
        o.type.toLowerCase().includes(search.toLowerCase()) ||
        o.user?.name?.toLowerCase().includes(search.toLowerCase())
    )

  const completedOrders = orders.filter((o) => o.status === "COMPLETED")
  const totalRevenue = completedOrders.reduce(
    (sum, o) => sum + o.items.reduce((s, i) => s + i.price * i.quantity, 0),
    0
  )

  const handleExport = () => {
    const flat = completedOrders.map((o) => ({
      "Order #": o.orderNumber,
      Status: o.status,
      Type: o.type,
      Table: o.tableNumber || "-",
      Items: o.items.map((i) => `${i.menuItem.name} x${i.quantity}`).join("; "),
      Total: o.items.reduce((s, i) => s + i.price * i.quantity, 0),
      Date: formatDate(o.createdAt),
    }))
    exportToCSV(flat, `orders-${new Date().toISOString().slice(0, 10)}`)
  }

  return (
    <PageContainer
      pageTitle="Orders"
      pageDescription="Manage and track customer orders."
      pageHeaderAction={
        <Button variant="outline" size="sm" onClick={handleExport} disabled={completedOrders.length === 0}>
          <Download className="mr-1 h-4 w-4" />
          Export CSV
        </Button>
      }
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Tabs defaultValue="ALL" value={filter} onValueChange={setFilter}>
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
                {tab.value !== "ALL" && (
                  <span className="ml-1.5 text-xs text-muted-foreground">
                    ({orders.filter((o) => o.status === tab.value).length})
                  </span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-48 pl-8"
            />
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Total Revenue</p>
            <p className="text-sm font-bold text-coffee-400">{formatPrice(totalRevenue)}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-3">
                <div className="h-5 w-32 animate-pulse rounded bg-muted" />
                <div className="mt-1 h-4 w-48 animate-pulse rounded bg-muted" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ShoppingCartIcon className="mb-3 h-10 w-10 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">
              {search ? "No orders match your search." : filter === "ALL" ? "No orders yet." : `No ${filter.toLowerCase()} orders.`}
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
                <div>
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-base">#{order.orderNumber}</CardTitle>
                    <Badge variant={statusBadge[order.status] || "default"}>{order.status}</Badge>
                  </div>
                  <div className="mt-1 flex gap-4 text-sm text-muted-foreground">
                    <span>{order.type === "DINE_IN" ? `Table ${order.tableNumber || "-"}` : "Takeaway"}</span>
                    <span>{formatDate(order.createdAt)}</span>
                    {order.user?.name && <span>by {order.user.name}</span>}
                  </div>
                  {order.notes && <p className="mt-2 text-sm text-muted-foreground">Note: {order.notes}</p>}
                </div>
                <div className="flex gap-2">
                  {order.status === "PENDING" && (
                    <Button size="sm" onClick={() => updateStatus.mutate({ id: order.id, status: "PREPARING" })}>
                      Accept
                    </Button>
                  )}
                  {order.status === "PREPARING" && (
                    <Button size="sm" onClick={() => updateStatus.mutate({ id: order.id, status: "READY" })}>
                      Mark Ready
                    </Button>
                  )}
                  {order.status === "READY" && (
                    <Button size="sm" variant="secondary" onClick={() => updateStatus.mutate({ id: order.id, status: "COMPLETED" })}>
                      Complete
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <span>
                        <span className="text-muted-foreground">{item.quantity}x</span> {item.menuItem.name}
                      </span>
                      <span className="text-muted-foreground">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex justify-between border-t border-border pt-2 text-sm font-medium">
                  <span>Total</span>
                  <span>{formatPrice(order.items.reduce((s, i) => s + i.price * i.quantity, 0))}</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </PageContainer>
  )
}

function ShoppingCartIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}
