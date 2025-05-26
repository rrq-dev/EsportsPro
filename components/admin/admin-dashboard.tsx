"use client"

import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminDashboardContent } from "@/components/admin/admin-dashboard-content"
import { SidebarInset } from "@/components/ui/sidebar"

export function AdminDashboard() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <SidebarInset>
        <AdminDashboardContent />
      </SidebarInset>
    </div>
  )
}
