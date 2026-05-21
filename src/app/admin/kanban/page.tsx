"use client"

import { useState } from "react"
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageContainer } from "@/components/layout/page-container"
import { KanbanCard, type Task } from "@/components/kanban/kanban-card"
import { Plus, X } from "lucide-react"

export interface Column {
  id: string
  title: string
  tasks: Task[]
}

const initialColumns: Column[] = [
  {
    id: "backlog",
    title: "Backlog",
    tasks: [
      { id: "1", title: "Add new menu item: Es Campur", priority: "low" },
      { id: "2", title: "Update pricing for Indomie", priority: "medium", assignee: "Admin" },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    tasks: [
      { id: "3", title: "Design new promotional banner", priority: "high", assignee: "Rina" },
    ],
  },
  {
    id: "review",
    title: "Review",
    tasks: [
      { id: "4", title: "Test new order flow", priority: "medium", assignee: "Budi" },
    ],
  },
  {
    id: "done",
    title: "Done",
    tasks: [
      { id: "5", title: "Setup new printer for kitchen", priority: "high" },
    ],
  },
]

export default function AdminKanban() {
  const [columns, setColumns] = useState<Column[]>(initialColumns)
  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const [newTask, setNewTask] = useState("")
  const [addingTo, setAddingTo] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  function findColumn(id: string) {
    return columns.find((c) => c.tasks.some((t) => t.id === id))
  }

  function handleDragStart(event: DragStartEvent) {
    const task = event.active.data.current?.task as Task
    setActiveTask(task)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return

    const activeId = String(active.id)
    const overId = String(over.id)

    const activeCol = findColumn(activeId)
    const overCol = overId ? columns.find((c) => c.id === overId) || findColumn(overId) : null

    if (!activeCol || !overCol) return

    setColumns((prev) => {
      const sourceCol = prev.find((c) => c.id === activeCol!.id)
      const destCol = prev.find((c) => c.id === overCol!.id)
      if (!sourceCol || !destCol) return prev

      const task = sourceCol.tasks.find((t) => t.id === activeId)
      if (!task) return prev

      const newColumns = prev.map((col) => {
        if (col.id === sourceCol.id) {
          return { ...col, tasks: col.tasks.filter((t) => t.id !== activeId) }
        }
        if (col.id === destCol.id) {
          const overIndex = col.tasks.findIndex((t) => t.id === overId)
          const newTasks = [...col.tasks]
          newTasks.splice(overIndex >= 0 ? overIndex : col.tasks.length, 0, task)
          return { ...col, tasks: newTasks }
        }
        return col
      })
      return newColumns
    })

    setActiveTask(null)
  }

  function addTask(columnId: string) {
    if (!newTask.trim()) return
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? { ...col, tasks: [...col.tasks, { id: String(Date.now()), title: newTask, priority: "medium" as const }] }
          : col
      )
    )
    setNewTask("")
    setAddingTo(null)
  }

  return (
    <PageContainer pageTitle="Kanban Board" pageDescription="Manage tasks and workflows.">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {columns.map((column) => (
            <div key={column.id}>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">{column.title}</CardTitle>
                    <Badge variant="secondary">{column.tasks.length}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <SortableContext
                    items={column.tasks.map((t) => t.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {column.tasks.map((task) => (
                      <KanbanCard key={task.id} task={task} />
                    ))}
                  </SortableContext>
                  {addingTo === column.id ? (
                    <div className="flex gap-2">
                      <Input
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Task title..."
                        className="h-8 text-xs"
                        onKeyDown={(e) => e.key === "Enter" && addTask(column.id)}
                        autoFocus
                      />
                      <Button size="icon" variant="ghost" className="size-8 shrink-0" onClick={() => { setAddingTo(null); setNewTask("") }}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button variant="ghost" size="sm" className="w-full text-xs" onClick={() => setAddingTo(column.id)}>
                      <Plus className="mr-1 h-3 w-3" />
                      Add Task
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        <DragOverlay>
          {activeTask && <KanbanCard task={activeTask} />}
        </DragOverlay>
      </DndContext>
    </PageContainer>
  )
}
