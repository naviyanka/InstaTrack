import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { OverviewStats } from "@/components/overview-stats"
import { FollowerActivity } from "@/components/follower-activity"
import { EngagementChart } from "@/components/engagement-chart"
import { TopEngagers } from "@/components/top-engagers"
import { RecentActivity } from "@/components/recent-activity"
import { SuspiciousActivity } from "@/components/suspicious-activity"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Monitor your Instagram account performance and follower activity." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <OverviewStats />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <FollowerActivity />
        </div>
        <div className="col-span-3">
          <EngagementChart />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-3">
          <TopEngagers />
        </div>
        <div className="col-span-4">
          <RecentActivity />
        </div>
      </div>
      <div className="mt-4">
        <SuspiciousActivity />
      </div>
    </DashboardShell>
  )
}
