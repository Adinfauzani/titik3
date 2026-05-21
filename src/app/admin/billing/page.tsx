"use client"

import { CreditCard } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PageContainer } from "@/components/layout/page-container"
import { Infobar } from "@/components/ui/infobar"

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for small warkops",
    features: ["Up to 50 orders/day", "Basic reporting", "Single menu", "Email support"],
    popular: false,
  },
  {
    name: "Pro",
    price: "Rp 150,000/mo",
    description: "For growing businesses",
    features: ["Unlimited orders", "Advanced analytics", "Multiple menus", "Priority support", "Export to Excel/CSV", "Team management"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large venues & chains",
    features: ["Everything in Pro", "Multi-venue", "Custom integrations", "Dedicated support", "SLA guarantee", "On-premise option"],
    popular: false,
  },
]

export default function AdminBilling() {
  return (
    <PageContainer pageTitle="Billing & Plans" pageDescription="Manage your subscription.">
      <Infobar
        title="Billing Management"
        description="View available plans and manage your subscription."
        variant="success"
        tips={["Upgrade to Pro for unlimited orders and advanced features", "Enterprise plan available for multi-venue operations", "Cancel anytime — no long-term contracts"]}
      />
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className={plan.popular ? "border-coffee-400/50 relative" : ""}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge variant="default" className="bg-coffee-600">Most Popular</Badge>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-lg">{plan.name}</CardTitle>
              <p className="text-2xl font-bold">{plan.price}</p>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <CreditCard className="h-3.5 w-3.5 text-coffee-400" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                {plan.name === "Enterprise" ? "Contact Sales" : plan.price === "Free" ? "Current Plan" : "Upgrade"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageContainer>
  )
}
