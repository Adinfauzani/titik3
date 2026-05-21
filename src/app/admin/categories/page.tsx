"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PageContainer } from "@/components/layout/page-container"
import { api } from "@/lib/trpc"

export default function AdminCategories() {
  const { data: categories = [] } = api.category.getAll.useQuery()
  const utils = api.useUtils()

  const [editingId, setEditingId] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [sortOrder, setSortOrder] = useState(0)

  const createCategory = api.category.create.useMutation({
    onSuccess: () => { utils.category.getAll.invalidate(); reset() },
  })
  const updateCategory = api.category.update.useMutation({
    onSuccess: () => { utils.category.getAll.invalidate(); reset() },
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
    <PageContainer
      pageTitle="Categories"
      pageDescription="Organize your menu by category."
      pageHeaderAction={
        <Button onClick={reset}>
          <Plus className="mr-1 h-4 w-4" />
          Add Category
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        <div className="space-y-2">
          {categories.map((cat) => (
            <Card key={cat.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <span className="font-medium">{cat.name}</span>
                  <span className="ml-3 text-sm text-muted-foreground">/{cat.slug}</span>
                  <span className="ml-3 rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                    {cat._count.menuItems} items
                  </span>
                </div>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" onClick={() => startEdit(cat)}><Pencil className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => deleteCategory.mutate({ id: cat.id })}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {(editingId || name) && (
          <Card className="h-fit lg:sticky lg:top-6">
            <CardHeader><CardTitle>{editingId ? "Edit Category" : "New Category"}</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sortOrder">Sort Order</Label>
                  <Input id="sortOrder" type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} />
                </div>
                <div className="flex gap-2">
                  <Button type="submit">{editingId ? "Update" : "Create"}</Button>
                  <Button type="button" variant="outline" onClick={reset}>Cancel</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  )
}
