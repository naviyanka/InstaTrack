"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export function AccountSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>Configure how you want to be notified about account activity</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Follower Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notify-new-followers" className="flex flex-col space-y-1">
                <span>New Followers</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Get notified when someone follows your account
                </span>
              </Label>
              <Switch id="notify-new-followers" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="notify-unfollowers" className="flex flex-col space-y-1">
                <span>Unfollowers</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Get notified when someone unfollows your account
                </span>
              </Label>
              <Switch id="notify-unfollowers" />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Engagement Alerts</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notify-engagement-drop" className="flex flex-col space-y-1">
                <span>Engagement Drop</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Alert when your engagement rate drops significantly
                </span>
              </Label>
              <Switch id="notify-engagement-drop" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="notify-suspicious" className="flex flex-col space-y-1">
                <span>Suspicious Activity</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Alert when unusual activity is detected
                </span>
              </Label>
              <Switch id="notify-suspicious" />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Report Delivery</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="weekly-report" className="flex flex-col space-y-1">
                <span>Weekly Report</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Receive a weekly summary of your account activity
                </span>
              </Label>
              <Switch id="weekly-report" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="monthly-report" className="flex flex-col space-y-1">
                <span>Monthly Report</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Receive a monthly detailed analytics report
                </span>
              </Label>
              <Switch id="monthly-report" />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button>Save Settings</Button>
        </div>
      </CardContent>
    </Card>
  )
}
