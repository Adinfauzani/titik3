"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface BarGraphProps {
  data: { date: string; orders: number }[]
}

export function BarGraph({ data }: BarGraphProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Orders Per Day</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
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
                allowDecimals={false}
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
              <Bar
                dataKey="orders"
                fill="var(--color-coffee-400)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
