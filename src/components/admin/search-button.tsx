"use client"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SearchButton() {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-8"
      onClick={() => document.dispatchEvent(new CustomEvent("kbar:open"))}
    >
      <Search className="h-4 w-4" />
    </Button>
  )
}
