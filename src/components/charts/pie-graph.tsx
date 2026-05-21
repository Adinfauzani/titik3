"use client"

import { Pie, PieChart, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const COLORS = [
  "var(--color-coffee-400)",
  "var(--color-cream-400)",
  "var(--color-coffee-300)",
  "var(--color-cream-300)",
  "var(--color-coffee-200)",
  "var(--color-cream-200)",
]

interface PieGraphProps {
  data: { name: string; value: number; fill?: string }[]
}

export function PieGraph({ data }: PieGraphProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Orders by Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "var(--color-dark-700)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
                labelStyle={{ color: "var(--color-dark-50)" }}
                formatter={(value) => [`${value} orders`, ""]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          {data.map((item, index) => (
            <div key={item.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              {item.name}
              <span className="font-medium text-foreground">
                ({((item.value / total) * 100).toFixed(0)}%)
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
