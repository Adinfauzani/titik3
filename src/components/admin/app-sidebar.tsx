"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  LayoutDashboard,
  ShoppingCart,
  UtensilsCrossed,
  Tags,
  BarChart3,
  Users,
  Kanban,
  MessageSquare,
  FlaskConical,
  Building2,
  CreditCard,
  Crown,
  ChevronDown,
  ChevronRight,
  Home,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

interface NavItem {
  title: string
  url: string
  icon: React.ComponentType<{ className?: string }>
}

interface NavGroup {
  label: string
  items: NavItem[]
  alwaysOpen?: boolean
}

const navGroups: NavGroup[] = [
  {
    label: "Main",
    alwaysOpen: true,
    items: [
      { title: "Overview", url: "/admin", icon: LayoutDashboard },
      { title: "Orders", url: "/admin/orders", icon: ShoppingCart },
      { title: "Menu", url: "/admin/menu", icon: UtensilsCrossed },
      { title: "Categories", url: "/admin/categories", icon: Tags },
      { title: "Sales", url: "/admin/sales", icon: BarChart3 },
    ],
  },
  {
    label: "Workspace",
    items: [
      { title: "Kanban", url: "/admin/kanban", icon: Kanban },
      { title: "Chat", url: "/admin/chat", icon: MessageSquare },
      { title: "React Query", url: "/admin/react-query", icon: FlaskConical },
    ],
  },
  {
    label: "Organization",
    items: [
      { title: "Workspaces", url: "/admin/workspaces", icon: Building2 },
      { title: "Billing", url: "/admin/billing", icon: CreditCard },
      { title: "Exclusive", url: "/admin/exclusive", icon: Crown },
    ],
  },
]

function isActive(url: string, pathname: string) {
  return url === "/admin" ? pathname === "/admin" : pathname.startsWith(url)
}

function TreeItem({
  item,
  pathname,
  isLast,
}: {
  item: NavItem
  pathname: string
  isLast: boolean
}) {
  return (
    <div className="relative pl-5 group-data-[collapsible=icon]:pl-0">
      {/* vertical line from group down through items (stopped at last) */}
      {!isLast && (
        <div className="absolute left-[9px] top-0 h-full w-px bg-sidebar-border group-data-[collapsible=icon]:hidden" />
      )}
      {/* horizontal branch connecting vertical line to item */}
      <div className="absolute left-[9px] top-1/2 h-px w-3 -translate-y-1/2 bg-sidebar-border group-data-[collapsible=icon]:hidden" />
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          tooltip={item.title}
          isActive={isActive(item.url, pathname)}
        >
          <Link href={item.url}>
            <item.icon />
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </div>
  )
}

function NavGroupSection({ group, pathname }: { group: NavGroup; pathname: string }) {
  const [open, setOpen] = useState(group.alwaysOpen ?? true)

  const header = (
    <SidebarGroupLabel
      className={cn(
        "flex items-center justify-between",
        !group.alwaysOpen && "cursor-pointer"
      )}
      onClick={() => !group.alwaysOpen && setOpen(!open)}
    >
      <span>{group.label}</span>
      {!group.alwaysOpen && (
        <ChevronDown
          className={cn("size-3 transition-transform", open && "rotate-180")}
        />
      )}
    </SidebarGroupLabel>
  )

  const content = (
    <div className="relative">
      {/* vertical line from top to bottom of group */}
      {group.items.length > 0 && (
        <div className="absolute left-[9px] top-0 h-full w-px bg-sidebar-border group-data-[collapsible=icon]:hidden" />
      )}
      <SidebarMenu>
        {group.items.map((item, idx) => (
          <TreeItem
            key={item.title}
            item={item}
            pathname={pathname}
            isLast={idx === group.items.length - 1}
          />
        ))}
      </SidebarMenu>
    </div>
  )

  return (
    <SidebarGroup className="py-0">
      {group.alwaysOpen ? (
        <>
          {header}
          {content}
        </>
      ) : (
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger asChild>
            {header}
          </CollapsibleTrigger>
          <CollapsibleContent>{content}</CollapsibleContent>
        </Collapsible>
      )}
    </SidebarGroup>
  )
}

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="group-data-[collapsible=icon]:pt-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/admin">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-coffee-600 text-sidebar-primary-foreground">
                  <ChevronRight className="size-4 rotate-90" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                  <span className="truncate font-semibold">Admin Panel</span>
                  <span className="truncate text-xs text-muted-foreground">Warkop Titik 3</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="overflow-x-hidden">
        {navGroups.map((group) => (
          <NavGroupSection key={group.label} group={group} pathname={pathname} />
        ))}
        <SidebarSeparator className="mx-3 my-1" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Users"
              isActive={pathname.startsWith("/admin/users")}
            >
              <Link href="/admin/users">
                <Users />
                <span className="group-data-[collapsible=icon]:hidden">Users</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Back to Site">
              <Link href="/">
                <Home />
                <span className="group-data-[collapsible=icon]:hidden">Back to Site</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
