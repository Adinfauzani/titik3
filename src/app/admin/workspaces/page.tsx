"use client"

import { OrganizationList } from "@clerk/nextjs"
import { PageContainer } from "@/components/layout/page-container"
import { Infobar } from "@/components/ui/infobar"

export default function AdminWorkspaces() {
  return (
    <PageContainer pageTitle="Workspaces" pageDescription="Manage organizations and teams.">
      <Infobar
        title="Multi-tenant Workspaces"
        description="Create and switch between organizations to manage different teams or venues."
        tips={["Create a new organization for each venue location", "Invite team members to collaborate", "Switch between organizations to manage different workspaces"]}
      />
      <div className="mt-6 flex justify-center">
        <OrganizationList
          appearance={{
            elements: {
              rootBox: "w-full max-w-lg",
              card: "bg-card border border-border shadow-sm rounded-xl",
              headerTitle: "text-foreground",
              headerSubtitle: "text-muted-foreground",
              organizationList: "text-foreground",
              organizationSwitcherTrigger: "bg-background border-border",
              createOrganizationButton: "bg-coffee-600 hover:bg-coffee-500 text-white",
            },
          }}
        />
      </div>
    </PageContainer>
  )
}
