import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/db"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Bell, UserCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AppSidebar } from "@/components/admin/app-sidebar"
import { UserNav } from "@/components/admin/user-nav"
import { DynamicBreadcrumbs } from "@/components/layout/breadcrumbs"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { KBar } from "@/components/kbar"
import { SearchButton } from "@/components/admin/search-button"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()
  if (!userId) redirect("/auth/signin")

  const user = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (user?.role !== "ADMIN") redirect("/")

  return (
    <SidebarProvider defaultOpen={true}>
      <KBar />
      <AppSidebar />
      <SidebarInset>
        <header className="bg-background/60 sticky top-0 z-20 flex h-14 shrink-0 items-center justify-between gap-2 backdrop-blur-md">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <DynamicBreadcrumbs />
          </div>
          <div className="flex items-center gap-1 px-4">
            <SearchButton />
            <Button variant="ghost" size="icon" className="size-8" asChild>
              <Link href="/admin/notifications">
                <Bell className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="size-8" asChild>
              <Link href="/admin/profile">
                <UserCircle className="h-4 w-4" />
              </Link>
            </Button>
            <Separator orientation="vertical" className="mx-1 h-4" />
            <UserNav />
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
