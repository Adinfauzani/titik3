"use client"

import { useDroppable } from "@dnd-kit/core"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface KanbanColumnProps {
  id: string
  children: ReactNode
  className?: string
}

export function KanbanColumn({ id, children, className }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id })

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "space-y-2 rounded-lg border-2 border-dashed p-3 transition-colors",
        isOver ? "border-coffee-400/50 bg-coffee-400/5" : "border-border",
        className
      )}
    >
      {children}
    </div>
  )
}
