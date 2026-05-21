"use client"

import { Crown, Lock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PageContainer } from "@/components/layout/page-container"

export default function AdminExclusive() {
  return (
    <PageContainer
      pageTitle="Exclusive"
      pageDescription="Pro plan exclusive features."
      pageHeaderAction={
        <Badge variant="default" className="bg-coffee-600">
          <Crown className="mr-1 h-3 w-3" />
          Pro Plan
        </Badge>
      }
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-coffee-400/30">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-coffee-400" />
              <CardTitle>Advanced Analytics</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Get detailed insights into your warkop performance with advanced analytics.
            </p>
            <ul className="space-y-2 text-sm">
              {["Customer behavior analysis", "Peak hour predictions", "Inventory forecasting", "Profit margin tracking"].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Crown className="h-3.5 w-3.5 text-coffee-400" />
                  {f}
                </li>
              ))}
            </ul>
            <Button className="w-full" variant="outline">Learn More</Button>
          </CardContent>
        </Card>

        <Card className="border-coffee-400/30">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-coffee-400" />
              <CardTitle>Priority Support</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Get priority access to our support team with faster response times.
            </p>
            <ul className="space-y-2 text-sm">
              {["24/7 priority support", "Dedicated account manager", "Custom feature requests", "Onboarding assistance"].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Lock className="h-3.5 w-3.5 text-coffee-400" />
                  {f}
                </li>
              ))}
            </ul>
            <Button className="w-full" variant="outline">Learn More</Button>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}
