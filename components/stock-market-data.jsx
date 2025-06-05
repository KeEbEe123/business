"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { TrendingUp } from "lucide-react"

const data = [
  { month: "Jan", sectorIndex: 1250, sp500: 4200 },
  { month: "Feb", sectorIndex: 1280, sp500: 4150 },
  { month: "Mar", sectorIndex: 1320, sp500: 4300 },
  { month: "Apr", sectorIndex: 1290, sp500: 4250 },
  { month: "May", sectorIndex: 1350, sp500: 4400 },
  { month: "Jun", sectorIndex: 1380, sp500: 4450 },
]

const chartConfig = {
  sectorIndex: {
    label: "Sector Index",
    color: "hsl(var(--chart-1))",
  },
  sp500: {
    label: "S&P 500",
    color: "hsl(var(--chart-2))",
  },
}

export function StockMarketData() {
  return (
    (<Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Market Performance</span>
          <div className="flex items-center space-x-2 text-sm">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-green-600">+10.4%</span>
          </div>
        </CardTitle>
        <CardDescription>Your sector vs. broader market performance</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="sectorIndex"
                stroke="var(--color-sectorIndex)"
                strokeWidth={2}
                dot={{ fill: "var(--color-sectorIndex)" }} />
              <Line
                type="monotone"
                dataKey="sp500"
                stroke="var(--color-sp500)"
                strokeWidth={2}
                dot={{ fill: "var(--color-sp500)" }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>)
  );
}
