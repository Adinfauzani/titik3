"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface Task {
  id: string
  title: string
  priority: "low" | "medium" | "high"
  assignee?: string
}

const priorityColors: Record<string, "outline" | "secondary" | "default"> = {
  low: "outline",
  medium: "secondary",
  high: "default",
}

interface KanbanCardProps {
  task: Task
}

export function KanbanCard({ task }: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: { task },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-start gap-2 rounded-lg border border-border bg-card p-3 text-sm",
        isDragging && "opacity-50 shadow-lg"
      )}
    >
      <button className="mt-0.5 cursor-grab text-muted-foreground hover:text-foreground" {...attributes} {...listeners}>
        <GripVertical className="h-3.5 w-3.5" />
      </button>
      <div className="flex-1 space-y-1.5">
        <p className="text-sm">{task.title}</p>
        <div className="flex items-center gap-2">
          <Badge variant={priorityColors[task.priority] || "outline"} className="text-[10px] px-1.5 py-0">
            {task.priority}
          </Badge>
          {task.assignee && (
            <span className="text-[10px] text-muted-foreground">{task.assignee}</span>
          )}
        </div>
      </div>
    </div>
  )
}
