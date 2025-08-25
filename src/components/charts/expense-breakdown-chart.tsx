"use client"

import * as React from "react"
import { Pie, PieChart, ResponsiveContainer } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart"

const chartData = [
  { category: "Food", expenses: 275, fill: "var(--color-food)" },
  { category: "Transport", expenses: 200, fill: "var(--color-transport)" },
  { category: "Housing", expenses: 320, fill: "var(--color-housing)" },
  { category: "Entertainment", expenses: 175, fill: "var(--color-entertainment)" },
  { category: "Other", expenses: 190, fill: "var(--color-other)" },
]

const chartConfig = {
  expenses: {
    label: "Expenses",
  },
  food: {
    label: "Food",
    color: "hsl(var(--chart-1))",
  },
  transport: {
    label: "Transport",
    color: "hsl(var(--chart-2))",
  },
  housing: {
    label: "Housing",
    color: "hsl(var(--chart-3))",
  },
  entertainment: {
    label: "Entertainment",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
}

export default function ExpenseBreakdownChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="expenses"
            nameKey="category"
            innerRadius={60}
            strokeWidth={5}
          />
          <ChartLegend content={<ChartLegendContent nameKey="category" />} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
