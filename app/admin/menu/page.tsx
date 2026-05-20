"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { Card } from "@/components/shared/card"
import { Button } from "@/components/shared/button"
import { formatPrice } from "@/lib/utils"
import { api } from "@/lib/trpc"

export default function AdminMenu() {
  const { data: items = [] } = api.menu.getAll.useQuery()
  const { data: categories = [] } = api.category.getAll.useQuery()
  const utils = api.useUtils()

  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    categoryId: "",
    isPopular: false,
  })

  const createItem = api.menu.create.useMutation({
    onSuccess: () => {
      utils.menu.getAll.invalidate()
      resetForm()
    },
  })

  const updateItem = api.menu.update.useMutation({
    onSuccess: () => {
      utils.menu.getAll.invalidate()
      resetForm()
    },
  })

  const deleteItem = api.menu.delete.useMutation({
    onSuccess: () => utils.menu.getAll.invalidate(),
  })

  function resetForm() {
    setEditingId(null)
    setForm({ name: "", description: "", price: 0, categoryId: "", isPopular: false })
  }

  function startEdit(item: (typeof items)[number]) {
    setEditingId(item.id)
    setForm({
      name: item.name,
      description: item.description || "",
      price: item.price,
      categoryId: item.categoryId,
      isPopular: item.isPopular,
    })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (editingId) {
      updateItem.mutate({ id: editingId, ...form })
    } else {
      createItem.mutate(form)
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Menu Items</h1>
        <Button size="sm" onClick={resetForm}>
          <Plus className="mr-1 h-4 w-4" />
          Add Item
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        <div className="space-y-3">
          {items.map((item) => (
            <Card
              key={item.id}
              className="flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{item.name}</span>
                  {!item.isAvailable && (
                    <span className="rounded bg-red-500/20 px-1.5 py-0.5 text-[10px] text-red-400">
                      Unavailable
                    </span>
                  )}
                  {item.isPopular && (
                    <span className="rounded bg-yellow-500/20 px-1.5 py-0.5 text-[10px] text-yellow-400">
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-sm text-text-secondary">
                  {item.category?.name} — {formatPrice(item.price)}
                </p>
              </div>
              <div className="flex gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => startEdit(item)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => deleteItem.mutate({ id: item.id })}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {(editingId || form.name) && (
          <Card className="lg:sticky lg:top-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-medium">
                {editingId ? "Edit Item" : "New Item"}
              </h3>
              <div>
                <label className="mb-1 block text-sm text-text-secondary">
                  Name
                </label>
                <input
                  className="w-full rounded-xl border border-dark-600 bg-dark-700 px-3 py-2 text-sm text-text-primary focus:border-coffee-500 focus:outline-none"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-text-secondary">
                  Description
                </label>
                <textarea
                  className="w-full resize-none rounded-xl border border-dark-600 bg-dark-700 px-3 py-2 text-sm text-text-primary focus:border-coffee-500 focus:outline-none"
                  rows={2}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-text-secondary">
                  Price (Rp)
                </label>
                <input
                  type="number"
                  className="w-full rounded-xl border border-dark-600 bg-dark-700 px-3 py-2 text-sm text-text-primary focus:border-coffee-500 focus:outline-none"
                  value={form.price}
                  onChange={(e) =>
                    setForm({ ...form, price: Number(e.target.value) })
                  }
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-text-secondary">
                  Category
                </label>
                <select
                  className="w-full rounded-xl border border-dark-600 bg-dark-700 px-3 py-2 text-sm text-text-primary focus:border-coffee-500 focus:outline-none"
                  value={form.categoryId}
                  onChange={(e) =>
                    setForm({ ...form, categoryId: e.target.value })
                  }
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.isPopular}
                  onChange={(e) =>
                    setForm({ ...form, isPopular: e.target.checked })
                  }
                  className="rounded border-dark-600 bg-dark-700"
                />
                Popular item
              </label>
              <div className="flex gap-2">
                <Button type="submit">
                  {editingId ? "Update" : "Create"}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={resetForm}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}
      </div>
    </div>
  )
}
