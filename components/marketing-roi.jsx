"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan", traffic: 12500, revenue: 180000, roi: 3.2 },
  { month: "Feb", traffic: 13200, revenue: 195000, roi: 3.5 },
  { month: "Mar", traffic: 14100, revenue: 210000, roi: 3.8 },
  { month: "Apr", traffic: 15000, revenue: 225000, roi: 4.0 },
  { month: "May", traffic: 15800, revenue: 240000, roi: 4.1 },
  { month: "Jun", traffic: 16500, revenue: 255000, roi: 4.2 },
]

const chartConfig = {
  traffic: {
    label: "Website Traffic",
    color: "hsl(var(--chart-1))",
  },
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-2))",
  },
  roi: {
    label: "Marketing ROI",
    color: "hsl(var(--chart-3))",
  },
}

export function MarketingROI() {
  return (
    (<Card>
      <CardHeader>
        <CardTitle>Marketing ROI</CardTitle>
        <CardDescription>Website traffic correlation with revenue growth</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="traffic"
                stroke="var(--color-traffic)"
                strokeWidth={2}
                dot={{ fill: "var(--color-traffic)" }} />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="roi"
                stroke="var(--color-roi)"
                strokeWidth={2}
                dot={{ fill: "var(--color-roi)" }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>)
  );
}
