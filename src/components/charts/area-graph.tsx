"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AreaGraphProps {
  data: { date: string; revenue: number }[]
}

export function AreaGraph({ data }: AreaGraphProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Revenue Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-coffee-400)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-coffee-400)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--color-dark-700)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
                labelStyle={{ color: "var(--color-dark-50)" }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="var(--color-coffee-400)"
                fill="url(#revenueGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
