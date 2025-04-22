"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    date: "Jan",
    followers: 10500,
  },
  {
    date: "Feb",
    followers: 10800,
  },
  {
    date: "Mar",
    followers: 11200,
  },
  {
    date: "Apr",
    followers: 11500,
  },
  {
    date: "May",
    followers: 11900,
  },
  {
    date: "Jun",
    followers: 12300,
  },
  {
    date: "Jul",
    followers: 12543,
  },
]

export function FollowerGrowthChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Follower Growth</CardTitle>
        <CardDescription>Track your follower count over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            followers: {
              label: "Followers",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Date</span>
                            <span className="font-bold text-muted-foreground">{payload[0].payload.date}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Followers</span>
                            <span className="font-bold text-muted-foreground">{payload[0].value}</span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area
                type="monotone"
                dataKey="followers"
                stroke="var(--color-followers)"
                fill="var(--color-followers)"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
