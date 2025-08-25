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
  { channel: "Organic", customers: 320, fill: "var(--color-organic)" },
  { channel: "Social", customers: 250, fill: "var(--color-social)" },
  { channel: "Referral", customers: 180, fill: "var(--color-referral)" },
  { channel: "Direct", customers: 150, fill: "var(--color-direct)" },
  { channel: "Other", customers: 100, fill: "var(--color-other)" },
]

const chartConfig = {
  customers: {
    label: "Customers",
  },
  organic: {
    label: "Organic",
    color: "hsl(var(--chart-1))",
  },
  social: {
    label: "Social Media",
    color: "hsl(var(--chart-2))",
  },
  referral: {
    label: "Referral",
    color: "hsl(var(--chart-3))",
  },
  direct: {
    label: "Direct",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
}

export default function CustomerAcquisitionChart() {
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
            dataKey="customers"
            nameKey="channel"
            innerRadius={60}
            strokeWidth={5}
          />
          <ChartLegend content={<ChartLegendContent nameKey="channel" />} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
