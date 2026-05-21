"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { Card } from "@/components/shared/card"
import { Button } from "@/components/shared/button"
import { api } from "@/lib/trpc"

export default function AdminCategories() {
  const { data: categories = [] } = api.category.getAll.useQuery()
  const utils = api.useUtils()

  const [editingId, setEditingId] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [sortOrder, setSortOrder] = useState(0)

  const createCategory = api.category.create.useMutation({
    onSuccess: () => {
      utils.category.getAll.invalidate()
      reset()
    },
  })

  const updateCategory = api.category.update.useMutation({
    onSuccess: () => {
      utils.category.getAll.invalidate()
      reset()
    },
  })

  const deleteCategory = api.category.delete.useMutation({
    onSuccess: () => utils.category.getAll.invalidate(),
  })

  function reset() {
    setEditingId(null)
    setName("")
    setSlug("")
    setSortOrder(0)
  }

  function startEdit(cat: (typeof categories)[number]) {
    setEditingId(cat.id)
    setName(cat.name)
    setSlug(cat.slug)
    setSortOrder(cat.sortOrder)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (editingId) {
      updateCategory.mutate({ id: editingId, name, slug, sortOrder })
    } else {
      createCategory.mutate({ name, slug, sortOrder })
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button size="sm" onClick={reset}>
          <Plus className="mr-1 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        <div className="space-y-3">
          {categories.map((cat) => (
            <Card key={cat.id} className="flex items-center justify-between">
              <div>
                <span className="font-medium">{cat.name}</span>
                <span className="ml-3 text-sm text-text-secondary">
                  /{cat.slug}
                </span>
                <span className="ml-3 text-sm text-text-secondary">
                  {cat._count.menuItems} items
                </span>
              </div>
              <div className="flex gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => startEdit(cat)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => deleteCategory.mutate({ id: cat.id })}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {(editingId || name) && (
          <Card className="lg:sticky lg:top-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-medium">
                {editingId ? "Edit Category" : "New Category"}
              </h3>
              <div>
                <label className="mb-1 block text-sm text-text-secondary">
                  Name
                </label>
                <input
                  className="w-full rounded-xl border border-dark-600 bg-dark-700 px-3 py-2 text-sm text-text-primary focus:border-coffee-500 focus:outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-text-secondary">
                  Slug
                </label>
                <input
                  className="w-full rounded-xl border border-dark-600 bg-dark-700 px-3 py-2 text-sm text-text-primary focus:border-coffee-500 focus:outline-none"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-text-secondary">
                  Sort Order
                </label>
                <input
                  type="number"
                  className="w-full rounded-xl border border-dark-600 bg-dark-700 px-3 py-2 text-sm text-text-primary focus:border-coffee-500 focus:outline-none"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(Number(e.target.value))}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">
                  {editingId ? "Update" : "Create"}
                </Button>
                <Button type="button" variant="secondary" onClick={reset}>
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
