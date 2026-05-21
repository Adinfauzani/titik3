import { type HTMLAttributes } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-secondary text-secondary-foreground hover:opacity-80",
        secondary: "border-transparent bg-muted text-muted-foreground hover:opacity-80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:opacity-80",
        outline: "text-foreground",
        pending: "border-transparent bg-yellow-500/20 text-yellow-400",
        preparing: "border-transparent bg-blue-500/20 text-blue-400",
        ready: "border-transparent bg-green-500/20 text-green-400",
        completed: "border-transparent bg-muted text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
