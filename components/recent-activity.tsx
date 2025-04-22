"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const recentActivities = [
  {
    user: {
      name: "Alex Thompson",
      username: "@alexthompson",
      avatar: "/avatars/06.png",
    },
    action: "liked",
    target: "your recent post",
    time: "2 minutes ago",
    type: "like",
  },
  {
    user: {
      name: "Maria Rodriguez",
      username: "@mrodriguez",
      avatar: "/avatars/07.png",
    },
    action: "commented on",
    target: "your photo",
    time: "15 minutes ago",
    type: "comment",
  },
  {
    user: {
      name: "James Wilson",
      username: "@jwilson",
      avatar: "/avatars/08.png",
    },
    action: "started following",
    target: "you",
    time: "1 hour ago",
    type: "follow",
  },
  {
    user: {
      name: "Emily Chen",
      username: "@emilyc",
      avatar: "/avatars/09.png",
    },
    action: "mentioned",
    target: "you in a comment",
    time: "2 hours ago",
    type: "mention",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={activity.user.avatar} />
                <AvatarFallback>
                  {activity.user.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.user.name}</span>{" "}
                  {activity.action}{" "}
                  <span className="font-medium">{activity.target}</span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
              <Badge
                variant={
                  activity.type === "like"
                    ? "default"
                    : activity.type === "comment"
                    ? "secondary"
                    : "outline"
                }
              >
                {activity.type}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
