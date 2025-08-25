
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", sales: 0, profit: 0 },
  { month: "February", sales: 0, profit: 0 },
  { month: "March", sales: 0, profit: 0 },
  { month: "April", sales: 0, profit: 0 },
  { month: "May", sales: 0, profit: 0 },
  { month: "June", sales: 0, profit: 0 },
]

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--primary))",
  },
  profit: {
    label: "Profit",
    color: "hsl(var(--chart-2))",
  },
}

export default function SalesOverviewChart() {
    const noData = chartData.every(item => item.sales === 0 && item.profit === 0);

    if (noData) {
        return (
            <div className="flex h-[300px] w-full items-center justify-center">
                <p className="text-muted-foreground">No sales data to display.</p>
            </div>
        )
    }

  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} accessibilityLayer>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            tickFormatter={(value) => `MWK ${value / 1000}k`}
            tickLine={false}
            axisLine={false}
            width={60}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent />}
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
          <Bar dataKey="profit" fill="var(--color-profit)" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
