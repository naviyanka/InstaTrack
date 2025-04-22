"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Mon", followers: 124, unfollowers: 23 },
  { name: "Tue", followers: 98, unfollowers: 15 },
  { name: "Wed", followers: 156, unfollowers: 31 },
  { name: "Thu", followers: 142, unfollowers: 28 },
  { name: "Fri", followers: 187, unfollowers: 42 },
  { name: "Sat", followers: 213, unfollowers: 35 },
  { name: "Sun", followers: 201, unfollowers: 29 },
]

export function FollowerActivity() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Follower Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="followers" fill="#4ade80" name="New Followers" />
              <Bar dataKey="unfollowers" fill="#f87171" name="Unfollowers" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
