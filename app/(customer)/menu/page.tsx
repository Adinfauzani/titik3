import { api } from "@/lib/trpc/server"
import { MenuContent } from "./menu-content"

async function getMenuItems() {
  try {
    return await api.menu.getAll()
  } catch {
    return [] as Awaited<ReturnType<typeof api.menu.getAll>>
  }
}

async function getCategories() {
  try {
    return await api.category.getAll()
  } catch {
    return [] as Awaited<ReturnType<typeof api.category.getAll>>
  }
}

export default async function MenuPage() {
  const [menuItems, categories] = await Promise.all([
    getMenuItems(),
    getCategories(),
  ])

  return <MenuContent items={menuItems} categories={categories} />
}
