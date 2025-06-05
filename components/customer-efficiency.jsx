"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan", cac: 120, ltv: 480, retention: 85 },
  { month: "Feb", cac: 125, ltv: 495, retention: 87 },
  { month: "Mar", cac: 118, ltv: 510, retention: 89 },
  { month: "Apr", cac: 130, ltv: 525, retention: 88 },
  { month: "May", cac: 127, ltv: 540, retention: 90 },
  { month: "Jun", cac: 127, ltv: 555, retention: 92 },
]

const chartConfig = {
  cac: {
    label: "Customer Acquisition Cost",
    color: "hsl(var(--chart-1))",
  },
  ltv: {
    label: "Lifetime Value",
    color: "hsl(var(--chart-2))",
  },
  retention: {
    label: "Retention Rate (%)",
    color: "hsl(var(--chart-3))",
  },
}

export function CustomerEfficiency() {
  return (
    (<Card>
      <CardHeader>
        <CardTitle>Customer Efficiency</CardTitle>
        <CardDescription>CAC, LTV, and retention rate trends</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="ltv"
                stackId="1"
                stroke="var(--color-ltv)"
                fill="var(--color-ltv)"
                fillOpacity={0.6} />
              <Area
                type="monotone"
                dataKey="cac"
                stackId="2"
                stroke="var(--color-cac)"
                fill="var(--color-cac)"
                fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>)
  );
}
