"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan", cogs: 105000, operations: 20000, marketing: 25000, other: 5000 },
  { month: "Feb", cogs: 117000, operations: 22000, marketing: 28000, other: 6000 },
  { month: "Mar", cogs: 126000, operations: 24000, marketing: 30000, other: 7000 },
  { month: "Apr", cogs: 135000, operations: 26000, marketing: 32000, other: 8000 },
  { month: "May", cogs: 144000, operations: 28000, marketing: 35000, other: 9000 },
  { month: "Jun", cogs: 153000, operations: 30000, marketing: 38000, other: 10000 },
]

const chartConfig = {
  cogs: {
    label: "COGS",
    color: "hsl(var(--chart-1))",
  },
  operations: {
    label: "Operations",
    color: "hsl(var(--chart-2))",
  },
  marketing: {
    label: "Marketing",
    color: "hsl(var(--chart-3))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-4))",
  },
}

export function ProfitMargins() {
  return (
    (<Card>
      <CardHeader>
        <CardTitle>Expense Breakdown</CardTitle>
        <CardDescription>Monthly expense categories and profit margin analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="cogs" stackId="a" fill="var(--color-cogs)" />
              <Bar dataKey="operations" stackId="a" fill="var(--color-operations)" />
              <Bar dataKey="marketing" stackId="a" fill="var(--color-marketing)" />
              <Bar dataKey="other" stackId="a" fill="var(--color-other)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>)
  );
}
