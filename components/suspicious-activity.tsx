"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"

const suspiciousActivities = [
  {
    user: {
      name: "Bot Account 1",
      username: "@bot_123",
      avatar: "/avatars/bot1.png",
    },
    reason: "Unusual following pattern",
    risk: "high",
    time: "1 hour ago",
  },
  {
    user: {
      name: "Suspicious User",
      username: "@sus_user456",
      avatar: "/avatars/sus1.png",
    },
    reason: "Mass unfollowing detected",
    risk: "medium",
    time: "3 hours ago",
  },
  {
    user: {
      name: "Spam Account",
      username: "@spam_789",
      avatar: "/avatars/spam1.png",
    },
    reason: "Excessive commenting",
    risk: "high",
    time: "5 hours ago",
  },
]

export function SuspiciousActivity() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-x-2">
        <AlertTriangle className="h-5 w-5 text-yellow-500" />
        <CardTitle>Suspicious Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suspiciousActivities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={activity.user.avatar} />
                  <AvatarFallback>
                    {activity.user.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{activity.user.username}</p>
                  <p className="text-sm text-muted-foreground">{activity.reason}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge
                  variant={activity.risk === "high" ? "destructive" : "secondary"}
                  className="mb-1"
                >
                  {activity.risk} risk
                </Badge>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
