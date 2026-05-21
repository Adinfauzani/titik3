"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatPrice } from "@/lib/utils"

interface RecentOrder {
  orderNumber: number
  total: number
  type: string
  tableNumber: string | null
}

interface RecentSalesProps {
  data: RecentOrder[]
}

export function RecentSales({ data }: RecentSalesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Recent Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.slice(0, 6).map((order) => (
            <div key={order.orderNumber} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-coffee-600/20 text-coffee-400 text-xs">
                  #{String(order.orderNumber).slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="ml-3 flex-1 space-y-0.5">
                <p className="text-sm font-medium leading-none">
                  Order #{order.orderNumber}
                </p>
                <p className="text-xs text-muted-foreground">
                  {order.type === "DINE_IN"
                    ? `Table ${order.tableNumber || "-"}`
                    : "Takeaway"}
                </p>
              </div>
              <div className="text-sm font-medium text-coffee-400">
                {formatPrice(order.total)}
              </div>
            </div>
          ))}
          {data.length === 0 && (
            <p className="py-4 text-center text-sm text-muted-foreground">
              No completed orders yet
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
