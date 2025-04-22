"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type Account = {
  label: string
  username: string
  icon: React.ReactNode
}

const accounts: Account[] = [
  {
    label: "Personal",
    username: "@sarahconnor",
    icon: (
      <Avatar className="h-6 w-6">
        <AvatarImage src="/placeholder-user.jpg" alt="@sarahconnor" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
    ),
  },
  {
    label: "Business",
    username: "@skynetofficial",
    icon: (
      <Avatar className="h-6 w-6">
        <AvatarImage src="/placeholder-user.jpg" alt="@skynetofficial" />
        <AvatarFallback>SO</AvatarFallback>
      </Avatar>
    ),
  },
]

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface AccountSwitcherProps extends PopoverTriggerProps {}

export function AccountSwitcher({ className }: AccountSwitcherProps) {
  const [open, setOpen] = React.useState(false)
  const [showNewAccountDialog, setShowNewAccountDialog] = React.useState(false)
  const [selectedAccount, setSelectedAccount] = React.useState<Account>(accounts[0])

  return (
    <Dialog open={showNewAccountDialog} onOpenChange={setShowNewAccountDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select an account"
            className={cn("w-[200px] justify-between", className)}
          >
            {selectedAccount.icon}
            <span className="ml-2">{selectedAccount.label}</span>
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search accounts..." />
              <CommandEmpty>No accounts found.</CommandEmpty>
              <CommandGroup heading="Accounts">
                {accounts.map((account) => (
                  <CommandItem
                    key={account.username}
                    onSelect={() => {
                      setSelectedAccount(account)
                      setOpen(false)
                    }}
                    className="text-sm"
                  >
                    {account.icon}
                    <span className="ml-2">{account.label}</span>
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedAccount.username === account.username ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false)
                      setShowNewAccountDialog(true)
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Add Account
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Account</DialogTitle>
          <DialogDescription>Add a new Instagram account to track</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Account Name</Label>
            <Input id="name" placeholder="Personal, Business, etc." />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Instagram Username</Label>
            <Input id="username" placeholder="@username" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowNewAccountDialog(false)}>
            Cancel
          </Button>
          <Button onClick={() => setShowNewAccountDialog(false)}>Add Account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
