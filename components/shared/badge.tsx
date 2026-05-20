import { type HTMLAttributes } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-lg px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        pending: "bg-yellow-500/20 text-yellow-400",
        preparing: "bg-blue-500/20 text-blue-400",
        ready: "bg-green-500/20 text-green-400",
        completed: "bg-dark-600 text-text-secondary",
        default: "bg-dark-700 text-text-secondary",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}
