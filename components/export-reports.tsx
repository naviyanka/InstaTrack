"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Download } from "lucide-react"

export function ExportReports() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <Download className="h-3.5 w-3.5" />
          <span>Export</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Export as CSV</DropdownMenuItem>
        <DropdownMenuItem>Export as PDF</DropdownMenuItem>
        <DropdownMenuItem>Schedule reports</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
