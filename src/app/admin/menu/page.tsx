"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { PageContainer } from "@/components/layout/page-container"
import { formatPrice } from "@/lib/utils"
import { api } from "@/lib/trpc"

type FormState = {
  name: string
  description: string
  price: number
  categoryId: string
  isPopular: boolean
}

const emptyForm: FormState = {
  name: "",
  description: "",
  price: 0,
  categoryId: "",
  isPopular: false,
}

export default function AdminMenu() {
  const { data: items = [] } = api.menu.getAll.useQuery()
  const { data: categories = [] } = api.category.getAll.useQuery()
  const utils = api.useUtils()

  const [search, setSearch] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)

  const createItem = api.menu.create.useMutation({
    onSuccess: () => { utils.menu.getAll.invalidate(); resetForm() },
  })
  const updateItem = api.menu.update.useMutation({
    onSuccess: () => { utils.menu.getAll.invalidate(); resetForm() },
  })
  const deleteItem = api.menu.delete.useMutation({
    onSuccess: () => utils.menu.getAll.invalidate(),
  })

  function resetForm() {
    setEditingId(null)
    setForm(emptyForm)
  }

  function startEdit(item: (typeof items)[number]) {
    setEditingId(item.id)
    setForm({
      name: item.name,
      description: item.description ?? "",
      price: item.price,
      categoryId: item.categoryId,
      isPopular: item.isPopular,
    })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (editingId) {
      updateItem.mutate({ id: editingId, ...form, isAvailable: true })
    } else {
      createItem.mutate(form)
    }
  }

  const filteredItems = search
    ? items.filter(
        (i) =>
          i.name.toLowerCase().includes(search.toLowerCase()) ||
          i.category?.name.toLowerCase().includes(search.toLowerCase())
      )
    : items

  return (
    <PageContainer
      pageTitle="Menu Items"
      pageDescription="Manage your warkop menu."
      pageHeaderAction={
        <Button onClick={resetForm}>
          <Plus className="mr-1 h-4 w-4" />
          Add Item
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search menu items..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <div className="space-y-2">
            {filteredItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.name}</span>
                      {!item.isAvailable && <Badge variant="destructive" className="text-[10px]">Unavailable</Badge>}
                      {item.isPopular && <Badge variant="secondary" className="text-[10px]">Popular</Badge>}
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {item.category?.name} <span className="mx-1.5">·</span> {formatPrice(item.price)}
                    </p>
                    {item.description && <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{item.description}</p>}
                  </div>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => startEdit(item)}><Pencil className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => deleteItem.mutate({ id: item.id })}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredItems.length === 0 && (
              <p className="py-12 text-center text-muted-foreground">
                {search ? "No items match your search." : "No menu items yet."}
              </p>
            )}
          </div>
        </div>

        {(editingId || form.name || form.categoryId) && (
          <Card className="h-fit lg:sticky lg:top-6">
            <CardHeader><CardTitle>{editingId ? "Edit Item" : "New Item"}</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price (IDR)</Label>
                  <Input id="price" type="number" min={0} value={form.price || ""} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={form.categoryId}
                    onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                    className="flex h-10 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm text-foreground shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.isPopular}
                    onChange={(e) => setForm({ ...form, isPopular: e.target.checked })}
                    className="h-4 w-4 rounded border-border bg-transparent text-coffee-600 focus:ring-coffee-400"
                  />
                  Popular item
                </label>
                <div className="flex gap-2">
                  <Button type="submit">{editingId ? "Update" : "Create"}</Button>
                  <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  )
}
