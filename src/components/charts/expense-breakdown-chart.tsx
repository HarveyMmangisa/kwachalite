
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

const chartData: { category: string; expenses: number; fill: string }[] = []

const chartConfig = {
  expenses: {
    label: "Expenses",
  },
}

export default function ExpenseBreakdownChart() {
    if (chartData.length === 0) {
        return (
            <div className="flex h-[300px] w-full items-center justify-center">
                <p className="text-muted-foreground">No expense data to display.</p>
            </div>
        )
    }
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
