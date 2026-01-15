"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { FarmRecordWithProfit } from "@/lib/types";

export function YieldOverTimeChart({
  records,
}: {
  records: FarmRecordWithProfit[];
}) {
  const chartData = records.map((record) => ({
    month: new Date(record.harvestDate).toLocaleString("default", {
      month: "short",
      year: "2-digit"
    }),
    yield: record.harvestQuantity,
  }));

  const chartConfig = {
    yield: {
      label: "Yield",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Yield Over Time</CardTitle>
        <CardDescription>
          A summary of your harvest quantity per cycle.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis />
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="yield" fill="var(--color-yield)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
