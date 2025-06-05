"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { company: "Your Company", revenue: 255000, socialReach: 45000 },
  { company: "Competitor A", revenue: 280000, socialReach: 52000 },
  { company: "Competitor B", revenue: 235000, socialReach: 38000 },
  { company: "Competitor C", revenue: 310000, socialReach: 65000 },
  { company: "Industry Avg", revenue: 270000, socialReach: 50000 },
]

const chartConfig = {
  revenue: {
    label: "Monthly Revenue",
    color: "hsl(var(--chart-1))",
  },
  socialReach: {
    label: "Social Reach",
    color: "hsl(var(--chart-2))",
  },
}

export function CompetitorBenchmark() {
  return (
    (<Card>
      <CardHeader>
        <CardTitle>Competitor Benchmark</CardTitle>
        <CardDescription>Revenue and social reach comparison</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data} layout="horizontal">
              <XAxis type="number" />
              <YAxis dataKey="company" type="category" width={80} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="revenue" fill="var(--color-revenue)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>)
  );
}
