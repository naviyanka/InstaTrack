"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { date: "Jan 1", engagement: 2.4 },
  { date: "Jan 2", engagement: 3.1 },
  { date: "Jan 3", engagement: 2.8 },
  { date: "Jan 4", engagement: 4.2 },
  { date: "Jan 5", engagement: 3.9 },
  { date: "Jan 6", engagement: 4.5 },
  { date: "Jan 7", engagement: 4.1 },
  { date: "Jan 8", engagement: 3.8 },
  { date: "Jan 9", engagement: 4.3 },
  { date: "Jan 10", engagement: 4.7 },
]

export function EngagementChart() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Engagement Rate</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis unit="%" />
              <Tooltip
                formatter={(value: number) => [`${value}%`, "Engagement Rate"]}
                labelStyle={{ color: "black" }}
              />
              <Line
                type="monotone"
                dataKey="engagement"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
