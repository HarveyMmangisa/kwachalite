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
  { month: "January", income: 1860, expense: 800 },
  { month: "February", income: 3050, expense: 1980 },
  { month: "March", income: 2370, expense: 1200 },
  { month: "April", income: 730, expense: 1900 },
  { month: "May", income: 2090, expense: 1300 },
  { month: "June", income: 2140, expense: 1100 },
]

const chartConfig = {
  income: {
    label: "Income",
    color: "hsl(var(--primary))",
  },
  expense: {
    label: "Expense",
    color: "hsl(var(--destructive))",
  },
}

export default function MonthlyOverviewChart() {
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
          <Bar dataKey="income" fill="var(--color-income)" radius={4} />
          <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
