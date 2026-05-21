"use client"

import { UserButton } from "@clerk/nextjs"
import { dark } from "@clerk/themes"

export function UserNav() {
  return (
    <UserButton
      appearance={{
        baseTheme: dark,
        elements: {
          avatarBox: "size-8",
          userButtonPopoverCard: "bg-card border border-border shadow-sm",
          userButtonPopoverActions: "bg-card",
          userButtonPopoverActionButton: "hover:bg-accent",
          userButtonPopoverActionButtonText: "text-foreground",
          userPreviewMainIdentifier: "text-foreground",
          userPreviewSecondaryIdentifier: "text-muted-foreground",
          userButtonPopoverFooter: "hidden",
        },
      }}
    />
  )
}
