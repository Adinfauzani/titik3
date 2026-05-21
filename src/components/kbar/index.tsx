"use client"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "cmdk"
import {
  LayoutDashboard,
  ShoppingCart,
  UtensilsCrossed,
  Tags,
  BarChart3,
  Users,
  UserCircle,
  Bell,
  Kanban,
  MessageSquare,
  FlaskConical,
  Building2,
  CreditCard,
  Crown,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const navItems = [
  { label: "Main", items: [
    { title: "Overview", url: "/admin", icon: LayoutDashboard },
    { title: "Orders", url: "/admin/orders", icon: ShoppingCart },
    { title: "Menu", url: "/admin/menu", icon: UtensilsCrossed },
    { title: "Categories", url: "/admin/categories", icon: Tags },
    { title: "Sales", url: "/admin/sales", icon: BarChart3 },
  ]},
  { label: "Management", items: [
    { title: "Users", url: "/admin/users", icon: Users },
    { title: "Profile", url: "/admin/profile", icon: UserCircle },
    { title: "Notifications", url: "/admin/notifications", icon: Bell },
  ]},
  { label: "Extras", items: [
    { title: "Kanban", url: "/admin/kanban", icon: Kanban },
    { title: "Chat", url: "/admin/chat", icon: MessageSquare },
    { title: "React Query Demo", url: "/admin/react-query", icon: FlaskConical },
    { title: "Workspaces", url: "/admin/workspaces", icon: Building2 },
    { title: "Billing", url: "/admin/billing", icon: CreditCard },
    { title: "Exclusive", url: "/admin/exclusive", icon: Crown },
  ]},
]

export function KBar() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    const onOpen = () => setOpen(true)
    document.addEventListener("keydown", down)
    document.addEventListener("kbar:open", onOpen)
    return () => {
      document.removeEventListener("keydown", down)
      document.removeEventListener("kbar:open", onOpen)
    }
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type to search pages..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {navItems.map((group) => (
          <CommandGroup key={group.label} heading={group.label}>
            {group.items.map((item) => (
              <CommandItem
                key={item.url}
                onSelect={() => {
                  router.push(item.url)
                  setOpen(false)
                }}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  )
}
