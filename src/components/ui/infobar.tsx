import { Info, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface InfobarProps {
  title: string
  description?: string
  tips?: string[]
  variant?: "default" | "warning" | "success"
  onClose?: () => void
}

export function Infobar({ title, description, tips, variant = "default", onClose }: InfobarProps) {
  return (
    <div
      className={cn(
        "rounded-lg border p-4",
        variant === "default" && "border-coffee-400/20 bg-coffee-400/5",
        variant === "warning" && "border-yellow-400/20 bg-yellow-400/5",
        variant === "success" && "border-green-400/20 bg-green-400/5"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex gap-3">
          <Info
            className={cn(
              "mt-0.5 h-4 w-4 shrink-0",
              variant === "default" && "text-coffee-400",
              variant === "warning" && "text-yellow-400",
              variant === "success" && "text-green-400"
            )}
          />
          <div>
            <p className="text-sm font-medium">{title}</p>
            {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
            {tips && tips.length > 0 && (
              <ul className="mt-2 space-y-1">
                {tips.map((tip, i) => (
                  <li key={i} className="text-sm text-muted-foreground">
                    • {tip}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="shrink-0 text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
