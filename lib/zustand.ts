import { create } from "zustand"

export interface CartItem {
  id: string
  menuItemId: string
  name: string
  price: number
  quantity: number
  notes: string
  image?: string | null
}

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "id" | "quantity">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  updateNotes: (id: string, notes: string) => void
  clearCart: () => void
  total: () => number
  itemCount: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => {
    const existing = get().items.find(
      (i) => i.menuItemId === item.menuItemId && i.notes === item.notes
    )
    if (existing) {
      set({
        items: get().items.map((i) =>
          i.id === existing.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      })
    } else {
      set({
        items: [
          ...get().items,
          { ...item, id: crypto.randomUUID(), quantity: 1 },
        ],
      })
    }
  },
  removeItem: (id) =>
    set({ items: get().items.filter((i) => i.id !== id) }),
  updateQuantity: (id, quantity) =>
    set({
      items:
        quantity <= 0
          ? get().items.filter((i) => i.id !== id)
          : get().items.map((i) =>
              i.id === id ? { ...i, quantity } : i
            ),
    }),
  updateNotes: (id, notes) =>
    set({
      items: get().items.map((i) =>
        i.id === id ? { ...i, notes } : i
      ),
    }),
  clearCart: () => set({ items: [] }),
  total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
  itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}))
