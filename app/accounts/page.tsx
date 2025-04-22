import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { AccountsList } from "@/components/accounts-list"
import { AddAccountButton } from "@/components/add-account-button"
import { AccountSettings } from "@/components/account-settings"

export default function AccountsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Accounts" text="Manage your Instagram accounts." />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight">Your Accounts</h2>
          <AddAccountButton />
        </div>
        <AccountsList />
        <AccountSettings />
      </div>
    </DashboardShell>
  )
}
