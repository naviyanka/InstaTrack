import { Loader2 } from "lucide-react"

interface LoadingProps {
  className?: string
  size?: number
}

export function Loading({ className = "", size = 24 }: LoadingProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 className="animate-spin" size={size} />
    </div>
  )
}

export function LoadingPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
      <Loading size={32} />
    </div>
  )
}

export function LoadingCard() {
  return (
    <div className="flex min-h-[200px] items-center justify-center rounded-lg border bg-card text-card-foreground shadow-sm">
      <Loading />
    </div>
  )
} 