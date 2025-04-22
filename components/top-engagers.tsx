"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const topEngagers = [
  {
    name: "Sarah Johnson",
    username: "@sarahj",
    avatar: "/avatars/01.png",
    engagement: "12.5%",
    interactions: 245,
  },
  {
    name: "Michael Chen",
    username: "@mchen",
    avatar: "/avatars/02.png",
    engagement: "10.2%",
    interactions: 198,
  },
  {
    name: "Emma Wilson",
    username: "@ewilson",
    avatar: "/avatars/03.png",
    engagement: "9.8%",
    interactions: 187,
  },
  {
    name: "David Kim",
    username: "@dkim",
    avatar: "/avatars/04.png",
    engagement: "8.9%",
    interactions: 156,
  },
  {
    name: "Lisa Garcia",
    username: "@lgarcia",
    avatar: "/avatars/05.png",
    engagement: "8.1%",
    interactions: 143,
  },
]

export function TopEngagers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Engagers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topEngagers.map((engager) => (
            <div key={engager.username} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={engager.avatar} />
                  <AvatarFallback>{engager.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{engager.name}</p>
                  <p className="text-sm text-muted-foreground">{engager.username}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{engager.engagement}</p>
                <p className="text-xs text-muted-foreground">{engager.interactions} interactions</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
