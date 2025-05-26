"use client"

import { UserSidebar } from "@/components/user/user-sidebar"
import { UserDashboardContent } from "@/components/user/user-dashboard-content"
import { SidebarInset } from "@/components/ui/sidebar"

export function UserDashboard() {
  return (
    <div className="flex min-h-screen">
      <UserSidebar />
      <SidebarInset>
        <UserDashboardContent />
      </SidebarInset>
    </div>
  )
}
