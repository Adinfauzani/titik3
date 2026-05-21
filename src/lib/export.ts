export function exportToCSV(
  data: Record<string, unknown>[],
  filename: string
) {
  if (data.length === 0) return

  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((h) => {
          const val = row[h]
          const str = val == null ? "" : String(val)
          return str.includes(",") || str.includes('"') || str.includes("\n")
            ? `"${str.replace(/"/g, '""')}"`
            : str
        })
        .join(",")
    ),
  ].join("\n")

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.setAttribute("download", `${filename}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function formatChartDate(date: Date | string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
  }).format(new Date(date))
}

export function groupOrdersByDay(
  orders: { createdAt: Date | string; total?: number }[]
) {
  const map = new Map<string, { date: string; orders: number; revenue: number }>()

  for (const order of orders) {
    const key = formatChartDate(order.createdAt)
    const existing = map.get(key) || { date: key, orders: 0, revenue: 0 }
    existing.orders++
    existing.revenue += order.total ?? 0
    map.set(key, existing)
  }

  return Array.from(map.values())
}

export function groupOrdersByStatus(
  orders: { status: string }[]
) {
  const map = new Map<string, number>()
  for (const o of orders) {
    map.set(o.status, (map.get(o.status) || 0) + 1)
  }
  return Array.from(map.entries()).map(([name, value]) => ({
    name,
    value,
    fill: `var(--color-${name.toLowerCase()})`,
  }))
}
