import { create } from "zustand"

export interface Account {
  id: string
  name: string
  username: string
  avatar: string
  status: "active" | "paused"
  notifications: boolean
}

interface AccountsState {
  accounts: Account[]
  addAccount: (account: Omit<Account, "id">) => void
  updateAccount: (id: string, updates: Partial<Account>) => void
  removeAccount: (id: string) => void
  toggleNotifications: (id: string) => void
  toggleStatus: (id: string) => void
}

export const useAccountsStore = create<AccountsState>((set) => ({
  accounts: [],
  addAccount: (account) =>
    set((state) => ({
      accounts: [
        ...state.accounts,
        {
          ...account,
          id: Math.random().toString(36).substr(2, 9),
          avatar: account.avatar || "/placeholder.svg",
        },
      ],
    })),
  updateAccount: (id, updates) =>
    set((state) => ({
      accounts: state.accounts.map((account) =>
        account.id === id ? { ...account, ...updates } : account
      ),
    })),
  removeAccount: (id) =>
    set((state) => ({
      accounts: state.accounts.filter((account) => account.id !== id),
    })),
  toggleNotifications: (id) =>
    set((state) => ({
      accounts: state.accounts.map((account) =>
        account.id === id ? { ...account, notifications: !account.notifications } : account
      ),
    })),
  toggleStatus: (id) =>
    set((state) => ({
      accounts: state.accounts.map((account) =>
        account.id === id
          ? { ...account, status: account.status === "active" ? "paused" : "active" }
          : account
      ),
    })),
})) 