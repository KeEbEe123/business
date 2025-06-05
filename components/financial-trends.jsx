"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export function FinancialTrends({ analysis }) {
  // Revert to placeholder data for the chart
  const data = [
    { month: "Jan", revenue: 180000, profit: 45000, marketing: 25000 },
    { month: "Feb", revenue: 195000, profit: 52000, marketing: 28000 },
    { month: "Mar", revenue: 210000, profit: 58000, marketing: 30000 },
    { month: "Apr", revenue: 225000, profit: 62000, marketing: 32000 },
    { month: "May", revenue: 240000, profit: 68000, marketing: 35000 },
    { month: "Jun", revenue: 255000, profit: 72000, marketing: 38000 },
  ];

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "hsl(var(--chart-1))",
    },
    profit: {
      label: "Profit",
      color: "hsl(var(--chart-2))",
    },
    marketing: {
      label: "Marketing Spend",
      color: "hsl(var(--chart-3))",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Trends</CardTitle>
        <CardDescription>
          Revenue, profit, and marketing spend over the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="var(--color-revenue)"
                strokeWidth={2}
                dot={{ fill: "var(--color-revenue)" }}
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="var(--color-profit)"
                strokeWidth={2}
                dot={{ fill: "var(--color-profit)" }}
              />
              <Line
                type="monotone"
                dataKey="marketing"
                stroke="var(--color-marketing)"
                strokeWidth={2}
                dot={{ fill: "var(--color-marketing)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
