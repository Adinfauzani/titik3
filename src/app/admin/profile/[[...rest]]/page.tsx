"use client"

import { UserProfile } from "@clerk/nextjs"
import { PageContainer } from "@/components/layout/page-container"

export default function AdminProfile() {
  return (
    <PageContainer pageTitle="Profile" pageDescription="Manage your account settings.">
      <div className="flex justify-center">
        <UserProfile
          routing="hash"
          appearance={{
            baseTheme: undefined,
            elements: {
              rootBox: "w-full max-w-2xl",
              card: "bg-card border border-border shadow-sm rounded-xl",
              navbar: "hidden",
              navbarMobileMenuRow: "hidden",
              headerTitle: "text-foreground",
              headerSubtitle: "text-muted-foreground",
              formButtonPrimary: "bg-coffee-600 hover:bg-coffee-500",
              formFieldLabel: "text-foreground",
              formFieldInput: "bg-background border-border text-foreground",
              footerAction: "text-muted-foreground",
            },
          }}
        />
      </div>
    </PageContainer>
  )
}
