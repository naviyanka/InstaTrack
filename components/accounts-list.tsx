"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Bell, MoreVertical, Pencil, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAccountsStore } from "@/lib/store/accounts"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AccountsList() {
  const accounts = useAccountsStore((state) => state.accounts)
  const toggleNotifications = useAccountsStore((state) => state.toggleNotifications)
  const toggleStatus = useAccountsStore((state) => state.toggleStatus)
  const updateAccount = useAccountsStore((state) => state.updateAccount)
  const removeAccount = useAccountsStore((state) => state.removeAccount)

  const [editingAccount, setEditingAccount] = useState<{
    id: string
    name: string
    username: string
  } | null>(null)

  const handleEdit = (account: { id: string; name: string; username: string }) => {
    setEditingAccount(account)
  }

  const handleSave = () => {
    if (!editingAccount) return

    if (!editingAccount.name.trim() || !editingAccount.username.trim()) {
      toast.error("Please fill in all fields")
      return
    }

    updateAccount(editingAccount.id, {
      name: editingAccount.name.trim(),
      username: editingAccount.username.trim(),
    })

    setEditingAccount(null)
    toast.success("Account updated successfully")
  }

  const handleDelete = (id: string) => {
    removeAccount(id)
    toast.success("Account removed successfully")
  }

  return (
    <>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            {accounts.map((account) => (
              <div key={account.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={account.avatar} />
                    <AvatarFallback>
                      {account.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">{account.name}</p>
                    <p className="text-sm text-muted-foreground">{account.username}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                    <Switch
                      id={`notifications-${account.id}`}
                      checked={account.notifications}
                      onCheckedChange={() => toggleNotifications(account.id)}
                    />
                  </div>
                  <Badge variant={account.status === "active" ? "default" : "secondary"}>
                    {account.status === "active" ? "Active" : "Paused"}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(account)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => toggleStatus(account.id)}
                        className={account.status === "active" ? "text-yellow-600" : "text-green-600"}
                      >
                        {account.status === "active" ? "Pause" : "Activate"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(account.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!editingAccount} onOpenChange={() => setEditingAccount(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Account</DialogTitle>
            <DialogDescription>Update your Instagram account details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Account Name</Label>
              <Input
                id="edit-name"
                value={editingAccount?.name || ""}
                onChange={(e) =>
                  setEditingAccount((prev) => prev && { ...prev, name: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-username">Instagram Username</Label>
              <Input
                id="edit-username"
                value={editingAccount?.username || ""}
                onChange={(e) =>
                  setEditingAccount((prev) => prev && { ...prev, username: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingAccount(null)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
