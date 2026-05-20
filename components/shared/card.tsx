import { type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export function Card({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-dark-600/50 bg-dark-800 p-4 shadow-lg shadow-black/20 transition-all duration-200 hover:border-dark-600",
        className
      )}
      {...props}
    />
  )
}
