"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, ThumbsUp, Eye, MessageCircle } from "lucide-react"

export function OverviewStats() {
  const stats = [
    {
      title: "Total Followers",
      value: "10.2K",
      icon: Users,
      change: "+2.1%",
      trend: "up",
    },
    {
      title: "Engagement Rate",
      value: "4.3%",
      icon: ThumbsUp,
      change: "+0.5%",
      trend: "up",
    },
    {
      title: "Profile Views",
      value: "3.4K",
      icon: Eye,
      change: "-1.2%",
      trend: "down",
    },
    {
      title: "Comments",
      value: "842",
      icon: MessageCircle,
      change: "+12.3%",
      trend: "up",
    },
  ]

  return (
    <>
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className={`text-xs ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
