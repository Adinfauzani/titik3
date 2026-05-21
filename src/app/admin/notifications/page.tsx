"use client"

import { useState } from "react"
import { Bell, CheckCheck, MessageSquare, ShoppingCart, UtensilsCrossed } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageContainer } from "@/components/layout/page-container"
import { formatDate } from "@/lib/utils"

interface Notification {
  id: string
  title: string
  description: string
  time: Date
  read: boolean
  icon: typeof Bell
}

const initialNotifications: Notification[] = [
  { id: "1", title: "New order #24", description: "3x Indomie Goreng, 2x Kopi Susu", time: new Date(Date.now() - 1000 * 60 * 2), read: false, icon: ShoppingCart },
  { id: "2", title: "Order #23 completed", description: "Table 5 - Total Rp 45,000", time: new Date(Date.now() - 1000 * 60 * 15), read: false, icon: CheckCheck },
  { id: "3", title: "Menu item low stock", description: "Indomie Goreng only 5 packs left", time: new Date(Date.now() - 1000 * 60 * 60), read: false, icon: UtensilsCrossed },
  { id: "4", title: "New customer feedback", description: "Rating 5/5 - Makanannya enak!", time: new Date(Date.now() - 1000 * 60 * 60 * 3), read: true, icon: MessageSquare },
  { id: "5", title: "Order #20 ready", description: "Takeaway order for Budi", time: new Date(Date.now() - 1000 * 60 * 60 * 5), read: true, icon: ShoppingCart },
  { id: "6", title: "Daily report ready", description: "Total revenue today: Rp 850,000", time: new Date(Date.now() - 1000 * 60 * 60 * 8), read: true, icon: Bell },
]

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState(initialNotifications)

  const unread = notifications.filter((n) => !n.read)
  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  const markRead = (id: string) => setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))

  return (
    <PageContainer
      pageTitle="Notifications"
      pageDescription="Stay updated with your warkop activity."
      pageHeaderAction={
        unread.length > 0 && (
          <Button variant="outline" size="sm" onClick={markAllRead}>
            <CheckCheck className="mr-1 h-4 w-4" />
            Mark all read
          </Button>
        )
      }
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              Notifications
              {unread.length > 0 && (
                <Badge variant="default" className="ml-2">{unread.length} new</Badge>
              )}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
              <TabsTrigger value="unread">Unread ({unread.length})</TabsTrigger>
              <TabsTrigger value="read">Read ({notifications.length - unread.length})</TabsTrigger>
            </TabsList>

            {["all", "unread", "read"].map((tab) => (
              <TabsContent key={tab} value={tab} className="space-y-2">
                {notifications
                  .filter((n) => tab === "all" || (tab === "unread" ? !n.read : n.read))
                  .map((notification) => {
                    const Icon = notification.icon
                    return (
                      <div
                        key={notification.id}
                        className={`flex items-start gap-3 rounded-lg border p-4 transition-colors cursor-pointer hover:bg-accent/50 ${notification.read ? "border-border" : "border-coffee-400/30 bg-coffee-400/5"}`}
                        onClick={() => markRead(notification.id)}
                      >
                        <div className={`mt-0.5 rounded-full p-1.5 ${notification.read ? "bg-muted" : "bg-coffee-600/20"}`}>
                          <Icon className={`h-4 w-4 ${notification.read ? "text-muted-foreground" : "text-coffee-400"}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className={`text-sm ${notification.read ? "text-muted-foreground" : "font-medium text-foreground"}`}>
                              {notification.title}
                            </p>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(notification.time)}
                            </span>
                          </div>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {notification.description}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                {(tab === "unread" && unread.length === 0) && (
                  <p className="py-8 text-center text-muted-foreground">All caught up! No unread notifications.</p>
                )}
                {tab === "all" && notifications.length === 0 && (
                  <p className="py-8 text-center text-muted-foreground">No notifications yet.</p>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </PageContainer>
  )
}
