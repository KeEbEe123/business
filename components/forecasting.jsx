"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan", actual: 180000, predicted: null },
  { month: "Feb", actual: 195000, predicted: null },
  { month: "Mar", actual: 210000, predicted: null },
  { month: "Apr", actual: 225000, predicted: null },
  { month: "May", actual: 240000, predicted: null },
  { month: "Jun", actual: 255000, predicted: null },
  { month: "Jul", actual: null, predicted: 270000 },
  { month: "Aug", actual: null, predicted: 285000 },
  { month: "Sep", actual: null, predicted: 300000 },
  { month: "Oct", actual: null, predicted: 315000 },
  { month: "Nov", actual: null, predicted: 330000 },
  { month: "Dec", actual: null, predicted: 345000 },
]

const chartConfig = {
  actual: {
    label: "Actual Revenue",
    color: "hsl(var(--chart-1))",
  },
  predicted: {
    label: "Predicted Revenue",
    color: "hsl(var(--chart-2))",
  },
}

export function Forecasting() {
  return (
    (<Card>
      <CardHeader>
        <CardTitle>Revenue Forecasting</CardTitle>
        <CardDescription>AI-powered revenue predictions for next 6 months</CardDescription>
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
                dataKey="actual"
                stroke="var(--color-actual)"
                strokeWidth={2}
                dot={{ fill: "var(--color-actual)" }}
                connectNulls={false} />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="var(--color-predicted)"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "var(--color-predicted)" }}
                connectNulls={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>)
  );
}
