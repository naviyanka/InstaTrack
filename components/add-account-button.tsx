"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { useAccountsStore } from "@/lib/store/accounts"
import { toast } from "sonner"

export function AddAccountButton() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const addAccount = useAccountsStore((state) => state.addAccount)

  const handleSubmit = () => {
    if (!name.trim() || !username.trim()) {
      toast.error("Please fill in all fields")
      return
    }

    addAccount({
      name: name.trim(),
      username: username.trim(),
      status: "active",
      notifications: true,
    })

    setName("")
    setUsername("")
    setOpen(false)
    toast.success("Account added successfully")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1">
          <Plus className="h-3.5 w-3.5" />
          <span>Add Account</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Instagram Account</DialogTitle>
          <DialogDescription>Add a new Instagram account to track</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Account Name</Label>
            <Input
              id="name"
              placeholder="Personal, Business, etc."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Instagram Username</Label>
            <Input
              id="username"
              placeholder="@username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
