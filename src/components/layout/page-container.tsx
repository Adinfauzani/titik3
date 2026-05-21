import { type ReactNode } from "react"
import { Heading } from "@/components/ui/heading"

interface PageContainerProps {
  children: ReactNode
  pageTitle?: string
  pageDescription?: string
  pageHeaderAction?: ReactNode
}

export function PageContainer({
  children,
  pageTitle,
  pageDescription,
  pageHeaderAction,
}: PageContainerProps) {
  const hasHeader = pageTitle || pageHeaderAction

  return (
    <div className="flex flex-1 flex-col gap-6">
      {hasHeader && (
        <div className="flex items-start justify-between gap-4">
          <Heading title={pageTitle ?? ""} description={pageDescription} />
          {pageHeaderAction && <div className="shrink-0">{pageHeaderAction}</div>}
        </div>
      )}
      {children}
    </div>
  )
}
