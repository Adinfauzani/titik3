import { MenuContent } from "./menu-content"
import { categories, menuItems } from "@/lib/menu-data"

export default function MenuPage() {
  return <MenuContent items={menuItems} categories={categories} />
}
